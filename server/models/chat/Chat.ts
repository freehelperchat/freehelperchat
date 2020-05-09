import {
  typedModel,
  createSchema,
  Type,
  ExtractDoc,
  ExtractProps,
} from 'ts-mongoose';
import { DepartmentSchema } from './Department';
import { OperatorSchema } from './Operator';

const UserDataSchema = createSchema({
  fieldId: Type.string({ required: true }),
  value: Type.string({ required: true }),
});

const TimeSchema = createSchema({
  started: Type.string({
    required: true,
    default: (): number => new Date().getTime(),
  }),
  closed: Type.string(),
  pending: Type.string(),
});

const ChatSchema = createSchema({
  chatId: Type.number({
    required: true,
  }),
  userData: Type.array().of(UserDataSchema),
  name: Type.string({ required: true }),
  email: Type.string({ required: true }),
  time: Type.object().of(TimeSchema),
  lastOperatorMsg: Type.string(),
  lastUserMsg: Type.string(),
  status: Type.number({ required: true }),
  department: Type.ref(Type.objectId()).to('Department', DepartmentSchema),
  operator: Type.ref(Type.objectId()).to('Operator', OperatorSchema),
});

export default typedModel('Chat', ChatSchema);
export type ChatDoc = ExtractDoc<typeof ChatSchema>;
export type ChatProps = ExtractProps<typeof ChatSchema>;
