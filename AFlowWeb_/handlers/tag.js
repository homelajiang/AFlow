var Post = require('../models/post');
var Tag = require('../models/tag');
var async = require('async');
var config = require('../config');
var utils = require('../utils');
var PageHandler = require('../lib/page_handler');
var MarkdownHelper = require('../lib/markdown_helper');

module.exports = {
    //搜索tag
    getTagsByWord: function (req, res, next) {
        var keyword = req.query.keyword;
        Tag.searchLike(keyword, function (err, tags) {
            if (err) {
                res.status(502).json();
            } else {
                res.json(tags);
            }
        })
    },
    //分页获取tag
    getTags: function (req, res, next) {
        var pageNo = req.query.pageNo ? req.query.pageNo : 1;
        var pageSize = req.query.pageSize ? req.query.req.query.pageSize : 10;
        Tag.getTags(pageNo,pageSize,function(err,tags){
            if(err){
                res.status(502).json();
            }else {
                res.json(tags);
            }
        })
    },
    //添加tag
    addTag: function (req, res, next) {
        var tag = new Tag({
            title: req.body.title,
            image: req.body.image
        });

        tag.save(function (err, tag) {
            if (err) {
                res.status(502).json();
            } else {
                res.json(tag);
            }
        })
    },
    //修改tag
    updateTag: function (req, res, next) {
        var tag = {
            title: req.body.title,
            image: req.body.image
        };
        Tag.findByIdAndUpdate(req.body._id, tag, function (err, tag) {
            if (err) {
                res.status(502).json();
            } else {
                res.json(tag);
            }
        })
    },
    //删除tag
    deleteTag: function (req, res, next) {
        Tag.remove({_id: req.body._id}, function (err) {
            if (err) {
                res.status(502).json();
            } else {
                res.json();
            }
        })
    }

};