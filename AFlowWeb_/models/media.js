var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mediaSchema = new Schema({
    name: {type: String, require: true},
    path: {type: String, require: true},
    type: String,
    size: Number,
    createDate: {type: Date, default: Date.now()}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

var Media = mongoose.model('Media', mediaSchema);

module.exports = Media;