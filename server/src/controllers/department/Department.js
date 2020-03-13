const Department = require('../../models/department/Department');

module.exports = {
  async index(req, res) {
    Department.find()
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async show(req, res) {
    Department.findById(req.params.id)
      .then((resp) => res.json(resp))
      .catch(() => res.status(400).send());
  },

  async create(req, res) {
    const department = Department.create(req.body);
    return res.json(department);
  },

  async destroy(req, res) {
    await Department.findByIdAndDelete(req.params.id);

    return res.send();
  },
};
