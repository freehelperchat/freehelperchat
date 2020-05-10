import { celebrate, Joi, Segments } from 'celebrate';

class OperatorValidation {
  public readonly createOperator = celebrate({
    [Segments.BODY]: Joi.object().keys({
      fullName: Joi.string().required(),
      email: Joi.string().email().optional(),
      disabled: Joi.bool().optional(),
      allDepartments: Joi.bool().optional(),
      departmentIds: Joi.array().items(Joi.string()).optional(),
      autoAccept: Joi.bool().optional(),
      maxActiveChats: Joi.number().optional().min(0),
      hideOnline: Joi.bool().optional(),
      invisibleMode: Joi.bool().optional(),
    }),
  });
}

export default new OperatorValidation();
