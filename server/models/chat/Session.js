const { Schema, model } = require('mongoose');

const SessionSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'Operator',
  },
  socket: {
    type: String,
    default: null,
  },
  time: {
    type: String,
    required: true,
    default: () => new Date().getTime(),
  },
});

module.exports = model('Session', SessionSchema);
