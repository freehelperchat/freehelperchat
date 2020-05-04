const { celebrate, Joi, Segments } = require('celebrate');
const chatValidation = require('./chatValidation');
const operatorValidation = require('./operatorValidation');
const sessionValidation = require('./sessionValidation');
const messageValidation = require('./messageValidation');

module.exports = {
  idStringParam: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),

  idNumberParam: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),

  chatValidation,
  operatorValidation,
  sessionValidation,
  messageValidation,
};
