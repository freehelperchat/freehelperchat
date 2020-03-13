const CannedMessage = require('../../models/cannedMessage/CannedMessage');

module.exports = {
  async index(req, res) {
    CannedMessage.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async show(req, res) {
    CannedMessage.findById(req.params.id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async create(req, res) {
    const cannedMessage = CannedMessage.create(req.body);

    return res.json({ cannedMessage });
  },

  async editMsg(req, res) {
    const cannedMessage = CannedMessage.findByIdAndUpdate(req.params.id, { msg: req.body.msg });
    return res.json({ msg: cannedMessage.msg });
  },

  async destroy(req, res) {
    await CannedMessage.findByIdAndDelete(req.params.id);

    return res.send();
  },
};
