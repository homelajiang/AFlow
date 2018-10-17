const Comment = require('../../../models/comment');
const Util = require('../util');
const Post = require('../../../models/post');
const Boom = require('boom');


module.exports = function (options) {

    //添加comment
    this.add('role:comment,cmd:add', async (args, respond) => {
        try {
            const temp = await Post.findOne({_id: args.id});

            if (!temp.open_comment)
                throw Boom.badRequest('未开放评论');

            const comment = Comment.getInsertModel(args.comment);

            comment.ref_id = args.id;

            if (temp.need_review)
                comment.status = 1;//评论待审核

            const res = await new Comment(comment).save();
            respond(null, res.model);

        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("评论失败");
            respond(e);
        }

    });

    //查询comment
    this.add('role:comment,cmd:query', async (args, respond) => {
        try {
            const comment = await Comment.findById(args.id);
            respond(null, comment.model);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("查询失败");
            respond(e);
        }
    });

    this.add('role:comment,cmd:list', async function (args, respond) {
        try {
            const pageSize = parseInt(args.pageSize);
            const pageNum = parseInt(args.pageNum);

            const count = await Comment.find({ref_id: args.id})
                .countDocuments();
            const comments = await Comment.find({ref_id: args.id})
                .skip((pageNum - 1) * pageSize)
                .limit(pageSize)
                .sort({create_date: -1});

            const temp = [];
            comments.forEach((comment) => {
                temp.push(comment.model);
            });

            respond(null, Util.generatePageModel(pageSize, pageNum, count, temp));
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("查询失败");
            respond(e);
        }
    });

    //删除comment
    this.add('role:comment,cmd:remove', async (args, respond) => {
        try {
            await Comment.findOneAndDelete({_id: args.id});
            respond(null);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("删除失败");
            respond(e);
        }
    });

    //修改comment
    this.add('role:comment,cmd:update', async (args, respond) => {//修改不检查重复
        try {
            await Comment.updateOne({_id: args.id}, Comment.getUpdateModel(args.comment));
            const comment = Comment.findOne({_id: args._id});
            respond(null, comment);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("修改失败");
            respond(e);
        }
    });

    return 'comment';
};
