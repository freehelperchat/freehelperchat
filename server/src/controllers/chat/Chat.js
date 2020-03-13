const Chat = require('../../models/chat/Chat');

module.exports = {
  async index(req, res) {
    Chat.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async create(req, res) {
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

  async update(req, res) {
    const chat = Chat.findByIdAndUpdate(req.params.id, req.body.info);
    return res.json({ status: chat.status });
  },
};
