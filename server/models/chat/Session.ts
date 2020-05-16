import { typedModel, createSchema, Type, ExtractProps } from 'ts-mongoose';
import { OperatorSchema } from './Operator';

const SessionSchema = createSchema({
  _id: Type.string({ required: true }),
  operator: Type.ref(Type.objectId()).to('Operator', OperatorSchema),
  socket: Type.string(),
  time: Type.number({ required: true }),
});

export default typedModel('Session', SessionSchema);
export type SessionProps = ExtractProps<typeof SessionSchema>;
