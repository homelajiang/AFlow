const Auth = require('../../../models/auth');
const Profile = require('../../../models/profile');
const Boom = require('boom');

module.exports = function auth(options) {

    //登陆 (just support username)
    this.add('role:auth,cmd:query', async (args, respond) => {
        try {
            //check username
            //todo 编码密码
            const auth = await Auth.findOne({
                username: args.username,
                password: args.password
            })
                .populate('profile');

            if (!auth)
                throw Boom.unauthorized("账户和密码不匹配");

            if (auth.status === -1)
                throw Boom.unauthorized("账号被冻结");

            respond(null, auth);

        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("登录失败,请重试");
            respond(e);
        }
    });

    //sign up
    this.add('role:auth,cmd:add', async (args, respond) => {
        try {
            //username exist?
            const usernameAuth = await Auth.findOne({username: args.username});

            if (usernameAuth)
                throw Boom.badRequest("用户名已存在");

            //insert
            const profile = await new Profile({
                username: args.username
            }).save();

            let auth = await new Auth({
                username: args.username,
                password: args.password,
                profile: profile._id
            }).save();

            auth = await Auth.findOne({_id: auth._id})
                .populate('profile');

            //back
            respond(null, auth);
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("注册失败,请重试");
            respond(e);
        }
    });

    return "auth";

};
