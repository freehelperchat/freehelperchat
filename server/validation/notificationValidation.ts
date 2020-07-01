import { celebrate, Joi, Segments } from 'celebrate';
import { notificationTypes } from '../models/chat/Notification';

class NotificationValidation {
  public readonly createNotification = celebrate({
    [Segments.BODY]: Joi.object().keys({
      text: Joi.string().required(),
      type: Joi.string().required().valid(...Object.keys(notificationTypes)),
      index: Joi.number().optional(),
    }),
  })
}

export default new NotificationValidation();
