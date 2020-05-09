import {
  typedModel,
  createSchema,
  Type,
  ExtractDoc,
  ExtractProps,
} from 'ts-mongoose';

export const DepartmentSchema = createSchema({
  name: Type.string({ required: true }),
  priority: Type.number({ default: 0 }),
  disabled: Type.boolean({ default: false }),
  hidden: Type.boolean({ default: false }),
  maxActiveChats: Type.number({ default: 0 }),
  pendingMax: Type.number({ default: 0 }),
  transferTimeout: Type.number({ default: 0 }),
});

export default typedModel('Department', DepartmentSchema);
export type DepartmentDoc = ExtractDoc<typeof DepartmentSchema>;
export type DepartmentProps = ExtractProps<typeof DepartmentSchema>;
