const Comment = require('../../../models/comment');
const Util = require('../util');
const Post = require('../../../models/post');


module.exports = function (options) {

    //添加comment
    this.add('role:comment,cmd:add', async function (args, respond) {
        try {
            const temp = await Post.findOne({_id: args.id});

            if (!temp.open_comment)
                throw new Error('未开放评论');

            if (temp.need_review)
                args.comment.status = 1;//评论待审核

            args.comment.ref_id = args.id;

            new Comment(args.comment)
                .save(respond);
        } catch (e) {
            respond(e);
        }

    });

    //查询comment
    this.add('role:comment,cmd:query', async function (args, respond) {
        Comment.findById(args.id, respond);
    });

    this.add('role:comment,cmd:list', async function (args, respond) {
        try {
            const pageSize = parseInt(args.pageSize);
            const pageNum = parseInt(args.pageNum);

            const count = await Comment.find({ref_id: args.id})
                .countDocuments();
            const comment = await Comment.find({ref_id: args.id})
                .skip((pageNum - 1) * pageSize)
                .limit(pageSize)
                .sort({create_date: -1});

            respond(null, Util.generatePageModel(pageSize, pageNum, count, comment));
        } catch (e) {
            respond(e);
        }
    });

    //删除comment
    this.add('role:comment,cmd:remove', async function (args, respond) {
        Comment.findOneAndDelete({_id: args.id}, respond);
    });

    //修改comment
    this.add('role:comment,cmd:update', async function (args, respond) {//修改不检查重复
        const comment = args.comment;
        comment.modify_date = Date.now();

        Comment.updateOne({_id: args.id},comment,respond);
    });

    return 'comment';
};
