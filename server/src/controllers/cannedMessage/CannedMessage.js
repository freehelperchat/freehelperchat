const mongoose = require('mongoose');

const CannedMessage = mongoose.model('CannedMessage');


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

  async store(req, res) {
    const cannedMessage = CannedMessage.create(req.body);

    return res.json({ cannedMessage });
  },

  async msgEdit(req, res) {
    const cannedMessage = CannedMessage.findByIdAndUpdate(req.body.id, { msg: req.body.msg });
    return res.json({ msg: cannedMessage.msg });
  },

  async destroy(req, res) {
    await CannedMessage.findByIdAndDelete(req.params.id);

    return res.send();
  },
};
