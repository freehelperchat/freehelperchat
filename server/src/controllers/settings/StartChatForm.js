const StartChatForm = require('../../models/settings/StartChatForm');
// const config = require('../../../config/config.json');

module.exports = {
  async index(req, res) {
    StartChatForm.find()
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  },

  async update(req, res) {
    const { body } = req;
    StartChatForm.findByIdAndUpdate(
      body._id,
      body,
      { useFindAndModify: false },
    )
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  },

  async updateAll(req, res) {
    const { body } = req;
    if (!Array.isArray(body)) return res.status(400).send();
    return Promise.all(
      body.map((input) => StartChatForm.findByIdAndUpdate(
        input._id,
        input,
        { useFindAndModify: false },
      )),
    )
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  },

  async create(req, res) {
    // if (!config.server.installed) {
    const { body } = req;
    return StartChatForm.insertMany(body)
      .then((resp) => res.status(201).json(resp))
      .catch(() => res.status(400).send());
    // }
    // return res.status(400).send();
  },

  async destroy(req, res) {
    const { id } = req.params;
    await StartChatForm.findByIdAndDelete(id);

    return res.status(200).send();
  },
};
