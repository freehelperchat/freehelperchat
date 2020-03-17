const { Schema, model } = require('mongoose');

const StartChatFormSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  options: {
    type: Array,
    default: [],
  },
});
module.exports = model('StartChatForm', StartChatFormSchema);