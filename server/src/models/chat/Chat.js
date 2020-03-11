const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operator',
  },
});
mongoose.model('Chat', ChatSchema);
