var File = require('../../../models/file');
/*
var seneca = require('seneca')();
seneca
    .use("basic")
    .use("entity");*/

module.exports = function file(options) {
    this.add('role:file,cmd:add', function add(msg, respond) {

        var file = new File({
            name: msg.name,
            path: msg.path,
            mimetype: msg.mimetype,
            create_date: new Date()
        });

        file.save(respond);

        /*        var file = seneca.make('file');
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
                });*/
    });

    this.add('role:file,cmd:list', async function list(msg, respond) {
        try {
            var pageSize = parseInt(msg.pageSize);
            var pageNum = parseInt(msg.pageNum);
            const count = await File.count();
            const files = await File.find({})
                .sort('-create_date')
                .skip(pageSize * (pageNum - 1))
                .limit(pageSize);

            for (index in files) {
                files[index].path = msg.host + files[index].path;
            }

            var data = handlePageNum(pageNum, pageSize, count);
            data.list = files;
            respond(null, data);
        } catch (err) {
            respond(err, null);
        }

        /*        async.waterfall([
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
                ], respond);*/
    });

    this.add('role:file,cmd:remove', function remove(msg, respond) {
        File.remove({_id: {$in: JSON.parse(msg.ids)}}, respond);
        /*        fileSeneca.remove$({id: msg.id}, function (err, entity) {
                    if (!entity) {
                        err = new Error('Not Found');
                        err.status = 404;
                    }
                    respond(err, entity);
                });*/
    });

    this.add('role:file,cmd:query', (msg, respond) => {
        File.findById(msg.id, (err, entity) => {
            if (msg.host && !err && entity) {
                // var path = msg.host + entity.path;
                // path = path.replace(/\\/g, "/");
                // path = path.replace("/public", "");
                entity.path = msg.host + entity.path;
            }
            respond(err, entity);
        });

        /*        fileSeneca.load$({id: msg.id}, function (err, entity) {
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
                });*/
    });


    function handlePageNum(page, size, count) {
        return {
            pageSize: size,
            pageNum: page,
            size: count,
            firstPage: page === 1,
            lastPage: page * size >= count,
            hasNextPage: (page + 1) * size <= count,
            hasPreviousPage: (page - 1) * size <= count && (page - 1) > 0,
            list: []
        };

    }
};