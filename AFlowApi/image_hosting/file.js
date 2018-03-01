var seneca = require('seneca')();
var async = require('async');

seneca
    .use("basic")
    .use("entity")
    .use('mongo-store', {
        uri: 'mongodb://localhost:27017/aflow'
    });

var fileSeneca = seneca.make('file');


module.exports = function file(options) {
    this.add('role:file,cmd:add', function add(msg, respond) {
        var file = seneca.make('file');
        file.name = msg.name;
        file.path = msg.path;
        file.mimetype = msg.mimetype;
        file.createDate = new Date();
        file.save$(function (err, entity) {
            if (msg.host && !err && entity) {
                entity.path = msg.host + entity.path;
            }
            if (!entity)
                err.status = 500;
            respond(err, entity);
        });
    });

    this.add('role:file,cmd:list', function list(msg, respond) {
        var pageSize = parseInt(msg.pageSize);
        var pageNum = parseInt(msg.pageNum);
        async.waterfall([
            function (cb) {//使用原生方式查询
                fileSeneca.native$(function (err, db) {
                    var collection = db.collection('file');
                    collection.find({}).count(function (err, count) {
                        cb(err, count);
                    });
                })
            },
            function (count, cb) {
                fileSeneca.list$({
                    sort$: {createDate: -1},
                    limit$: pageSize,
                    skip$: pageSize * (pageNum - 1)
                }, function (err, entities) {
                    var data = {
                        pageSize: pageSize,
                        pageNum: pageNum,
                        size: count,
                        list: []
                    };
                    if (msg.host && !err && entities) {
                        for (var i = 0; i < entities.length; i++) {
                            entities[i].path = msg.host + entities[i].path;
                        }
                        data.list = entities;
                    }
                    cb(err, data);
                });
            }
        ], respond);
    });

    this.add('role:file,cmd:remove', function remove(msg, respond) {
        fileSeneca.remove$({id: msg.id}, function (err, entity) {
            if (!entity) {
                err = new Error('Not Found');
                err.status = 404;
            }
            respond(err, entity);
        });
    });

    this.add('role:file,cmd:query', function query(msg, respond) {
        fileSeneca.load$({id: msg.id}, function (err, entity) {
            if (msg.host && !err && entity) {
                // var path = msg.host + entity.path;
                // path = path.replace(/\\/g, "/");
                // path = path.replace("/public", "");
                entity.path = msg.host + entity.path;
            }
            if (!entity) {
                err = new Error('Not Found');
                err.status = 404;
            }
            respond(err, entity);
        });
    });
};