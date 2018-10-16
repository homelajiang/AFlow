const Categories = require('../../../models/categories');
const Util = require('../util');

module.exports = function (options) {

    //添加categories
    this.add('role:categories,cmd:add', async function (args, respond) {
        try {
            const categories = args.categories;
            const t = await Categories.findOne({name: categories.name});
            if (t) {
                respond(new Error("该分类已存在"));
                return;
            }
            new Categories(categories)
                .save(respond);
        } catch (e) {
            respond(e);
        }
    });

    //删除categories
    this.add('role:categories,cmd:remove', function (args, respond) {
        Categories.findOneAndDelete({_id: args.id}, respond);
    });

    //修改categories
    this.add('role:categories,cmd:update', function (args, respond) {//修改不检查重复
        Categories.updateOne({_id: args.id}, args.categories, respond);
    });

    //查询categories
    this.add('role:categories,cmd:query', function (args, respond) {
        Categories.findById(args.id, respond);
    });

    this.add('role:categories,cmd:list', async function (args, respond) {
        try {
            const pageSize = parseInt(args.pageSize);
            const pageNum = parseInt(args.pageNum);

            let categories;
            let count;

            if (args.key) {
                count = await Categories.find().or([
                    {name: {$regex: new RegExp(args.key, 'i')}},
                    {alias: {$regex: new RegExp(args.key, 'i')}},
                    {description: {$regex: new RegExp(args.key, 'i')}}
                ])
                    .countDocuments();
                categories = await Categories.find().or([
                    {name: {$regex: new RegExp(args.key, 'i')}},
                    {alias: {$regex: new RegExp(args.key, 'i')}},
                    {description: {$regex: new RegExp(args.key, 'i')}}
                ])
                    .skip((pageNum - 1) * pageSize)
                    .limit(pageSize)
                    .sort({create_date: -1});
            } else {
                count = await Categories.countDocuments();
                categories = await Categories.find()
                    .skip((pageNum - 1) * pageSize)
                    .limit(pageSize)
                    .sort({create_date: -1});
            }
            respond(null, Util.generatePageModel(pageSize, pageNum, count, categories));
        } catch (e) {
            respond(e);
        }
    });

    return 'categories';
};

