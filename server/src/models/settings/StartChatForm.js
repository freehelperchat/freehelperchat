const { Schema, model } = require('mongoose');

const StartChatFormSchema = new Schema({
  fields: [{
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: [],
    },
  }],
});
module.exports = model('StartChatForm', StartChatFormSchema);
