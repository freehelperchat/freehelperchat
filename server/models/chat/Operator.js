const { Schema, model } = require('mongoose');

const OperatorSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
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
    default: false,
  },
  allDepartments: {
    type: Boolean,
    default: false,
  },
  departmentIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Department',
  }],
  autoAccept: {
    type: Boolean,
    default: false,
  },
  maxActiveChats: {
    type: Number,
    default: 0,
  },
  hideOnline: {
    type: Boolean,
    default: false,
  },
  invisibleMode: {
    type: Boolean,
    default: false,
  },
});
module.exports = model('Operator', OperatorSchema);
