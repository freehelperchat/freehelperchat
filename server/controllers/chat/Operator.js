const Operator = require('../../models/chat/Operator');
const Encrypter = require('../../functions/Encrypter');

module.exports = {
  async index(req, res) {
    Operator.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async show(req, res) {
    const { id } = req.params;
    Operator.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400));
  },

  async self(req, res) {
    return res.status(200).json(req.session.operator);
  },

  async create(req, res) {
    const username = req.header('username');
    const pass = req.header('pass');
    const { body } = req;

    let operator = await Operator.findOne({ username });

    if (!operator) {
      operator = await Operator.create({
        username,
        pass: Encrypter.hashPassword(pass),
        ...body,
      });
      return res.status(201).json({ userId: operator._id });
    }

    return res.status(400).send();
  },

  async destroy(req, res) {
    const { id } = req.params;
    await Operator.findByIdAndDelete(id);

    return res.status(204).send();
  },
};
