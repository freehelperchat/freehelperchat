const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
    default: new Date().getTime(),
  },
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
  },
  operator: {
    type: Boolean,
    required: true,
    default: false,
  },
  operatorId: {
    type: Schema.Types.ObjectId,
    ref: 'Operator',
  },
});
module.exports = model('Message', MessageSchema);
