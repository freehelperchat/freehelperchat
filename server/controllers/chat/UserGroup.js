const UserGroup = require('../../models/chat/UserGroup');

module.exports = {
  async index(req, res) {
    UserGroup.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async show(req, res) {
    const { id } = req.params;
    UserGroup.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async create(req, res) {
    const { body } = req;
    const usergroup = await UserGroup.create(body);
    return res.json(usergroup);
  },

  async destroy(req, res) {
    const { id } = req.params;
    await UserGroup.findByIdAndDelete(id);

    return res.status(204).send();
  },
};
