var post = require('../models/post');
var should = require('should');
var mongoose = require('mongoose');
var config = require('../config');
var async = require('async');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.development.connectionString);

var user = require('../models/user');
var tag = require('../models/tag');
var categories = require('../models/categories');
var oath = require('../models/oath');

describe('文章的查询操作', function () {

    var test_user = {
        username: '测试账户',
        password: '10010'
    };

    var test_tag = [{name: 'android'},
        {name: 'node'}, {name: 'java'}];

    var test_categories = {name: '科技'};

    var oathT;
    var tagT;
    var categoriesT;

    //添加测试文章
    before(function (done) {
        async.waterfall([
            //创建用户
            function (cb) {//检查用户是否已经存在
                oath.findOne({username: test_user.username}, cb)
            },
            function (oath, cb) {//如果账号已经存在则删除账号
                if (oath) {
                    oath.remove({username: test_user.username}, function (err) {
                        cb(err);
                    })
                } else {
                    cb(null);
                }
            },
            function (cb) {//创建user
                new user({
                    username: test_user.username
                })
                    .save(function (err, res) {
                        cb(err, res);
                    });
            },
            function (u, cb) {//创建oath
                new oath({
                    uid: u._id,
                    username: test_user.username,
                    password: test_user.password,
                    access_token: oath.generateAccessToken(u._id, test_user.username),
                    refresh_token: oath.generateAccessToken(u._id, test_user.username)
                })
                    .save(function (err, res) {
                        cb(null, res);
                    });
            },
            //创建tags
            function (oath, cb) {
                oathT = oath;
                tag.insertMany(test_tag, function (err, res) {
                    cb(err, res);
                });
            },
            //创建分类
            function (tags, cb) {
                tagT = tags;
                new categories({
                    name: test_categories.name
                })
                    .save(function (err, res) {
                        cb(err, res);
                    });
            },
            //添加文章
            function (categories, cb) {
                categoriesT = categories;

                var post_temp = [];
                var i = 0;

                for (; i < 20; i++) {
                    post_temp.push({
                        title: "测试标题" + i,
                        description: "测试描述描述" + i,
                        content: "测试内容" + i,
                        tags: [tagT[0]._id, tagT[1]._id],
                        categories: categoriesT._id,
                        creator: oathT.uid
                    });
                }

                for (; i < 40; i++) {
                    post_temp.push({
                        title: "测试标题" + i,
                        description: "测试描述描述" + i,
                        content: "测试内容" + i,
                        tags: [tagT[2]._id, tagT[1]._id],
                        categories: categoriesT._id,
                        creator: oathT.uid
                    });
                }

                for (; i < 60; i++) {
                    post_temp.push({
                        title: "测试标题" + i,
                        description: "测试描述描述" + i,
                        content: "测试内容" + i,
                        tags: [tagT[0]._id, tagT[2]._id],
                        categories: categoriesT._id,
                        creator: oathT.uid
                    });
                }
                post.insertMany(post_temp, function (err, res) {
                    cb(err, res);
                });
            }
        ], function (err, res) {
            done(err, res);
        });
    });
    //删除测试文章
    after(function (done) {
        async.parallel([
            //删除测试文章
            function (cb) {
                post.remove({creator: oathT.uid}, cb)
            },
            //删除创建的tag
            function (cb) {
                tag.remove({_id: {$in: [tagT[0]._id, tagT[1]._id, tagT[2]._id]}}, cb);
            },
            //删除创建的分类
            function (cb) {
                categories.remove({_id: categoriesT._id}, cb);
            },
            //删除创建的用户
            function (cb) {
                oath.remove({uid: oathT.uid}, cb);
            },
            function (cb) {
                user.remove({username: oathT.username}, cb);
            }
        ], done);
    });


    it('文章简介列表获取测试', function (done) {
        post.getSimplePosts(1, 10, function (err, data) {
            if (err)
                return done(err);
            should(data).be.a.Array();
            // data.should.have.length(3);
            done();
        })
    });

    it('最新文章简介列表获取测试', function (done) {
        post.getLatestPosts(function (err, res) {
            if (err)
                throw err;
            res.should.be.a.Array();
            done();
        })
    });

    it('通过tagId获取文章列表信息', function (done) {
        post.getTagPosts(tagT[0]._id, 1, 10, function (err, res) {
            if (err)
                throw err;
            res.should.be.a.Array();
            done();
        })
    });
    it('通过categoriesId获取文章列表简要信息', function (done) {
        post.getCategoriesPosts(categoriesT._id, 1, 10, function (err, res) {
            if (err)
                throw err;
            res.should.be.a.Array();
            done();
        })
    });
    it('按照指定的关键字进行文章搜索', function (done) {
        post.getKeywordPosts('内容3', 1, 10, function (err, res) {
            if (err)
                throw err;
            res.should.be.a.Array();
            done();
        })
    });
    it('获取档案格式的文章信息列表', function (done) {
        post.getArchivePosts(function (err, res) {
            if (err)
                throw err;
            res.should.be.a.Array();
            done();
        })
    })
});