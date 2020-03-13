const Message = require('../../models/message/Message');

module.exports = {
  async index(req, res) {
    Message.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async show(req, res) {
    Message.findById(req.params.id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async create(req, res) {
    Message.create(req.body)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async chatMessages(req, res) {
    Message.find({ chatId: req.param.chatId })
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },
};
