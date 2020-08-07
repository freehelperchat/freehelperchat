import { typedModel, createSchema, Type, ExtractProps } from 'ts-mongoose';
import { OperatorSchema } from './Operator';

const MessageSchema = createSchema({
  message: Type.string(),
  file: Type.string(),
  name: Type.string({ required: true }),
  time: Type.number({ required: true }),
  chatId: Type.string({ required: true }),
  operator: Type.boolean({ required: true, default: false }),
  operatorId: Type.ref(Type.objectId()).to('Operator', OperatorSchema),
});

export default typedModel('Message', MessageSchema);
export type MessageProps = ExtractProps<typeof MessageSchema>;
