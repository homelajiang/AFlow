var Post = require('../models/post');
var Tag = require('../models/tag');
var async = require('async');
var config = require('../config');
var utils = require('../utils');
var PageHandler = require('../lib/page_handler');
var MarkdownHelper = require('../lib/markdown_helper');

module.exports = {
    //按页数显示文章
    pagePage: function (req, res, next) {

        var pageNo = parseInt(req.params.pageNo) > 0 ? parseInt(req.params.pageNo) : 1;
        var pageSize = parseInt(req.params.pageSize) > 0 ? parseInt(req.params.pageSize) : 10;
        async.parallel({
            posts: function (cb) {
                Post.getSimplePosts(pageNo, pageSize, cb);
            },
            page_info: function (cb) {
                Post.getPostSize(function (err, postCount) {
                    cb(err, PageHandler.handlePageNo(pageNo, pageSize, postCount));
                });
            },
            latest_posts: function (cb) {
                Post.getLatestPosts(cb);
            },
            navigation: function (cb) {
                cb(null, config.navigation(0));
            },
            blog: function (cb) {
                cb(null, config.blog);
            }
        }, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.render('index', result);
            }
        });
    },
    //按关键字搜索文章
    searchPage: function (req, res, next) {
        //q
        res.render('search');
    },
    //获取文章详细信息
    postPage: function (req, res, next) {
        async.parallel({
            post: function (cb) {
                Post.getPostById(req.params.postId, cb);
            },
            latest_posts: function (cb) {
                Post.getLatestPosts(cb);
            },
            navigation: function (cb) {
                cb(null, config.navigation(0));
            },
            blog: function (cb) {
                cb(null, config.blog);
            }
        }, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.render('post', result);

            }
        });
    },
    // 查看文章分类
    archivePage: function (req, res, next) {

        async.parallel({
            latest_posts: function (cb) {
                Post.getLatestPosts(cb);
            },
            archives: function (cb) {
                Post.getArchivePosts(function (err, data) {
                    if (err)
                        throw err;
                    var current_year = -1;
                    var temp_res = [];
                    var temp_index = -1;

                    for (var i = 0; i < data.length; i++) {
                        if (current_year !== data[i].create_date.getFullYear()) {
                            current_year = data[i].create_date.getFullYear();
                            temp_index++;
                            temp_res.push({'year': current_year, posts: []});
                        }
                        temp_res[temp_index].posts.push(data[i]);
                    }
                    cb(null, temp_res);
                })
            },
            navigation: function (cb) {
                cb(null, config.navigation(1));
            },
            blog: function (cb) {
                cb(null, config.blog);
            }
        }, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.render('archive', result);
            }
        });
    },
    //按照tags获取文章列表
    tagPage: function (req, res, next) {

    },
    //按照categories获取文章列表
    categoriesPage: function (req, res, next) {

    },

    //创建/更新bolg
    savePost: function (req, res, next) {
        async.waterfall([
            function (cb) {
                Post.getPostById(req.body._id, function (err, post) {
                    var temp = {};
                    if (req.body.title)
                        temp.title = req.body.title;
                    if (req.body.md_content) {
                        temp.md_content = req.body.md_content;
                        temp.content = MarkdownHelper.marked(req.body.md_content);
                        //todo descripton
                        temp.modify_date = Date.now();
                    }
                    if (req.body.tags)
                        temp.tags = req.body.tags;
                    if (req.body.categories)
                        temp.categories = req.body.categories;
                    if (post == null) {
                        Post.findByIdAndUpdate(post._id, temp, cb);
                    } else {
                        Post.create(temp, cb);
                    }
                })
            }
        ], function (err, post) {
            if (err) {
                res.status(502).json();
            } else {
                res.json(post);
            }
        });
    },
    getPost: function (req, res, next) {
        Post.getPostById(req.params.postId, function (err, post) {
            if (err) {
                next(err);
            } else {
                res.json(post);
            }
        })
    },
    getPosts: function (req, res, next) {
        var pageNo = parseInt(req.params.pageNo) > 0 ? parseInt(req.params.pageNo) : 1;
        var pageSize = parseInt(req.params.pageSize) > 0 ? parseInt(req.params.pageSize) : 10;
        Post.getSimplePosts(pageNo, pageSize, function (err, posts) {
            if (err) {
                next(err);
            } else {
                res.json(posts);
            }
        })
    },
    deletePosts: function (req, res, next) {
        Post.delPosts(req.params.postIds, function (err) {
            if (err) {
                next(err);
            } else {
                res.json();
            }
        })
    }
};