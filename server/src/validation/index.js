const { celebrate, Joi, Segments } = require('celebrate');
const chatValidation = require('./chatValidation');
const operatorValidation = require('./operatorValidation');

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
};
