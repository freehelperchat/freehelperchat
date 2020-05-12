import Message from '../models/chat/Message';
import Chat from '../models/chat/Chat';
import { OperatorDoc } from '../models/chat/Operator';
import Session from './SessionManager';
import PermissionManager, {
  checkingOperation,
  Permissions,
} from './PermissionManager';

class SocketMessages {
  public setSocketMessages(io: SocketIO.Server, socket: SocketIO.Socket): void {
    socket.on('open_chat', (data) => {
      const { chatId } = data;
      socket.join(chatId);
    });

    socket.on('send_message', async (data) => {
      const { chatId, hash, token } = data;
      if (token) {
        if (!(await Session.validateSession(token))) {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
        const session = Session.currentSession;
        if (session?.operator) {
          const operator = session.operator as OperatorDoc;
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
