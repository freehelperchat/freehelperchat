const mongoose = require('mongoose');

const CannedSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  autoSend: {
    type: Boolean,
    default: false,
  },
});
mongoose.model('CannedMessage', CannedSchema);
