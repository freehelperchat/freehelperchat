import { typedModel, createSchema, Type, ExtractProps } from 'ts-mongoose';

const IdCounterSchema = createSchema({
  _id: Type.string({ required: true }),
  value: Type.number({ required: true, default: 0 }),
});

export default typedModel('IdCounter', IdCounterSchema);
export type IdCounterProps = ExtractProps<typeof IdCounterSchema>;
