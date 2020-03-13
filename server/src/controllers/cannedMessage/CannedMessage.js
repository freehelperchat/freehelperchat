const CannedMessage = require('../../models/cannedMessage/CannedMessage');

module.exports = {
  async index(req, res) {
    CannedMessage.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async show(req, res) {
    const { id } = req.params;
    CannedMessage.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async create(req, res) {
    const cannedMessage = await CannedMessage.create(req.body);

    return res.json({ cannedMessage });
  },

  async editMsg(req, res) {
    const { id } = req.params;
    const { msg } = req.body;
    const cannedMessage = await CannedMessage.findByIdAndUpdate(id, { msg });
    return res.json({ msg: cannedMessage.msg });
  },

  async destroy(req, res) {
    const { id } = req.params;
    await CannedMessage.findByIdAndDelete(id);

    return res.send();
  },
};
