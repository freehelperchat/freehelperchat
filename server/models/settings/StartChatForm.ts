import { typedModel, createSchema, Type, ExtractProps } from 'ts-mongoose';

const StartChatFormSchema = createSchema({
  name: Type.string({ required: true }),
  label: Type.string({ required: true }),
  inputType: Type.string({ required: true }),
  required: Type.boolean({ required: true }),
  options: Type.array({ default: [] }).of(Type.string()),
});
export default typedModel('StartChatForm', StartChatFormSchema);
export type StartChatFormProps = ExtractProps<typeof StartChatFormSchema>;
