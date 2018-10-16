const Tag = require('../../../models/tag');
const Util = require('../util');

module.exports = function (options) {

    //添加tag
    this.add('role:tag,cmd:add', async function (args, respond) {
        try {
            const tag = args.tag;
            const t = await Tag.findOne({name: tag.name});
            if (t) {
                respond(new Error("标签已存在"));
                return;
            }
            new Tag(tag)
                .save(respond);
        } catch (e) {
            respond(e);
        }
    });

    //删除tag
    this.add('role:tag,cmd:remove', function (args, respond) {
        Tag.findOneAndDelete({_id: args.id}, respond);
    });

    //修改tag
    this.add('role:tag,cmd:update', function (args, respond) {//修改不检查重复
        Tag.updateOne({_id: args.id}, args.tag, respond);
    });

    //查询tag
    this.add('role:tag,cmd:query', function (args, respond) {
        Tag.findById(args.id, respond);
    });

    this.add('role:tag,cmd:list', async function (args, respond) {
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
            respond(e);
        }
    });

    return 'tag';
};

