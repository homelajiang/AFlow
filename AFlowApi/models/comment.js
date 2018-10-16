const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    content: {type: String, require: true},
    create_date: {type: Date, default: Date.now()},
    modify_date: {type: Date, default: Date.now()},
    ref_id: {type: Schema.Types.ObjectId},
    status: {type: Number, default: 0},//0 发布 1 待审核 -1 删除
    delete_reason: {type: String},
    delete_date: {type: Date, default: Date.now()}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
