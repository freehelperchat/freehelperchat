import Siofu from 'socketio-file-upload';
import path from 'path';
import Message from '../models/chat/Message';
import Chat, { ChatDoc } from '../models/chat/Chat';
import Operator, { OperatorProps } from '../models/chat/Operator';
import SessionManager from './SessionManager';
import Permissions from './PermissionManager';
import QueueManager, { chatStatus } from './QueueManager';

class SocketMessages {
  public setSocketMessages(io: SocketIO.Server): void {
    io.on('connection', (socket) => {
      this.login(socket, io);
      this.logout(socket, io);
      this.openChat(socket, io);
      this.acceptChat(socket);
      this.closeChat(socket);
      this.sendMessage(socket, io);
      this.uploadFile(socket);
    });
  }

  private login(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('login', async (data) => {
      await QueueManager.assignNextChatToNextOperator();
      const { token } = data;
      if (token) {
        const session = await SessionManager.getSession(token);
        if (session) {
          await SessionManager.updateSession(token, socket.id);
          const activeSessions = await SessionManager.getAllActiveSessions();
          const yourChats = await Chat.find({
            operator: (session.operator as OperatorProps)._id,
            status: { $in: [chatStatus.ACTIVE, chatStatus.PENDING] },
          });
          const otherChats = await Chat.find({
            operator: { $ne: (session.operator as OperatorProps)._id },
            status: { $in: [chatStatus.ACTIVE, chatStatus.PENDING] },
          });
          if (activeSessions) {
            activeSessions.forEach((s) => {
              if (s.socket && socket.id !== s.socket) {
                io.emit('online_operators', activeSessions).to(s.socket);
              }
            });
          }
          socket.emit('online_operators', activeSessions);
          socket.emit('your_chats', yourChats);
          socket.emit('other_chats', otherChats);
        }
      }
    });
  }

  private logout(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('disconnect', async () => {
      await SessionManager.deleteSessionSocket(socket.id);
      const activeSessions = await SessionManager.getAllActiveSessions();
      if (activeSessions) {
        activeSessions.forEach((s) => io
          .emit('online_operators', activeSessions)
          .to(s.socket || ''));
      }
    });
  }

  private openChat = (socket: SocketIO.Socket, io: SocketIO.Server): void => {
    socket.on('open_chat', async (data) => {
      const { chatId, token, clientToken } = data;
      const chat = await Chat.findById(chatId);
      if (!chat) return socket.emit('error_opening_chat', 'Chat not found');

      if (token) {
        const session = await SessionManager.getSession(token);
        if (!session) return socket.emit('error_opening_chat', 'Unauthorized');
        if (session.operator) {
          const operator = session.operator as OperatorProps;
          if (chat) {
            if ((Permissions.has(operator, 'readAssignedChats')
              && chat?.operator === operator._id)
            || (Permissions.has(operator, 'readDepartmentChats')
              && operator.departmentIds.includes(chat?.department))
            || Permissions.or(operator, 'readAllMessages', 'all')) {
              return socket.join(chatId);
            }
          }
          return socket.emit('error_opening_chat', 'Unauthorized');
        }
      } else if (clientToken) {
        if (chat.clientToken !== clientToken || chat.status === chatStatus.CLOSED) {
          return socket.emit('error_opening_chat', 'Unauthorized');
        }
        this.sendChatsToOperators(io);
        return socket.join(chatId);
      }
      return socket.emit('error_opening_chat', 'Unauthorized');
    });
  }

  private async sendChatsToOperators(io: SocketIO.Server): Promise<void> {
    const activeSessions = await SessionManager.getAllActiveSessions({
      path: 'operator',
      select:
        'fullName allDepartments departmentIds maxActiveChats activeChats hideOnline roles customPermissions',
      populate: {
        path: 'roles',
        select: 'permissions',
      },
    });
    if (!activeSessions) return;
    activeSessions.forEach(async (session) => {
      if (!session.socket) return;
      const yourChats = await Chat.find({
        operator: (session.operator as OperatorProps)._id,
        status: { $in: [chatStatus.ACTIVE, chatStatus.PENDING] },
      });
      let otherChats = [] as ChatDoc[];
      const filter = [chatStatus.ACTIVE];
      if (Permissions.or(session.operator as OperatorProps, 'readPendingChats', 'all')) {
        filter.push(chatStatus.PENDING);
      }
      if (Permissions.or(session.operator as OperatorProps, 'readAllChats', 'all')) {
        otherChats = await Chat.find({
          operator: { $ne: (session.operator as OperatorProps)._id },
          status: { $in: filter },
        });
      } else if (Permissions.has(session.operator as OperatorProps, 'readDepartmentChats')) {
        otherChats = await Chat.find({
          operator: { $ne: (session.operator as OperatorProps)._id },
          status: { $in: filter },
          department: { $in: (session.operator as OperatorProps).departmentIds },
        });
      }
      io.emit('online_operators', activeSessions).to(session.socket);
      io.emit('your_chats', yourChats).to(session.socket);
      io.emit('other_chats', otherChats).to(session.socket);
    });
  }

  private acceptChat(socket: SocketIO.Socket): void {
    socket.on('accept_chat', async (data) => {
      const { token, chatId } = data;
      const session = await SessionManager.getSession(token);
      const operator = await Operator.findById(
        (session?.operator as OperatorProps)._id,
      );
      if (operator) {
        const chat = await Chat.findOne({ chatId });
        if (chat) {
          if ((Permissions.has(operator, 'sendAssignedChats')
              && chat.operator === operator._id)
            || (Permissions.has(operator, 'sendOnDepartmentChats')
              && operator.departmentIds.includes(chat.department))
            || Permissions.or(operator, 'sendAllMessages', 'all')) {
            if (chat.operator !== operator._id) chat.operator = operator._id;
            operator.lastActiveChat = new Date().getTime();
            operator.activeChats += 1;
            operator.save();
            chat.status = chatStatus.ACTIVE;
            chat.time.pending = new Date().getTime();
            chat.save();
            socket.emit('chat_accepted', { chatId });
          }
        }
      }
    });
  }

  private closeChat(socket: SocketIO.Socket): void {
    socket.on('close_chat', async (data) => {
      await QueueManager.assignNextChatToNextOperator();
      const { clientToken, token } = data;
      const session = await SessionManager.getSession(token);
      const operator = await Operator.findById(
        (session?.operator as OperatorProps)._id,
      );
      if (operator) {
        const chat = await Chat.findOne({ clientToken });
        if (chat) {
          if (chat.operator === operator._id
            || (Permissions.has(operator, 'closeDepartmentChats')
              && operator.departmentIds.includes(chat.department))
            || Permissions.has(operator, 'closeAllChats')) {
            if (chat.operator !== operator._id) {
              const actualOperator = await Operator.findById(chat.operator);
              if (actualOperator) {
                actualOperator.activeChats =
                  actualOperator.activeChats < 0 ? 0 : actualOperator.activeChats - 1;
                actualOperator.save();
              }
            } else {
              operator.activeChats =
                operator.activeChats < 0 ? 0 : operator.activeChats - 1;
              operator.save();
            }
            chat.status = chatStatus.CLOSED;
            chat.time.closed = new Date().getTime();
            chat.save();
          }
        }
      }
      socket.leave(clientToken);
    });
  }

  private sendMessage(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('send_message', async (data) => {
      const { chatId, clientToken, token } = data;
      if (token) {
        const session = await SessionManager.getSession(token);
        if (!session) {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
        if (session.operator) {
          const operator = session.operator as OperatorProps;
          const chat = await Chat.findById(chatId);
          if (chat) {
            if ((Permissions.has(operator, 'sendAssignedChats')
              && chat?.operator === operator._id)
            || (Permissions.has(operator, 'sendOnDepartmentChats')
              && operator.departmentIds.includes(chat?.department))
            || Permissions.or(operator, 'sendAllMessages', 'all')) {
              data.operator = true;
            } else {
              return socket.emit('error_sending_message', 'Unauthorized');
            }
          }
        } else {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
      } else if (clientToken) {
        const chat = await Chat.findById(chatId);
        if (!chat || chat.clientToken !== clientToken) {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
        data.operator = false;
      } else return socket.emit('error_sending_message', 'Unauthorized');
      Message.create({ ...data, time: new Date().getTime() })
        .then((res) => io.to(chatId).emit('received_message', res))
        .catch((err) => socket.emit('error_sending_message', err));
    });
  }

  private uploadFile(socket: SocketIO.Socket): void {
    const uploader = new Siofu();
    uploader.dir = path.resolve(__dirname, '..', '..', 'uploads');
    uploader.listen(socket);
    socket.on('upload_file', (data) => {
      console.log(data);
    });
  }
}

export default new SocketMessages();
