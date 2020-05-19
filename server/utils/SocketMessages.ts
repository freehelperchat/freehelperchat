import Message from '../models/chat/Message';
import Chat from '../models/chat/Chat';
import Operator, { OperatorProps } from '../models/chat/Operator';
import SessionManager from './SessionManager';
import PermissionManager, {
  checkingOperation,
  Permissions,
} from './PermissionManager';

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
    socket.on('login', async (data) => {
      const { token } = data;
      if (token) {
        if (await SessionManager.getSession(token)) {
          await SessionManager.updateSession(token, socket.id);
          const activeSessions = await SessionManager.getAllActiveSessions();
          socket.emit('online_operators', activeSessions);
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
      const { token } = data;
      const session = await SessionManager.getSession(token);
      const operator = await Operator.findById(
        (session?.operator as OperatorProps)._id,
      );
      if (operator) {
        operator.lastActiveChat = new Date().getTime();
        operator.activeChats =
          operator.activeChats > operator.maxActiveChats
            ? operator.maxActiveChats
            : operator.activeChats + 1;
        operator.save();
      }
    });
  }

  private closeChat(socket: SocketIO.Socket): void {
    socket.on('close_chat', async (data) => {
      const { chatId, token } = data;
      const session = await SessionManager.getSession(token);
      const operator = await Operator.findById(
        (session?.operator as OperatorProps)._id,
      );
      if (operator) {
        operator.activeChats =
          operator.activeChats < 0 ? 0 : operator.activeChats - 1;
        operator.save();
      }
      socket.leave(chatId);
    });
  }

  private sendMessage(socket: SocketIO.Socket, io: SocketIO.Server): void {
    socket.on('send_message', async (data) => {
      const { chatId, hash, token } = data;
      if (token) {
        const session = await SessionManager.getSession(token);
        if (!session) {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
        if (session.operator) {
          const operator = session.operator as OperatorProps;
          if (
            PermissionManager.checkPermissions(
              operator,
              [Permissions.department.chat.messages.sendAll],
              checkingOperation.AND,
            )
          ) {
            data.operator = true;
          } else if (
            PermissionManager.checkPermissions(
              operator,
              [Permissions.department.chat.messages.sendAssigned],
              checkingOperation.AND,
            )
          ) {
            const chat = await Chat.findOne({ chatId });
            if (chat?.operator === operator._id) {
              data.operator = true;
            } else if (
              operator.departmentIds?.indexOf(chat?.department as string) !==
                -1 ||
              operator.allDepartments
            ) {
              data.operator = true;
            } else {
              return socket.emit('error_sending_message', 'Unauthorized');
            }
          } else {
            return socket.emit('error_sending_message', 'Unauthorized');
          }
        }
      } else if (hash) {
        const chat = await Chat.findById(hash);
        if (!chat || chat.chatId !== +chatId) {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
        data.operator = false;
      }
      Message.create({ ...data, time: new Date().getTime() })
        .then((res) => io.to(chatId).emit('received_message', res))
        .catch((err) => socket.emit('error_sending_message', err));
    });
  }
}

export default new SocketMessages();
