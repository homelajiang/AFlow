const Auth = require('../../../models/auth');
const Profile = require('../../../models/profile');

module.exports = function profile(options) {
    this.add('role:profile,cmd:query', async (msg, respond) => {
        try {
            respond(null, await Profile.findOne({_id: msg.id}));
        } catch (e) {
            respond(e, null);
        }
    });

    //sign up
    this.add('role:profile,cmd:update', async (msg, respond) => {

    });

};