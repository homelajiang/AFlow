const Auth = require('../../../models/auth');
const Profile = require('../../../models/profile');
const Boom = require('boom');


module.exports = function profile(options) {
    this.add('role:profile,cmd:query', async (args, respond) => {
        try {
            const profile = await Profile.findOne({_id: args.id});
            if (!profile)
                throw Boom.notFound("用户不存在");
            respond(null, profile);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("获取用户信息失败");
            respond(e, null);
        }
    });

    this.add('role:profile,cmd:update', async (args, respond) => {
        try {
            await Profile.updateOne({_id: args.id}, Profile.getUpdateModel(args.profile));
            const profile = await Profile.findOne({_id: args.id});

            if (!profile)
                throw Boom.notFound("用户不存在");
            respond(null, profile);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("获取用户信息失败");
            respond(e, null);
        }
    });

    return "profile";

};
