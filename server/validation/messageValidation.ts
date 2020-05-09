import { celebrate, Joi, Segments } from 'celebrate';

export default {
  getMessages: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().optional(),
      hash: Joi.string().optional(),
    }).unknown(),
  }),
};
