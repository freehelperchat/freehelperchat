import { celebrate, Joi, Segments } from 'celebrate';

class MessageValidation {
  public readonly getMessages = celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().optional(),
      clientToken: Joi.string().optional(),
    }).unknown(),
  });
}

export default new MessageValidation();
