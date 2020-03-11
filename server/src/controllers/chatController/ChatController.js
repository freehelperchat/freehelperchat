const mongoose = require('mongoose');

const Chat = mongoose.model('Chat');

module.exports = {
  async index(req, res) {
    const chat = await Chat.find();

    return res.json(chat);
  },

  async show(req, res) {
    Chat.findById(req.params.id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async destroy(req, res) {
    await Chat.findByIdAndDelete(req.params.id);

    return res.send();
  },
};
