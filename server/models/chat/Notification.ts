import { typedModel, createSchema, Type, ExtractProps } from 'ts-mongoose';

enum ENotificationType {
    INFORMATION,
    WARNING,
    CRITICAL
}

const NotificationSchema = createSchema({
  text: Type.string({ required: true }),
  type: Type.string({ enum: Object.keys(ENotificationType) }),
  index: Type.number({ required: true }),
  time: Type.number({ required: true }),
});

export default typedModel('Notification', NotificationSchema);
export type NotificationProps = ExtractProps<typeof NotificationSchema>;
