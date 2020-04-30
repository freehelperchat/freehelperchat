const { celebrate, Joi, Segments } = require('celebrate');
const Session = require('../functions/Session');

async function verifySession(req, res, next) {
  const token = req.headers.authorization;
  if (!await Session.sessionExists(token)) return res.status(401).send();
  return next();
}

module.exports = {
  verifySession,
  authHeader: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
};
