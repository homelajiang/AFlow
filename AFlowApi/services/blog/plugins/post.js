const Post = require('../../../models/post');
const Tag = require('../../../models/tag');
const Categories = require('../../../models/categories');
const Util = require('../util');
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


module.exports = function (options) {
    //添加post
    this.add('role:post,cmd:add', (msg, respond) => {

        new Post(msg.post)
            .save(respond);
    });

    //查询post(id)
    this.add('role:post,cmd:query', (msg, respond) => {
        Post.findById(msg.id)
            .populate('categories')
            .populate('creator')
            .populate('tags')
            .exec(respond);
    });

//查询post列表
    this.add('role:post,cmd:list', async (args, respond) => {
        try {
            const pageSize = parseInt(args.pageSize);
            const pageNum = parseInt(args.pageNum);

            let count;
            let posts;

            if (args.key) {
                count = await Post.find()
                    .or([
                        {name: {$regex: new RegExp(args.key, 'i')}},
                        {alias: {$regex: new RegExp(args.key, 'i')}},
                        {description: {$regex: new RegExp(args.key, 'i')}}
                    ])
                    .countDocuments();

                posts = await Post.find()
                    .or([
                        {name: {$regex: new RegExp(args.key, 'i')}},
                        {alias: {$regex: new RegExp(args.key, 'i')}},
                        {description: {$regex: new RegExp(args.key, 'i')}}
                    ])
                    .populate('categories')
                    .populate('creator')
                    .populate('tags')
                    .skip((pageNum - 1) * pageSize)
                    .limit(pageSize)
                    .sort({create_date: -1});
            } else {
                count = await Post.find().countDocuments();
                posts = await Post.find()
                    .populate('categories')
                    .populate('creator')
                    .populate('tags')
                    .skip((pageNum - 1) * pageSize)
                    .limit(pageSize)
                    .sort({create_date: -1});
            }

            respond(null, Util.generatePageModel(pageSize, pageNum, count, posts));
        } catch (err) {
            respond(err, null);
        }
    });

    //删除post
    this.add('role:post,cmd:remove', function (args, respond) {
        // Post.remove({_id: {$in: JSON.parse(msg.ids)}}, respond);
        Post.findOneAndDelete({_id: args.id}, respond);
    });

    //标记删除post
    this.add('role:post,cmd:delete', function (args, respond) {
        Post.updateOne({_id: args.id}, {
            status: -1,
            delete_date: Date.now(),
            delete_reason: args.delete_reason
        }, respond);
    });

    //更新post
    this.add('role:post,cmd:update', (args, respond) => {
        const post = args.post;
        post.modify_date = Date.now();
        Post.updateOne({_id: args.id}, post, respond);
    });

    return 'post';
};
