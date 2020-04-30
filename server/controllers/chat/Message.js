const Message = require('../../models/chat/Message');

module.exports = {
  async index(req, res) {
    Message.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async show(req, res) {
    const { id } = req.params;
    Message.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async chatMessages(req, res) {
    const { id } = req.params;
    Message.find({ chatId: id })
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },
};