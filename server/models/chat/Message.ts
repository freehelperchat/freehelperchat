import {
  typedModel,
  createSchema,
  Type,
  ExtractDoc,
  ExtractProps,
} from 'ts-mongoose';
import { OperatorSchema } from './Operator';

const MessageSchema = createSchema({
  message: Type.string({ required: true }),
  name: Type.string({ required: true }),
  time: Type.string({
    required: true,
    default: (): number => new Date().getTime(),
  }),
  chatId: Type.number({ required: true }),
  operator: Type.boolean({ required: true, default: false }),
  operatorId: Type.ref(Type.objectId()).to('Operator', OperatorSchema),
});

export default typedModel('Message', MessageSchema);
export type MessageDoc = ExtractDoc<typeof MessageSchema>;
export type MessageProps = ExtractProps<typeof MessageSchema>;
