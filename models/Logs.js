const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    tech: {
      type: String,
      required: true,
    },
    attention: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
logSchema.index({ message: 'text', tech: 'text' });
//logSchema.index({ message: 'text' });

module.exports = mongoose.model('Logs', logSchema);
