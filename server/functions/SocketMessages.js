const Message = require('../models/chat/Message');
const Chat = require('../models/chat/Chat');
const Session = require('./Session');

module.exports = (io, socket) => {
  socket.on('open_chat', (data) => {
    const { chatId } = data;
    socket.join(chatId);
  });

  socket.on('send_message', async (data) => {
    const { chatId, hash, token } = data;
    if (token) {
      if (await Session.sessionExists(token)) {
        data.operator = true;
      }
    } else if (hash) {
      const chat = await Chat.findById(hash);
      if (!chat || chat.chatId !== +chatId) return socket.emit('error_sending_message', 'Unauthorized');
      data.operator = false;
    }
    Message.create(data)
      .then((res) => io.to(chatId).emit('received_message', res))
      .catch((err) => socket.emit('error_sending_message', err));
  });
};
