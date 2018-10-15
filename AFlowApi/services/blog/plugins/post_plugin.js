const Post = require('../../../models/post');
const Tag = require('../../../models/tag');
const Categories = require('../../../models/categories');
/*const async = require('async');
const seneca = require('seneca')();
seneca
    .use("basic")
    .use("entity")
    .use('mongo-store', {
        uri: 'mongodb://localhost:27017/aflow'
    });*/

/*const postSeneca = seneca.make('post');
const tagSeneca = seneca.make('tag');
const categoriesSeneca = seneca.make('categories');*/

module.exports = function blog(options) {
    //post
    this.add('role:blog,cmd:add', function (msg, respond) {
        var post = new Post({
            title: msg.title,
            description: msg.description,
            content: msg.content,
            md_content: msg.content,
            create_date: new Date(),
            modify_date: new Date(),
            status: 0
        });
        post.save(respond);
        /*        var post = seneca.make('post');
                post.title = msg.title;
                post.description = msg.description;
                post.content = msg.content;
                post.md_content = msg.md_content;
                post.create_date = new Date();
                post.modify_date = new Date();
                // post.tags
                // post.categories=
                // post.creator
                // post.status//0草稿 1已发布 -1已删除*/
    });
    this.add('role:blog,cmd:query', (msg, respond) => {
        // postSeneca.load$({id: msg.id}, respond);
        Post.findById(msg.id)
            .populate('categories')
            .populate('creator')
            .populate('tags')
            .exec(respond);
    });
    this.add('role:blog,cmd:list', async (msg, respond) => {
        try {
            var pageSize = parseInt(msg.pageSize);
            var pageNum = parseInt(msg.pageNum);
            const count = await Post.find({}).count();
            const posts = await Post.find({})
                .populate('categories')
                .populate('creator')
                .populate('tags')
                .skip((pageNum - 1) * pageSize)
                .limit(pageSize)
                .sort({create_date: -1});
            var data = {
                pageSize: pageSize,
                pageNum: pageNum,
                size: count,
                list: posts
            };
            respond(null, data);
        } catch (err) {
            respond(err, null);
        }
        /*        postSeneca.native$(function (err, db) {
                    var collection = db.collection('posts');
                    collection.aggregate([
                        {
                            "$sort": {
                                "createDate": -1
                            }
                        },
                        {
                            "$lookup": {
                                "localField": "categories",
                                "from": "categories",
                                "foreignField": "_id",
                                "as": "categories"
                            }
                        },
                        {
                            "$unwind": "$categories"
                        },
                        {
                            "$lookup": {
                                "localField": "creator",
                                "from": "users",
                                "foreignField": "_id",
                                "as": "creator"
                            }
                        },
                        {
                            "$unwind": "$creator"
                        },
                        {
                            "$lookup": {
                                "localField": "tags",
                                "from": "tags",
                                "foreignField": "_id",
                                "as": "tags"
                            }
                        },
                        {
                            "$skip": 0
                        },
                        {
                            "$limit": 10
                        }
                    ], respond)
                })*/
    });
    this.add('role:blog,cmd:remove', function (msg, respond) {
        Post.remove({_id: {$in: JSON.parse(msg.ids)}}, respond);
    });
    //tag
    this.add('role:tag,cmd:add', function (msg, respond) {
        var tag = new Tag({
            name: msg.name
        });
        tag.save(respond);
    });
    this.add('role:tag,cmd:query', function (msg, respond) {
        Tag.findById(msg.id, respond);
    });
    this.add('role:tag,cmd:list', function (msg, respond) {
        Tag.find({})
            .exec(respond);
    });
    this.add('role:tag,cmd:remove', function (msg, respond) {
        Tag.remove({_id: {$in: JSON.parse(msg.ids)}}, respond);
    });
    //categories
    this.add('role:categories,cmd:add', function (msg, respond) {
        var categories = new Categories({
            name: msg.name
        });
        categories.save(respond);
    });
    this.add('role:categories,cmd:query', function (msg, respond) {
        Categories.findById(msg.id, respond);
    });
    this.add('role:categories,cmd:list', function (msg, respond) {
        Categories.find({})
            .exec(respond);
    });
    this.add('role:categories,cmd:remove', function (msg, respond) {
        Categories.remove({_id: {$in: JSON.parse(msg.ids)}}, respond);
    });
};