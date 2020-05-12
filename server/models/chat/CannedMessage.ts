import {
  typedModel,
  createSchema,
  Type,
  ExtractDoc,
  ExtractProps,
} from 'ts-mongoose';
import { DepartmentSchema } from './Department';

const CannedMessageSchema = createSchema({
  msg: Type.string({ required: true }),
  title: Type.string({ required: true }),
  departmentIds: Type.array().of(
    Type.ref(Type.string()).to('Department', DepartmentSchema),
  ),
  autoSend: Type.boolean({ default: false }),
});

export default typedModel('CannedMessage', CannedMessageSchema);
export type CannedMessageDoc = ExtractDoc<typeof CannedMessageSchema>;
export type CannedMessageProps = ExtractProps<typeof CannedMessageSchema>;
