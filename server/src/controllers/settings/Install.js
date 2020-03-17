/* const config = require('../../../config/config.json');
const StartChatForm = require('../../models/settings/StartChatForm');
const Operator = require('../../models/operator/Operator');
const Encrypter = require('../../functions/Encrypter');

module.exports = {
  async install(req, res) {
    if (!config.server.installed) {
      const username = req.header('username');
      const pass = req.header('pass');
      const { admin } = req.body;
      await Operator.create({
        username,
        pass: Encrypter.hashPassword(pass),
        allDepartments: true,
        ...admin,
      });
    }
  },
}; */
