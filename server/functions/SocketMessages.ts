import Message from '../models/chat/Message';
import Chat from '../models/chat/Chat';
import Session from './SessionManager';

class SocketMessages {
  public setSocketMessages(io: SocketIO.Server, socket: SocketIO.Socket): void {
    socket.on('open_chat', (data) => {
      const { chatId } = data;
      socket.join(chatId);
    });

    socket.on('send_message', async (data) => {
      const { chatId, hash, token } = data;
      if (token) {
        if (!(await Session.sessionExists(token))) {
          return socket.emit('error_sending_message', 'Unauthorized');
        }
        data.operator = true;
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
