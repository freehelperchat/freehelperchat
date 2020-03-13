const { Schema, model } = require('mongoose');

const CannedSchema = new Schema({
  msg: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  departmentIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Department',
  }],
  autoSend: {
    type: Boolean,
    default: false,
  },
});
module.exports = model('CannedMessage', CannedSchema);
