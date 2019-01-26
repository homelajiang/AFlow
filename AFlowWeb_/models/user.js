var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    confirmed: {type: Boolean, default: false},//用户是否被验证
    role: {type: Number, default: 0},
    username: {type: String, required: true},
    userImg: {type: String, default: '/sa/simg/CN_Logo_Gray.png'},
    gender: {type: Number, default: 0},
    email: {type: String, default: null},
    signature: {type: String, default: "default signature"},
    lastLoginDate: {type: Date, default: Date.now},
    joinDate: {type: Date, default: Date.now},
    mobile: {type: String, default: null},//
    exp: {type: Number, default: 0},//
    time: {type: Number, default: 0}//积分
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

//virtual

userSchema.virtual('model')
    .get(function () {
        return {
            nickname: this.nickname,
            userImg: require('../lib/static.js').map(this.userImg),
            gender: this.gender,
            email: this.email,
            signature: this.signature,
            confirmed: this.confirmed,
            role: this.role,
            lastLoginDate: this.lastLoginDate,
            joinDate: this.joinDate,
            mobile: getMobile(this.mobile),
            exp: this.exp,
            level: getLevel(this.exp),
            time: this.time
        };
    });


userSchema.static({
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

// User.findOne();

var User = mongoose.model('User', userSchema);

module.exports = User;

function getLevel(exp) {
    //TODO set level
    return exp;
}

function getMobile(mobile) {
    //TODO set mobile
    return mobile;
}