const basicAuth = require('basic-auth');
const Encrypter = require('../../functions/Encrypter');
const Sessions = require('../../functions/Session');
const Operator = require('../../models/chat/Operator');

module.exports = {
  async create(req, res) {
    const { name: username, pass: password } = basicAuth(req);

    const operator = await Operator.findOne({ username });

    if (operator) {
      Sessions.deleteSessionByOperatorId(operator._id);
      if (Encrypter.sha256(password, operator.password.salt) === operator.password.hash) {
        const token = await Sessions.addSession(operator);
        return res.status(200).json({ token });
      }
      return res.status(401).send();
    }
    return res.status(404).send();
  },

  async delete(req, res) {
    const token = req.headers.authorization;
    return res.status(await Sessions.deleteSession(token) ? 204 : 400).send();
  },
};
