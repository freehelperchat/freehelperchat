const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  message: {
    type: String,
  },
  time: {
    type: Date,
  },
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
  },
  operatorId: {
    type: Schema.Types.ObjectId,
    ref: 'Operator',
  },
});
module.exports = model('Message', MessageSchema);
