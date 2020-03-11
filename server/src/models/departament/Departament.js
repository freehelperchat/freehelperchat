const mongoose = require('mongoose');

const DepartamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
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
    default: 9999,
  },
  pendingMax: {
    type: Number,
    default: 9999,
  },
  transferTimeout: {
    type: Number,
    default: 9999,
  },
});
mongoose.model('Departament', DepartamentSchema);
