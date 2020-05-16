import { typedModel, createSchema, Type, ExtractProps } from 'ts-mongoose';

const UserGroupSchema = createSchema({
  title: Type.string({ required: true }),
  disabled: Type.boolean({ required: true, default: false }),
});

export default typedModel('UserGroup', UserGroupSchema);
export type UserGroupProps = ExtractProps<typeof UserGroupSchema>;
