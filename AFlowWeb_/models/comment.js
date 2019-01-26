var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content: {type: String, require: true},
    img: {type: String, require: true},
    name: {type: String, require: true},
    email: {type: String, require: true},
    postId: {type: Schema.Types.ObjectId, ref: 'Comment', required: true},
    createDate: {type: Date, require: true, default: Date.now()},
    delFlag: {type: Boolean, default: false}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;