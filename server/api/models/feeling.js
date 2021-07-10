const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const FeelingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    feelingType: {
        id: { type: Schema.Types.ObjectId, ref: 'FeelingType' },
        code: { type: String }
    },
    title: { type: String },
    shortDescription: { type: String },
    feelingDescription: { type: String },
    feelingPicture: {
        fileName: String,
        url: String,
        mimeType: String
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

FeelingSchema.index({ "user": 1 });
FeelingSchema.index({ "created": 1 });
FeelingSchema.index({ "updated": 1 });
FeelingSchema.index({ "feelingType": 1 });
FeelingSchema.index({ "title": 'text' });

const Feeling = mongoose.model('Feeling', FeelingSchema);
module.exports = Feeling;
