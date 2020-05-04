const { celebrate, Joi, Segments } = require('celebrate');
const Session = require('../functions/Session');
const Chat = require('../models/chat/Chat');

async function validateSession(req, res, next) {
  const token = req.headers.authorization;
  if (!await Session.sessionExists(token)) return res.status(401).send();
  return next();
}

async function validadeAndGetSession(req, res, next) {
  const token = req.headers.authorization;
  if (!await Session.sessionExists(token)) return res.status(401).send();
  const session = await Session.getSession(token);
  req.session = session;
  return next();
}

async function validateSessionOrHash(req, res, next) {
  const { authorization } = req.headers;
  const { hash } = req.headers;
  if (authorization) {
    return validateSession(req, res, next);
  }
  if (typeof hash !== 'undefined') {
    const chatId = req.params.id;
    const chat = await Chat.findById(hash);
    if (!chat || chat.chatId !== chatId) return res.status(401).send();
    return next();
  }
  return res.status(400).send();
}

module.exports = {
  validateSession,
  validadeAndGetSession,
  validateSessionOrHash,
  authHeader: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
};
