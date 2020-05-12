import { celebrate, Joi, Segments } from 'celebrate';

class RoleValidation {
  public readonly createRole = celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      permissions: Joi.array().items(Joi.string()).min(1).required(),
    }),
  });

  public readonly deleteRole = celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  });
}

export default new RoleValidation();
