
const jwt      = require('jsonwebtoken');
const crypto   = require('crypto');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
    identifier: String,
    enabled: Boolean,
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

UserSchema.index({ "identifier": 1 }, { unique : true });
UserSchema.index({ "enabled": 1 });

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    },
    getToken: function() {
        const atd = {
            _id: this._id,
            entity: 'user',
            type: 'access'
        };
        const accessToken = jwt.sign(atd, process.env.API_KEY, { expiresIn : 3600*24 });
        const rtd = {
            _id: this._id,
            entity: 'user',
            type: 'refresh'
        };
        const refreshToken = jwt.sign(rtd, process.env.API_KEY, { expiresIn : 3600*24*7 });
        return { accessToken, refreshToken };
    }
};

UserSchema.virtual('password').set(function(password) {
    if (password === null) password = new Date().getTime().toString();
    this._password = password;
    this.salt = makeSalt();
    this.hashedPassword = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
