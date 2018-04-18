var Feed = require("../../../models/feed");
const Boom = require('boom');


module.exports = function feed_plugin(options) {
//获取feed列表
    this.add('role:feed,cmd:list', async (msg, respond) => {
        try {
            var feeds = await Feed.find({channel: msg.channel})
                .limit(msg.size)
                .skip((msg.page - 1) * msg.size)
                .exec();
            var tm = [];
            for (index in feeds) {
                tm.push(feeds[index].list_model);
            }
            respond(null, tm);
        } catch (e) {
            respond(Boom.badRequest("数据查询失败"));
        }
    });

    //获取feed详情
    this.add('role:feed,cmd:info', async (msg, respond) => {
        try {
            var feed = await Feed.findOne({_id: msg.id});
            if (!feed)
                throw  Boom.notFound("该feed不存在");
            respond(null, feed.model);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("查询失败");
            respond(e);
        }
    });
};