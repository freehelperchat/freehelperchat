const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
  },
  operatorId: {
    type: Schema.Types.ObjectId,
    ref: 'Operator',
    required: true,
  },
});
module.exports = model('Message', MessageSchema);
