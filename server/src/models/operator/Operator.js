const mongoose = require('mongoose');

const OperatorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  pass: {
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  allDepartments: {
    type: Boolean,
  },
  departmentIds: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  autoAccept: {
    type: Boolean,
  },
  maxActiveChats: {
    type: Number,
  },
  hideOnline: {
    type: Boolean,
  },
  invisibleMode: {
    type: Boolean,
  },
});
mongoose.model('Operator', OperatorSchema);
