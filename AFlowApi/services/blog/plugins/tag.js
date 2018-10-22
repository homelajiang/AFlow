const Tag = require('../../../models/tag');
const Util = require('../../util');
const Boom = require('boom');


module.exports = function (options) {

    //添加tag
    this.add('role:tag,cmd:add', async (args, respond) => {
        try {
            const tag = args.tag;
            if (await Tag.findOne({name: tag.name}))
                throw Boom.badRequest("标签已存在");

            respond(null, await new Tag(tag).save());
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("保存失败");
            respond(e);
        }
    });

    //删除tag
    this.add('role:tag,cmd:remove', async (args, respond) => {
        try {
            await Tag.findOneAndDelete({_id: args.id});
            respond(null);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("删除失败");
            respond(e);
        }
    });

    //修改tag
    this.add('role:tag,cmd:update', async (args, respond) => {//name 不允许修改
        try {
            await Tag.updateOne({_id: args.id}, Tag.getUpdateModel(args.tag));
            const tag = await Tag.findOne({_id: args.id});
            respond(null, tag);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("修改失败");
            respond(e);
        }
    });

    //查询tag
    this.add('role:tag,cmd:query', async (args, respond) => {
        try {
            const tag = await Tag.findById(args.id);
            if (tag) {
                respond(null, tag);
            } else {
                respond(Boom.notFound("tag不存在"));
            }
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("查询失败");
            respond(e);
        }
    });

    this.add('role:tag,cmd:list', async (args, respond) => {
        try {
            const pageSize = parseInt(args.pageSize);
            const pageNum = parseInt(args.pageNum);

            let tags;
            let count;

            if (args.key) {
                count = await Tag.find()
                    .or([
                        {name: {$regex: new RegExp(args.key, 'i')}},
                        {alias: {$regex: new RegExp(args.key, 'i')}},
                        {description: {$regex: new RegExp(args.key, 'i')}}
                    ])
                    .countDocuments();
                tags = await Tag.find().or([
                    {name: {$regex: new RegExp(args.key, 'i')}},
                    {alias: {$regex: new RegExp(args.key, 'i')}},
                    {description: {$regex: new RegExp(args.key, 'i')}}
                ])
                    .skip((pageNum - 1) * pageSize)
                    .limit(pageSize)
                    .sort({create_date: -1});
            } else {
                count = await Tag.countDocuments();
                tags = await Tag.find()
                    .skip((pageNum - 1) * pageSize)
                    .limit(pageSize)
                    .sort({create_date: -1});
            }
            respond(null, Util.generatePageModel(pageSize, pageNum, count, tags));
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("查询失败");
            respond(e);
        }
    });

    return 'tag';
};

