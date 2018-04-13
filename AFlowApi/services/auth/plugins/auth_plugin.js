const Auth = require('../../../models/auth');
const Profile = require('../../../models/profile');
const JWT = require('jsonwebtoken');  // used to sign our content
const jwtSecret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!

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
                throw new Error("账户和密码不匹配");
            var profile = await Profile.findOne({_id: auth.profile});
            var token = JWT.sign({id: profile._id, username: msg.username}, jwtSecret);
            respond(null, {token: token, profile: profile});
        } catch (e) {
            respond(e, null);
        }
    });

    //sign up
    this.add('role:auth,cmd:signUp', async (msg, respond) => {
        try { //username exist?
            var usernameAuth = await Auth.findOne({username: msg.username});
            if (usernameAuth)
                throw new Error("用户名已存在");
            //email exist?
            var emailAuth = await Auth.findOne({email: msg.email});
            if (emailAuth)
                throw new Error("该邮箱已被注册");

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
            var token = JWT.sign({id: profile._id, username: msg.username}, jwtSecret);
            //back
            respond(null, {token: token, profile: profile});
        } catch (e) {
            respond(e, null);
        }
    });

};