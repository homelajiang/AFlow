const Auth = require('../../../models/auth');
const Profile = require('../../../models/profile');
const Boom = require('boom');


module.exports = function profile(options) {
    this.add('role:profile,cmd:query', async (msg, respond) => {
        try {
            var profile = await Profile.findOne({_id: msg.id});
            if (!profile)
                throw Boom.notFound("用户不存在");
            respond(null, profile.model);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("获取用户信息失败");
            respond(e, null);
        }
    });

    this.add('role:profile,cmd:update', async (msg, respond) => {

    });

};