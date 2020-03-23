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
      default: new Date().getTime(),
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
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'Operator',
  },
});
module.exports = model('Chat', ChatSchema);
