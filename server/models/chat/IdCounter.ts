// import { Document, Schema, model } from 'mongoose';
import {
  typedModel,
  createSchema,
  Type,
  ExtractDoc,
  ExtractProps,
} from 'ts-mongoose';

const IdCounterSchema = createSchema({
  _id: Type.string({ required: true }),
  value: Type.number({ required: true, default: 0 }),
});

export default typedModel('IdCounter', IdCounterSchema);
export type IdCounterDoc = ExtractDoc<typeof IdCounterSchema>;
export type IdCounterProps = ExtractProps<typeof IdCounterSchema>;
