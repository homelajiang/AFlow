const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DateTimeUtil = require('../utils/datetime_util');


const CommentSchema = new Schema({
    name: {type: String},
    email: {type: String},
    content: {type: String},
    create_date: {type: Date, default: Date.now()},
    modify_date: {type: Date, default: Date.now()},
    ref_id: {type: Schema.Types.ObjectId},
    status: {type: Number, default: 0},//0 发布 1 待审核 -1 删除
    delete_reason: {type: String},
    delete_date: {type: Date, default: Date.now()}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

CommentSchema.virtual('model')
    .get(function () {
        return {
            id: this._id,
            name: this.name,
            email: this.email,
            content: this.content,
            create_date: DateTimeUtil(this.create_date),
            modify_date: DateTimeUtil(this.modify_date),
            ref_id: this.ref_id,
            status: this.status,
            delete_reason: this.delete_reason,
            delete_date: DateTimeUtil(this.delete_date)
        }
    });

CommentSchema.static({
    getInsertModel: function (model) {
        let temp = {};
        model.name ? temp.name = model.name : '';
        model.email ? temp.email = model.email : '';
        model.content ? temp.content = model.content : '';
        return temp;
    },
    getUpdateModel: function (model) {
        let temp = {
            modify_date: Date.now()
        };
        if (model.status || model.status === 0)
            temp.status = model.status;
        return temp;
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
