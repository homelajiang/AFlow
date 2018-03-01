var Error = require('../lib/error');
var async = require('async');
var helper = require('../lib/helpers');
var fs = require("fs");
var Chapter = require('../models/chapter');
var Doc = require('../models/coc');


module.exports = {
//获取chapter列表
    getChapters: function (req, res, next) {
        Chapter.find(function (err, chapters) {
            if (err) {
                helper.res(req, res, err);
                return;
            } else {
                var temp = [];
                chapters.map(function (val) {
                    temp.push(val.model);
                });
                helper.res(req, res, null, temp);
            }
        });
    },
    //上传doc
    createWithUpload: function (req, res, next) {
        async.waterfall(
            [
                //获取json文件数据
                function (cb) {
                    if (!req.file) {
                        cb(Error.request_params_invalid(req));
                        return;
                    }
                    var temp = req.file.buffer.toString();
                    var json;
                    try {
                        json = JSON.parse(temp);
                        if (!json.info._postman_id)
                            throw new Error('data error!!!');
                    } catch (e) {
                        cb(Error.upload_file_invalid(req));
                        return;
                    }
                    cb(null, json);
                },
                //入库
                function (data, cb) {
                    Doc.insertDocs(data, function (err) {
                        cb(err);
                    });
                }
            ]
            , function (err, data) {
                helper.res(req, res, err, data);
            });
    },
    //删除chapter
    deleteChapters: function (req, res, next) {
        async.waterfall([
            function (cb) {
                Chapter.findById(req.params.chapterId)
                    .remove(function (err) {
                        cb(err);
                    });
            },
            function (cb) {
                Doc.find({chapterId: req.params.chapterId})
                    .remove(function (err) {
                        cb(err);
                    });
            }
        ], function (err) {
            helper.res(req, res, err);
        });
    },
    //更新chapter
    updateChapters: function (req, res, next) {
        Chapter.findByIdAndUpdate(req.params.chapterId,
            Chapter.getUpdateMode(req.body), function (err) {
                helper.res(req, res, err);
            })
    },
    //获取chapter对应的doc
    getDocs: function (req, res, next) {
        Chapter.findById(req.params.chapterId)
            .populate('item')
            //model
            .exec(function (err, chapter) {
                helper.res(req, res, err, chapter);
            });
    },
    //更新doc unchecked
    updateDocs: function (req, res, next) {
        Doc.find({_id: req.params.docId, chapterId: req.params.chapterId})
            .update(Doc.getUpdateMode(req.body), function (err) {
                helper.res(req, res, err);
            });
    }
};