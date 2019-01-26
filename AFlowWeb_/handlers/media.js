var Media = require('../models/media');
var async = require("async");

var base_url_file = require('../config').base_url.file;

var fileSeneca = require('seneca')()
    .use("basic")
    .use("entity")
    .client(5201);


module.exports = {
    add: function (req, res, next) {
        if (req.file) {
            var f = req.file;
            fileSeneca.act({
                role: "file", cmd: "add", host: base_url_file,
                name: f.originalname,
                path: f.path,
                mimetype: f.mimetype,
                size: f.size
            }, function (err, entity) {
                if (err)
                    return next(err);
                res.json(entity);
            })
        } else {
            var err = new Error('File not existed');
            err.status = 500;
            return next(err);
        }
        /*        var i = 0;
                async.whilst(function () {
                    return i < req.files.length;
                }, function (cb) {
                    i++;
                    var f = req.files[i - 1];
                    fileSeneca.act({
                        role: "file", cmd: "add",
                        name: f.originalname,
                        path: f.path,
                        mimetype: f.mimetype,
                        size: f.size

                    }, cb)
                }, function (err) {
                    if (err) {
                        next(err);
                        return;
                    }
                    res.json({});
                });*/
    },
    remove: function (req, res, next) {
        fileSeneca.act({role: "file", cmd: "remove", id: req.params.id}, function (err, entity) {
            if (err) {
                next(err);
                return;
            }
            res.json({});
        })
    },
    query: function (req, res, next) {
        fileSeneca.act({role: "file", cmd: "query", host: base_url_file, id: req.params.id},
            function (err, entity) {
                if (err) {
                    next(err);
                    return;
                }
                res.json(entity);
            })
    },
    list: function (req, res, next) {
        fileSeneca.act({
            role: "file", cmd: "list",
            pageSize: req.query.pageSize,
            pageNum: req.query.pageNum,
            host: base_url_file
        }, function (err, entities) {
            if (err) {
                next(err);
                return;
            }
            res.json(entities);
        })
    }
};