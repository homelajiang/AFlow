const Categories = require('../../../models/categories');
const Util = require('../../util');
const Boom = require('boom');


module.exports = function (options) {

    //添加categories
    this.add('role:categories,cmd:add', async (args, respond) => {
        try {
            const categories = args.categories;
            if (await Categories.findOne({name: categories.name}))
                throw Boom.badRequest("该分类已存在");

            respond(null, await new Categories(categories).save());
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("保存失败");
            respond(e);
        }
    });

    //删除categories
    this.add('role:categories,cmd:remove', async (args, respond) => {
        try {
            await Categories.findOneAndDelete({_id: args.id});
            respond(null);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("删除失败");
            respond(e);
        }
    });

    //修改categories
    this.add('role:categories,cmd:update', async (args, respond) => {//修改不检查重复
        try {
            await Categories.updateOne({_id: args.id}, Categories.getUpdateModel(args.categories));
            const categories = Categories.findOne({_id: args.id});
            respond(null, categories);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("修改失败");
            respond(e);
        }
    });

    //查询categories
    this.add('role:categories,cmd:query', async (args, respond) => {
        try {
            const categories = await Categories.findById(args.id);
            if (categories) {
                respond(null, categories);
            } else {
                respond(Boom.notFound("分类不存在"));
            }
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("查询失败");
            respond(e);
        }
    });

    this.add('role:categories,cmd:list', async (args, respond) => {
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

