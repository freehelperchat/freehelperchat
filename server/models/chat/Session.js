const { Schema, model } = require('mongoose');

const SessionSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  operatorId: {
    type: Schema.Types.ObjectId,
    ref: 'Operator',
  },
  socketId: {
    type: String,
    default: null,
  },
  time: {
    type: String,
    required: true,
    default: new Date().getTime(),
  },
});

module.exports = model('Session', SessionSchema);
