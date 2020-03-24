const Message = require('../models/message/Message');

module.exports = (socket) => {
  socket.on('open_chat', (data) => {
    const { chatId } = data;
    socket.join(chatId);
  });

  socket.on('send_message', (data) => {
    const { chatId } = data;
    Message.create(data)
      .then((res) => socket.to(chatId).emit('received_message', res))
      .catch((err) => socket.to(chatId).emit('error_sending_message', err));
  });
};
