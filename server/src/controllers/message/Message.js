const mongoose = require('mongoose');

const Message = mongoose.model('Message');

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

  async store(req, res) {
    Message.create(req.body)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },
};
