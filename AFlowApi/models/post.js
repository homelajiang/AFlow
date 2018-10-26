const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = require('./categories');
const Tag = require('./tag');
const Profile = require('./profile');
const Util = require('../libs/util');

const DRAFT = 0;
const PENDING = 1;
const PUBLISHED = 2;
const DELETED = -1;

const PostSchema = new Schema({
    title: {type: String, default: "未命名"},
    description: {type: String, default: ""},
    content: {type: String, default: ""},
    create_date: {type: Date, default: Date.now()},
    modify_date: {type: Date, default: Date.now()},
    open: {type: Number, default: 0},//公开性 0 公开  1 密码保护 2 私密
    password: {type: String, default: '000000'},//保护密码
    open_comment: {type: Boolean, default: true},//是否开放评论
    need_review: {type: Boolean, default: false},//评论是否需要审核
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    categories: {type: Schema.Types.ObjectId, ref: 'Categories'},
    creator: {type: Schema.Types.ObjectId, ref: 'Profile'},
    status: {type: Number, default: DRAFT},//0 草稿，1 待审核 -1 已删除 2 已发布
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
            open: this.open,
            password: this.password,
            open_comment: this.open_comment,
            need_review: this.need_review,
            creator: this.creator.model,
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
        model.creator ? temp.creator = model.creator : '';
        return temp;
    },
    getUpdateModel: function (model) {
        let temp = {
            modify_date: Date.now()
        };
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

    getPostById: function (postId, cb) {
        Post.findOne({_id: postId})
            .populate('categories')
            .populate('creator')
            .populate('tags')
            .limit(1)
            .exec(cb);
    },
    /**
     * 获取文章简单列表信息
     * @param pageNo
     * @param pageSize
     * @param callback
     */
    getSimplePosts: function (pageNo, pageSize, callback) {
        Post.find({delFlag: false})
            .select('title createDate tags categories description creator')
            .populate('categories')
            .populate('creator')
            .populate('tags')
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            .sort({createDate: -1})
            .exec(callback)
    },
    /**
     * 获取热门的5条文章标题
     * @param callback
     */
    getLatestPosts: function (callback) {
        Post.find({delFlag: false})
            .select('title createDate tags categories description creator')
            .populate('categories')
            .populate('creator')
            .populate('tags')
            .sort('-createDate')
            .limit(5)
            .exec(callback);
    },
    /**
     * 获取文章条目数量
     * @param callback
     */
    getPostSize: function (callback) {
        Post.count()
            .exec(callback)
    },
    /**
     * 获取文章的档案信息
     * @param callback
     */
    getArchivePosts: function (callback) {
        Post.find({delFlag: false})
            .select({'title': 1, 'createDate': 1})
            .sort({createDate: -1})
            .exec(callback)
    },
    /**
     * 通过tagId获取文章列表信息
     * @param tagId
     * @param pageNo
     * @param pageSize
     * @param callback
     */
    getTagPosts: function (tagId, pageNo, pageSize, callback) {
        Post.find(
            {
                tags: tagId,
                delFlag: false
            }
        )
            .select({'title': 1, 'description': 1, 'createDate': 1, 'tags': 1, 'categories': 1, 'creator': 1})
            .populate('categories')
            .populate('creator')
            .populate('tags')
            .skip((pageNo - 1) * pageSize)
            .sort({createDate: -1})
            .exec(callback)
    },
    /**
     * 通过categoriesId获取文章列表信息
     * @param categoriesId
     * @param pageNo
     * @param pageSize
     * @param callback
     */
    getCategoriesPosts: function (categoriesId, pageNo, pageSize, callback) {
        Post.find({
            categories: categoriesId,
            delFlag: false
        })
            .select({'title': 1, 'description': 1, 'createDate': 1, 'tags': 1, 'categories': 1, 'creator': 1})
            .populate('categories')
            .populate('creator')
            .populate('tags')
            .skip((pageNo - 1) * pageSize)
            .sort({createDate: -1})
            .exec(callback)
    },
    /**
     * 通过关键字获取文章列表信息
     * @param q
     * @param pageNo
     * @param pageSize
     * @param callback
     */
    getKeywordPosts: function (q, pageNo, pageSize, callback) {
        Post.find({delFlag: false})
            .or([
                {title: {$regex: new RegExp(q, 'i')}},
                {content: {$regex: new RegExp(q, 'i')}},
                {description: {$regex: new RegExp(q, 'i')}}
            ])
            .select('title createDate tags categories description creator')
            .populate('categories')
            .populate('creator')
            .populate('tags')
            .skip((pageNo - 1) * pageSize)
            .sort({createDate: -1})
            .exec(callback)
    },
    /**
     * 批量删除文章<b>(删除位置为true)</b>
     * @param postIds
     * @param callback
     */
    delPosts: function (postIds, callback) {
        Post.where({_id: {$in: postIds}})
            .update({status: DELETED})
    },
    /**
     * 批量移除文章<b>(彻底删除文章)</b>
     * @param postIds
     * @param callback
     */
    removePosts: function (postIds, callback) {
        Post.remove({_id: {$in: postIds}}, function (err) {

        })
    }

});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
