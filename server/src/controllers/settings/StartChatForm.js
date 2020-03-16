const StartChatForm = require('../../models/settings/StartChatForm');

module.exports = {
  async index(req, res) {
    StartChatForm.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async show(req, res) {
    const { id } = req.params;
    StartChatForm.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async create(req, res) {
    const { body } = req;
    const startchatform = await StartChatForm.create(body);
    return res.json(startchatform);
  },

  async destroy(req, res) {
    const { id } = req.params;
    await StartChatForm.findByIdAndDelete(id);

    return res.send();
  },
};
