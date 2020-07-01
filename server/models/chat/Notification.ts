import { typedModel, createSchema, Type, ExtractProps } from 'ts-mongoose';
import { HashMap } from '../../utils/Utils';

interface NotificationType {
  color: string,
  vector: string,
}

export const notificationTypes: HashMap<NotificationType> = {
  info: {
    color: '#0fb9b1',
    vector: 'info.svg',
  },
  warning: {
    color: '#f7b731',
    vector: 'warning.svg',
  },
  critical: {
    color: '#eb3b5a',
    vector: 'critical.svg',
  },
};

const NotificationSchema = createSchema({
  text: Type.string({ required: true }),
  type: Type.string({ required: true }),
  index: Type.number({ required: true }),
  time: Type.number({ required: true }),
});

export default typedModel('Notification', NotificationSchema);
export type NotificationProps = ExtractProps<typeof NotificationSchema>;
