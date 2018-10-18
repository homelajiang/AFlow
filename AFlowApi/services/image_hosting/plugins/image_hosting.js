const File = require('../../../models/file');
const Boom = require('boom');
const Util = require('../../util');
/*
var seneca = require('seneca')();
seneca
    .use("basic")
    .use("entity");*/

module.exports = function (options) {
    this.add('role:file,cmd:add', async (args, respond) => {
        try {
            const file = await new File({
                name: args.name,
                path: args.path,
                mimetype: args.mimetype
            }).save();
            respond(null, file);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("上传文件失败");
            respond(e)
        }
    });

    this.add('role:file,cmd:list', async (args, respond) => {
        try {
            const pageSize = parseInt(args.pageSize);
            const pageNum = parseInt(args.pageNum);
            const count = await File.countDocuments();
            const files = await File.find()
                .sort('-create_date')
                .skip(pageSize * (pageNum - 1))
                .limit(pageSize);

            for (const index in files) {
                files[index].path = args.host + files[index].path;
            }
            respond(null, Util.generatePageModel(pageSize, pageNum, count, files));
        } catch (err) {
            respond(err);
        }
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

    return 'image_hosting';
};

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
