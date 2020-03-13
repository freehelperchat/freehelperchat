const Encrypter = require('../../functions/Encrypter');
const Sessions = require('../../functions/Session');

const Operator = require('../../models/operator/Operator');

module.exports = {
  async create(req, res) {
    const email = req.header('email');
    const pass = req.header('pass');

    const operator = await Operator.findOne({ email });

    if (operator) {
      Sessions.deleteSessionByUserId(operator._id);
      if (Encrypter.sha256(pass, operator.pass.salt) === operator.pass.hash) {
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
