const Encrypter = require('../../functions/Encrypter');
const Sessions = require('../../functions/Session');
const Operator = require('../../models/chat/Operator');

module.exports = {
  async create(req, res) {
    const { username, password } = req.body;

    const operator = await Operator.findOne({ username });

    if (operator) {
      Sessions.deleteSessionByUserId(operator._id);
      if (Encrypter.sha256(password, operator.password.salt) === operator.password.hash) {
        const token = Sessions.addSession(operator);
        return res.status(200).json({ token });
      }
      return res.status(401).send();
    }
    return res.status(404).send();
  },

  async delete(req, res) {
    const token = req.header('token');
    return res.status(Sessions.deleteSession(token) ? 200 : 400).send();
  },
};
