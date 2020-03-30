const { Schema, model } = require('mongoose');

const IdCounterSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
  },
});

module.exports = model('IdCounter', IdCounterSchema);
