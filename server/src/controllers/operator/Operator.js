const mongoose = require('mongoose');

const Operator = mongoose.model('Operator');

module.exports = {
  async index(req, res) {
    Operator.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async show(req, res) {
    Operator.findById(req.params.id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async store(req, res) {
    const operator = Operator.create(req.body);
    return res.json(operator);
  },

  async destroy(req, res) {
    await Operator.findByIdAndDelete(req.params.id);

    return res.send();
  },
};
