const Chat = require('../../models/chat/Chat');
const Department = require('../../models/department/Department');

module.exports = {
  async index(req, res) {
    return Chat.find()
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  },

  async create(req, res) {
    const { body } = req;
    if (!body.userData || (body.userData && body.userData.length < 1)) {
      return res.status(400).send();
    }
    const department = await Department.findOne({ name: body.department });
    if (!department) return res.status(400).send();
    body.department = department._id;

    return Chat.create(body)
      .then((chat) => res.status(201).json(chat))
      .catch(() => res.status(400).send());
  },

  async show(req, res) {
    const { id } = req.params;
    return Chat.findById(id)
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  },

  async destroy(req, res) {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);

    return res.status(200).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const chat = await Chat.findByIdAndUpdate(id, body);
    return res.status(200).json({ status: chat.status });
  },

  async tranferChat(req, res) {
    const { id } = req.params;
    const { operator } = req.body;
    return Chat.findByIdAndUpdate(id, operator)
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  },

  async getChatByStatus(req, res) {
    const { status } = req.body;
    return Chat.find({ status })
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  },
};
