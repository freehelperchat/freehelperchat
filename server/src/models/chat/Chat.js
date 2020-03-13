const { Schema, model } = require('mongoose');

const ChatSchema = new Schema({
  userData: [{
    fieldId: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }],
  time: {
    started: {
      type: String,
      required: true,
    },
    closed: {
      type: String,
    },
    pending: {
      type: String,
    },
  },
  lastOperatorMsg: {
    type: String,
  },
  lastUserMsg: {
    type: String,
  },
  status: {
    type: Number,
    required: true,
  },
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'Operator',
  },
});
module.exports = model('Chat', ChatSchema);
