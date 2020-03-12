const mongoose = require('mongoose');

const Chat = mongoose.model('Chat');

module.exports = {
  async index(req, res) {
    Chat.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async store(req, res) {
    const chat = Chat.create(req.body);

    return res.json({ chat });
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

  async status(req, res) {
    const chat = Chat.findByIdAndUpdate(req.body.id, { status: req.body.status });
    return res.json({ status: chat.status });
  },
};
