import {
  typedModel,
  createSchema,
  Type,
  ExtractDoc,
  ExtractProps,
} from 'ts-mongoose';
import { DepartmentSchema } from './Department';

export const OperatorSchema = createSchema({
  fullName: Type.string({ required: true }),
  username: Type.string({ required: true }),
  password: Type.object({ required: true }).of({
    hash: Type.string({ required: true }),
    salt: Type.string({ required: true }),
  }),
  email: Type.string(),
  disabled: Type.boolean({ default: false }),
  allDepartments: Type.boolean({ default: false }),
  departmentIds: Type.array().of(
    Type.ref(Type.objectId()).to('Department', DepartmentSchema),
  ),
  autoAccept: Type.boolean({ default: false }),
  maxActiveChats: Type.number({ default: 0 }),
  hideOnline: Type.boolean({ default: false }),
  invisibleMode: Type.boolean({ default: false }),
});

export default typedModel('Operator', OperatorSchema);
export type OperatorDoc = ExtractDoc<typeof OperatorSchema>;
export type OperatorProps = ExtractProps<typeof OperatorSchema>;
