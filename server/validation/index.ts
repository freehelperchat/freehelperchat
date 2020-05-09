import { celebrate, Joi, Segments } from 'celebrate';
import chatValidation from './chatValidation';
import operatorValidation from './operatorValidation';
import sessionValidation from './sessionValidation';
import messageValidation from './messageValidation';

export default {
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
