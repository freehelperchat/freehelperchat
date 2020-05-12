import {
  typedModel,
  createSchema,
  Type,
  ExtractDoc,
  ExtractProps,
} from 'ts-mongoose';

export const RoleSchema = createSchema({
  _id: Type.string({ required: true }),
  permissions: Type.array({ required: true }).of(Type.string()),
});

export default typedModel('Role', RoleSchema);
export type RoleDoc = ExtractDoc<typeof RoleSchema>;
export type RoleProps = ExtractProps<typeof RoleSchema>;
