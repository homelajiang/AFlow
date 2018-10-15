const moment = require('moment');
const config = require('../config');
const Path = require('path');

var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
    confirmed: {type: Boolean, default: false},//用户是否被验证
    role: {type: Number, default: 0},
    username: {type: String, required: true},
    userImg: {type: String, default: '/sa/simg/CN_Logo_Gray.png'},
    gender: {type: Number, default: 0},
    email: {type: String, required: true},
    signature: {type: String, default: "我这个人很勤，但是什么都没有写。"},
    joinDate: {type: Date, default: Date.now},
    lastLoginDate: {type: Date, default: Date.now},
    mobile: {type: String, default: null}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//virtual

profileSchema.virtual('model')
    .get(function () {
        return {
            username: this.username,
            userImg: Path.join(config.base_url, this.userImg),
            // require('../lib/static.js').map(this.userImg),
            gender: this.gender,
            email: this.email,
            signature: this.signature,
            confirmed: this.confirmed,
            role: this.role,
            lastLoginDate: this._lastLoginDate,
            joinDate: this._joinDate,
            mobile: getMobile(this.mobile)
        };
    });

profileSchema.virtual('_joinDate')
    .get(function () {
        return moment(this.joinDate).format("YYYY-MM-DD HH:mm:ss");
    });

profileSchema.virtual('_lastLoginDate')
    .get(function () {
        return moment(this.lastLoginDate).format("YYYY-MM-DD HH:mm:ss");
    });


profileSchema.static({
    getUpdateMode: function (model) {
        var temp = {};
        model.nickname ? temp.nickname = model.nickname : '';
        model.userImg ? temp.userImg = model.userImg : '';
        model.gender ? temp.gender = model.gender : '';
        model.email ? temp.email = model.email : '';
        model.signature ? temp.signature = model.signature : '';
        model.mobile ? temp.mobile = model.mobile : '';
        return temp;
        // _.extend(model,{
        //     mo
        // });
        // return _.omit(model, 'confirmed', 'role', 'lastLoginDate', 'joinDate', 'exp', 'time');
    }
});
// userSchema.methods.xxx = function(){
//
// };

// userSchema.method({
//    xxx:{
//
//    }
// });

//没有或者不需要特定的文档是，使用静态方法
// userSchema.static({
//    xxx:{
//
//    }
// });

// Profile.findOne();

var Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

function getMobile(mobile) {
    //TODO set mobile
    return mobile;
}
