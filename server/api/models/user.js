const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        identifier: { type: String },
        enabled: { type: Boolean, default: true },
    },
    { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

UserSchema.index({ identifier: 1 }, { unique: true });
UserSchema.index({ enabled: 1 });

UserSchema.methods = {
    getToken: function () {
        const atd = {
            _id: this._id,
            entity: 'user',
            type: 'access',
        };
        const accessToken = jwt.sign(atd, process.env.API_KEY, {
            expiresIn: 3600 * 24,
        });
        const rtd = {
            _id: this._id,
            entity: 'user',
            type: 'refresh',
        };
        const refreshToken = jwt.sign(rtd, process.env.API_KEY, {
            expiresIn: 3600 * 24 * 7,
        });
        return { accessToken, refreshToken };
    },
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
