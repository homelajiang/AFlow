const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = require('./categories');
const Tag = require('./tag');
const Profile = require('./profile');
const Util = require('../libs/util');

const DRAFT = 0;
const PUBLISHED = 1;
const DELETED = -1;

const PostSchema = new Schema({
    title: {type: String, default: "未命名"},
    description: {type: String, default: ""},
    content: {type: String, default: ""},
    create_date: {type: Date},
    modify_date: {type: Date},
    publish_date: {type: Date},
    open: {type: Number, default: 0},//公开性 0 公开  1 密码保护 2 私密
    password: {type: String, default: '000000'},//保护密码
    open_comment: {type: Boolean, default: true},//是否开放评论
    need_review: {type: Boolean, default: false},//评论是否需要审核
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    categories: {type: Schema.Types.ObjectId, ref: 'Categories'},
    status: {type: Number, default: DRAFT},//0 草稿，1 已发布 -1 已删除
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

PostSchema.virtual('model')
    .get(function () {
        const temp = {
            id: this.id,
            title: this.title,
            description: this.description,
            content: this.content,
            create_date: Util.defaultFormat(this.create_date),
            modify_date: Util.defaultFormat(this.modify_date),
            publish_date: Util.defaultFormat(this.publish_date),
            open: this.open,
            password: this.password,
            open_comment: this.open_comment,
            need_review: this.need_review,
            status: this.status
        };
        temp.categories = this.categories ? this.categories.model : null;
        const t = [];
        if (this.tags) {
            this.tags.forEach((tag) => {
                t.push(tag.model);
            });
        }
        temp.tags = t;
        return temp;
    });

PostSchema.virtual('list_model')
    .get(function () {
        const temp = {
            id: this.id,
            title: this.title,
            description: this.description,
            content: null,
            create_date: Util.defaultFormat(this.create_date),
            modify_date: Util.defaultFormat(this.modify_date),
            publish_date: Util.defaultFormat(this.publish_date),
            open: this.open,
            password: this.password,
            open_comment: this.open_comment,
            need_review: this.need_review,
            status: this.status
        };
        temp.categories = this.categories ? this.categories.model : null;
        const t = [];
        if (this.tags) {
            this.tags.forEach((tag) => {
                t.push(tag.model);
            });
        }
        temp.tags = t;
        return temp;
    });

PostSchema.static({
    getInsertModel: function (model) {
        let temp = {};
        model.title ? temp.title = model.title : '';
        model.description ? temp.description = model.description : '';
        model.content ? temp.content = model.content : '';
        model.open ? temp.open = model.open : '';
        model.password ? temp.password = model.password : '';
        model.open_comment ? temp.open_comment = model.open_comment : '';
        model.need_review ? temp.need_review = model.need_review : '';
        model.tags ? temp.tags = model.tags : '';
        model.categories ? temp.categories = model.categories : '';
        let date = new Date();
        temp.create_date = date;
        temp.modify_date = date;

        if (model.status === 1) {//立即发布
            temp.status = PUBLISHED;
            temp.publish_date = date;
        } else {//其他情况为草稿
            temp.status = DRAFT;
        }
        return temp;
    },
    getUpdateModel: function (model) {
        let current_date = new Date();

        let temp = {
            modify_date: current_date//默认的修改时间
        };

        if (model.status === 1) {//发布post
            temp.publish_date = current_date;
        }

        model.title ? temp.title = model.title : '';
        model.description ? temp.description = model.description : '';
        model.content ? temp.content = model.content : '';
        model.open ? temp.open = model.open : '';
        model.password ? temp.password = model.password : '';
        model.open_comment ? temp.open_comment = model.open_comment : '';
        model.need_review ? temp.need_review = model.need_review : '';
        model.tags ? temp.tags = model.tags : '';
        model.categories ? temp.categories = model.categories : '';
        model.status ? temp.status = model.status : '';
        return temp;
    },


});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
