import {
  typedModel,
  createSchema,
  Type,
  ExtractDoc,
  ExtractProps,
} from 'ts-mongoose';
import { DepartmentSchema } from './Department';
import { RoleSchema } from './Role';
import { permissionOperation } from '../../utils/PermissionManager';
import MongoType from '../../utils/MongoType';

const CustomPermissionsSchema = createSchema({
  operation: Type.string({
    required: true,
    enum: MongoType.enumToArray(permissionOperation),
  }),
  permission: Type.string({ required: true }),
});

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
    Type.ref(Type.string()).to('Department', DepartmentSchema),
  ),
  autoAccept: Type.boolean({ default: false }),
  maxActiveChats: Type.number({ default: 0 }),
  hideOnline: Type.boolean({ default: false }),
  invisibleMode: Type.boolean({ default: false }),
  roles: Type.array({ required: true }).of(
    Type.ref(Type.string()).to('Role', RoleSchema),
  ),
  customPermissions: Type.array().of(CustomPermissionsSchema),
});

export default typedModel('Operator', OperatorSchema);
export type OperatorDoc = ExtractDoc<typeof OperatorSchema>;
export type OperatorProps = ExtractProps<typeof OperatorSchema>;
