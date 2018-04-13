var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Profile = require('./profile');

var authSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, default: null},//
    password: {type: String, required: true},
    profile: {type: Schema.Types.ObjectId, ref: 'Profile', require: true}
}, {
    versionKey: false
});


var Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;