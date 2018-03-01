var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salt = 'pink';

var oathSchema = mongoose.Schema({
    token_type: {type: String, default: 'default'},
    expires_in: {type: Number, default: 3 * 24 * 2600},//有效期
    scope: {type: String, default: 'all'},
    expires_date: {type: Date, default: Date.now},//有效期开始时间
    // grant_type: {type: String, required: true},//password refresh_token
    uid: {type: Schema.Types.ObjectId,ref:'User', required: true},
    roleId: {type: Schema.Types.ObjectId},
    username: {type: String, required: true},
    password: {type: String, required: true},
    access_token: {type: String, required: true},
    refresh_token: {type: String, required: true}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

oathSchema.virtual('model')
    .get(function () {
        return {
            "access_token": this.access_token,
            "token_type": this.token_type,
            "expires_in": this.expires_in,
            "refresh_token": this.refresh_token,
            "uid": this.uid
        };
    });


oathSchema.static({
    generateAccessToken: function (uid, username) {
        return getAccessToken(uid, username);

    },
    generateRefreshToken: function (uid, username) {
        return getRefreshToken(uid, username);
    }
});

oathSchema.method({
    generateAccessToken: function () {
        return getAccessToken(this.uid, this.username);

    },
    generateRefreshToken: function () {
        return getRefreshToken(this.uid, this.username);
    }
});

oathSchema.index({access_token: 1});
oathSchema.index({refresh_token: 1});
oathSchema.index({uid: 1});

var Oath = mongoose.model('Oath', oathSchema);

function getAccessToken(uid, username) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(uid.toString());
    sha1.update(username);
    sha1.update(salt);
    sha1.update(Math.floor(Math.random() * 1000).toString());
    sha1.update(new Date().getTime().toString());
    return sha1.digest('hex');
}

function getRefreshToken(uid, username) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(uid.toString());
    sha1.update(salt);
    sha1.update(username);
    sha1.update(Math.floor(Math.random() * 1000).toString());
    sha1.update(new Date().getTime().toString());
    return sha1.digest('hex');
}

module.exports = Oath;