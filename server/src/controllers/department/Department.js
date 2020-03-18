const Department = require('../../models/department/Department');

module.exports = {
  async index(req, res) {
    Department.find()
      .then((resp) => res.status(200).json(resp))
      .catch(() => res.status(400).send());
  },

  async getNames(req, res) {
    Department.find()
      .then((resp) => {
        const names = resp.map((r) => r.name);
        res.status(200).json(names);
      })
      .catch(() => res.status(400).send());
  },

  async show(req, res) {
    const { id } = req.params;
    Department.findById(id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async create(req, res) {
    const { body } = req;
    const department = await Department.create(body);
    return res.json(department);
  },

  async destroy(req, res) {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);

    return res.send();
  },
};
