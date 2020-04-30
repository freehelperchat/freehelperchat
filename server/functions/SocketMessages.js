const Message = require('../models/chat/Message');

module.exports = (io, socket) => {
  socket.on('open_chat', (data) => {
    const { chatId } = data;
    socket.join(chatId);
  });

  socket.on('send_message', (data) => {
    const { chatId } = data;
    Message.create(data)
      .then((res) => io.to(chatId).emit('received_message', res))
      .catch((err) => socket.emit('error_sending_message', err));
  });
};
