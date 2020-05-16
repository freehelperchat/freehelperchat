import { typedModel, createSchema, Type, ExtractProps } from 'ts-mongoose';

export const DepartmentSchema = createSchema({
  name: Type.string({ required: true }),
  priority: Type.number({ required: true, default: 0 }),
  disabled: Type.boolean({ required: true, default: false }),
  hidden: Type.boolean({ required: true, default: false }),
  maxActiveChats: Type.number({ required: true, default: 0 }),
  pendingMax: Type.number({ required: true, default: 0 }),
  transferTimeout: Type.number({ required: true, default: 0 }),
});

export default typedModel('Department', DepartmentSchema);
export type DepartmentProps = ExtractProps<typeof DepartmentSchema>;
