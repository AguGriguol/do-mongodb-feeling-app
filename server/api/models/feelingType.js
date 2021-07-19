const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeelingTypeSchema = new Schema(
  {
    code: { type: String }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

const FeelingType = mongoose.model('FeelingType', FeelingTypeSchema);
module.exports = FeelingType;
