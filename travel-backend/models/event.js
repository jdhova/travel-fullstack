const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 52,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
