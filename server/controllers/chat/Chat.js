const Chat = require('../../models/chat/Chat');
const Department = require('../../models/chat/Department');
const IdCounter = require('../../functions/IdCounter');

module.exports = {
  async index(req, res) {
    const chats = await Chat.find();
    return res.status(200).json(chats);
  },

  async create(req, res) {
    const { body } = req;
    const department = await Department.findOne({ name: body.department });
    if (!department) return res.status(400).send();
    body.department = department._id;

    const chatId = await IdCounter.getIdCounter(IdCounter.Models.CHAT);

    return Chat.create({ chatId, ...body })
      .then((chat) => res.status(201).json(chat))
      .catch(async () => {
        await IdCounter.rollbackIdCounter(IdCounter.Models.CHAT);
        res.status(400).send();
      });
  },

  async show(req, res) {
    const { id } = req.params;
    const chat = await Chat.findOne({ chatId: id }).populate(
      'department',
      '_id name',
    );
    if (!chat) return res.status(404).send();
    return res.status(200).json(chat);
  },

  async destroy(req, res) {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);

    return res.status(204).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const chat = await Chat.findOneAndUpdate({ chatId: id }, body);
    if (!chat) return res.status(404).send();
    return res.status(200).send();
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
