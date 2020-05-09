import { celebrate, Joi, Segments } from 'celebrate';

export default {
  createChat: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      department: Joi.string().required(),
      status: Joi.number().required().min(0).max(5),
      operator: Joi.string().optional(),
      userData: Joi.array()
        .items(
          Joi.object().keys({
            fieldId: Joi.string().required(),
            value: Joi.string().required(),
          }),
        )
        .optional(),
    }),
  }),

  updateChat: celebrate({
    [Segments.BODY]: Joi.object().keys({
      department: Joi.string().optional(),
      status: Joi.number().optional().min(0).max(5),
      operator: Joi.string().optional(),
      lastOperatorMsg: Joi.string().optional(),
      lastUserMsg: Joi.string().optional(),
    }),
  }),
};
