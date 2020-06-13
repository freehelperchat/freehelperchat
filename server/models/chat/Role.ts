import { typedModel, createSchema, Type, ExtractProps } from 'ts-mongoose';

export const RoleSchema = createSchema({
  _id: Type.string({ required: true }),
  permissions: Type.number({ default: 0, required: true }),
});

export default typedModel('Role', RoleSchema);
export type RoleProps = ExtractProps<typeof RoleSchema>;
