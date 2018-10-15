const Tag = require('../../../models/tag');
const Util = require('../util');

module.exports = function (options) {

    //添加tag
    this.add('role:tag,cmd:add', async function (args, respond) {
        const temp = JSON.parse(args.tag);
        const t = await Tag.findOne({name: temp.name});
        if (t) {
            respond("分类名已存在");
            return;
        }
        new Tag(temp)
            .save(respond);
    });

    //删除tag
    this.add('role:tag,cmd:remove', async function (args, respond) {
        Tag.findByIdAndRemove(args.id, respond);
    });

    //修改tag
    this.add('role:tag,cmd:update', async function (args, respond) {//修改不检查重复
        const tag = {};
        if (args.name)
            tag.name = args.name;
        if (args.alias)
            tag.alias = args.alias;
        if (args.image)
            tag.image = args.image;
        if (args.description)
            tag.description = args.description;

        Tag.findByIdAndUpdate(args.id, tag, respond);
    });

    //查询tag
    this.add('role:tag,cmd:query', async function (args, respond) {
        Tag.findById(args.id, respond);
    });

    this.add('role:tag,cmd:list', async function (args, respond) {
        try {
            const pageSize = parseInt(args.pageSize);
            const pageNum = parseInt(args.pageNum);
            const count = await Tag.count();
            const tags = await Tag.find()
                .populate('categories')
                .populate('create')
                .populate('tags')
                .skip((pageNum - 1) * pageSize)
                .limit(pageSize)
                .sort({create_date: -1});
            respond(null, Util.generatePageModel(pageSize, pageNum, count, tags));
        } catch (e) {
            respond(e);
        }
    });

    return 'tag';
};

