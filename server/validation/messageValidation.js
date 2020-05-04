const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  getMessages: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().optional(),
      hash: Joi.string().optional(),
    }).unknown(),
  }),
};
