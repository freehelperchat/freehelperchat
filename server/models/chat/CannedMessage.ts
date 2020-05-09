import { Types, Document, Schema, model } from 'mongoose';

const CannedSchema = new Schema({
  msg: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  departmentIds: [
    {
      type: Types.ObjectId,
      ref: 'Department',
    },
  ],
  autoSend: {
    type: Boolean,
    default: false,
  },
});

export interface ICannedMessage extends Document {
  msg: string;
  title: string;
  departmentIds: Types.Array<Types.ObjectId>;
  autoSend: boolean;
}

export default model<ICannedMessage>('CannedMessage', CannedSchema);
