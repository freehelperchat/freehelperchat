const { Schema, model } = require('mongoose');

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    default: 0,
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  hidden: {
    type: Boolean,
    required: true,
    default: false,
  },
  maxActiveChats: {
    type: Number,
    default: 0,
  },
  pendingMax: {
    type: Number,
    default: 0,
  },
  transferTimeout: {
    type: Number,
    default: 0,
  },
});
module.exports = model('Department', DepartmentSchema);
