import {
  typedModel,
  createSchema,
  Type,
  ExtractProps,
  ExtractDoc,
} from 'ts-mongoose';
import { DepartmentSchema } from './Department';
import { OperatorSchema } from './Operator';

const UserDataSchema = createSchema({
  fieldId: Type.string({ required: true }),
  value: Type.string({ required: true }),
});

const ChatSchema = createSchema({
  chatId: Type.number({
    required: true,
  }),
  userData: Type.array().of(UserDataSchema),
  name: Type.string({ required: true }),
  email: Type.string({ required: true }),
  ip: Type.string({ required: true }),
  time: Type.object({ required: true }).of({
    started: Type.number({ required: true }),
    closed: Type.number(),
    pending: Type.number(),
  }),
  lastOperatorMsg: Type.string(),
  lastUserMsg: Type.string(),
  status: Type.number({ required: true }),
  department: Type.ref(Type.string({ required: true })).to(
    'Department',
    DepartmentSchema,
  ),
  operator: Type.ref(Type.objectId()).to('Operator', OperatorSchema),
});

export default typedModel('Chat', ChatSchema);
export type ChatDoc = ExtractDoc<typeof ChatSchema>;
export type ChatProps = ExtractProps<typeof ChatSchema>;
