import {
  typedModel,
  createSchema,
  Type,
  ExtractProps,
  ExtractDoc,
} from 'ts-mongoose';
import { OperatorSchema } from './Operator';


const PersistentChat = createSchema({
  time: Type.number({ required: true }),
  operators: Type.array().of(Type.ref(Type.objectId()).to('Operator', OperatorSchema)),
  owners: Type.array().of(Type.ref(Type.objectId()).to('Operator', OperatorSchema)),
});

export default typedModel('PersistentChat', PersistentChat);
export type ChatDoc = ExtractDoc<typeof PersistentChat>;
export type ChatProps = ExtractProps<typeof PersistentChat>;
