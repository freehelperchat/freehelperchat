const { Schema, model } = require('mongoose');

const UserGroupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },

});
module.exports = model('UserGroup', UserGroupSchema);
