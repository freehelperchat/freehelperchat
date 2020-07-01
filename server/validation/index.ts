import { celebrate, Joi, Segments } from 'celebrate';

export { default as chatValidation } from './chatValidation';
export { default as operatorValidation } from './operatorValidation';
export { default as sessionValidation } from './sessionValidation';
export { default as messageValidation } from './messageValidation';
export { default as roleValidation } from './roleValidation';
export { default as notificationValidation } from './notificationValidation';

class GlobalValidation {
  public readonly idStringParam = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  });

  public readonly idNumberParam = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  });
}

export const globalValidation = new GlobalValidation();
