const { Schema, model } = require('mongoose');

const ChatSchema = new Schema({
  userData: {
    type: Object,
    required: true,
  },
  time: {
    started: {
      type: Date,
      required: true,
    },
    closed: {
      type: Date,
      required: true,
    },
    pending: {
      type: Date,
      require: true,
    },
  },
  lastOperatorMsg: {
    type: Date,
  },
  lastUserMsg: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'Operator',
  },
});
module.exports = model('Chat', ChatSchema);
