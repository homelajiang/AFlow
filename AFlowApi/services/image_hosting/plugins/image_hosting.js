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
            const file = await new File(File.getInsertModel(args.file)).save();
            respond(null,file.model);
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

            let count;
            let files;

            if (args.key) {
                count = await File.find()
                    .or([
                        {name: {$regex: new RegExp(args.key, 'i')}},
                        {description: {$regex: new RegExp(args.key, 'i')}}
                    ])
                    .countDocuments();

                files = await File.find()
                    .or([
                        {name: {$regex: new RegExp(args.key, 'i')}},
                        {description: {$regex: new RegExp(args.key, 'i')}}
                    ])
                    .skip((pageNum - 1) * pageSize)
                    .limit(pageSize)
                    .sort({create_date: -1});
            } else {
                count = await File.find().countDocuments();
                files = await File.find()
                    .skip((pageNum - 1) * pageSize)
                    .limit(pageSize)
                    .sort({create_date: -1});
            }

            respond(null, Util.generatePageModel(pageSize, pageNum, count, files));
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("获取文件列表失败");
            respond(e)
        }
    });

    this.add('role:file,cmd:remove', async (args, respond) => {
        try {
            await File.findOneAndDelete({_id: args.id});
            respond(null)
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("删除失败");
            respond(e);
        }
    });

    //更新post
    this.add('role:file,cmd:update', async (args, respond) => {
        try {
            await File.updateOne({_id: args.id}, File.getUpdateModel(args.file));
            const file = await File.findOne({_id: args.id});
            respond(null, file);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("修改失败");
            respond(e);
        }
    });

    this.add('role:file,cmd:query', async (args, respond) => {
        try {
            const file = await File.findById(args.id);
            if (file) {
                respond(null, file);
            } else {
                respond(Boom.notFound("文件不存在"));
            }
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("查询文件失败");
            respond(e)
        }
    });

    return 'image_hosting';
};
