'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

    this.add('role:file,cmd:list', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg, respond) {
            var pageSize, pageNum, count, files, data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            pageSize = parseInt(msg.pageSize);
                            pageNum = parseInt(msg.pageNum);
                            _context.next = 5;
                            return File.count();

                        case 5:
                            count = _context.sent;
                            _context.next = 8;
                            return File.find({}).sort('-create_date').skip(pageSize * (pageNum - 1)).limit(pageSize);

                        case 8:
                            files = _context.sent;


                            for (index in files) {
                                files[index].path = msg.host + files[index].path;
                            }

                            data = {
                                pageSize: pageSize,
                                pageNum: pageNum,
                                size: count,
                                list: files
                            };

                            respond(null, data);
                            _context.next = 17;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](0);

                            respond(_context.t0, null);

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 14]]);
        }));

        function list(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return list;
    }()

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
    );

    this.add('role:file,cmd:remove', function remove(msg, respond) {
        File.remove({ _id: { $in: JSON.parse(msg.ids) } }, respond);
        /*        fileSeneca.remove$({id: msg.id}, function (err, entity) {
                    if (!entity) {
                        err = new Error('Not Found');
                        err.status = 404;
                    }
                    respond(err, entity);
                });*/
    });

    this.add('role:file,cmd:query', function (msg, respond) {
        File.findById(msg.id, function (err, entity) {
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
};
//# sourceMappingURL=file_plugin.js.map