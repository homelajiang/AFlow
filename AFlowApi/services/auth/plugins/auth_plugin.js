const Auth = require('../../../models/auth');
const Profile = require('../../../models/profile');
const JWT = require('jsonwebtoken');  // used to sign our content
const jwtSecret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!
const Boom = require('boom');

module.exports = function auth(options) {
    //sign in (just support email and username)
    this.add('role:auth,cmd:signIn', async (msg, respond) => {
        try { //check username
            //check email
            var auth = await Auth.findOne({email: msg.username, password: msg.password});
            //check phone
            if (!auth)
                auth = await Auth.findOne({username: msg.username, password: msg.password});
            if (!auth)
                throw Boom.badRequest("账户和密码不匹配");
            var profile = await Profile.findOne({_id: auth.profile});
            var token = JWT.sign({id: profile._id, username: msg.username, role: profile.role}, jwtSecret);
            respond(null, {token: token, profile: profile.model});
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("登录失败,请重试");
            respond(e, null);
        }
    });

    //sign up
    this.add('role:auth,cmd:signUp', async (msg, respond) => {
        try { //username exist?
            var usernameAuth = await Auth.findOne({username: msg.username});
            if (usernameAuth)
                throw Boom.badRequest("用户名已存在");
            //email exist?
            var emailAuth = await Auth.findOne({email: msg.email});
            if (emailAuth)
                throw Boom.badRequest("该邮箱已被注册");

            //insert
            var profile = await new Profile({
                username: msg.username,
                email: msg.email
            }).save();

            await new Auth({
                username: msg.username,
                email: msg.email,
                password: msg.password,
                profile: profile._id
            }).save();

            //token
            var token = JWT.sign({id: profile._id, username: msg.username, role: profile.role}, jwtSecret);
            //back
            respond(null, {token: token, profile: profile.model});
        } catch (e) {
            if (!Boom.isBoom(e))
                e = Boom.badRequest("注册失败,请重试");
            respond(e, null);
        }
    });

};