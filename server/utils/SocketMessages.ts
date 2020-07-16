import Message from '../models/chat/Message';
import Chat from '../models/chat/Chat';
import Operator, { OperatorProps } from '../models/chat/Operator';
import SessionManager from './SessionManager';
import Permissions from './PermissionManager';
import QueueManager, { chatStatus } from './QueueManager';

class SocketMessages {
  public setSocketMessages(io: SocketIO.Server): void {
    io.on('connection', (socket) => {
      this.login(socket);
      this.logout(socket);
      this.openChat(socket);
      this.acceptChat(socket);
      this.closeChat(socket);
      this.sendMessage(socket, io);
    });
  }

  private login(socket: SocketIO.Socket): void {
    QueueManager.assignNextChatToNextOperator();
    socket.on('login', async (data) => {
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
          socket.emit('online_operators', activeSessions);
          socket.emit('your_chats', yourChats);
          socket.emit('other_chats', otherChats);
        }
      }
    });
  }

  private async logout(socket: SocketIO.Socket): Promise<void> {
    socket.on('disconnect', async () => {
      await SessionManager.deleteSessionSocket(socket.id);
    });
  }

  private openChat(socket: SocketIO.Socket): void {
    socket.on('open_chat', async (data) => {
      const { chatId } = data;
      socket.join(chatId);
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
          if ((Permissions.has(operator, 'sendAssignedMessages')
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
    QueueManager.assignNextChatToNextOperator();
    socket.on('close_chat', async (data) => {
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
            if ((Permissions.has(operator, 'sendAssignedMessages')
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
}

export default new SocketMessages();
