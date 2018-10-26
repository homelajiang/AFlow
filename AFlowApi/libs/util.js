const JWT = require('jsonwebtoken');  // used to sign our content
const jwtSecret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!
const Boom = require('boom');
const moment = require('moment');
const default_format = "YYYY-MM-DD HH:mm:ss";
const path_format = "YYYYMMDD";

module.exports = {
    //生成token
    generateJWT: function (id, username, role) {
        return JWT.sign({
            id: id,
            username: username,
            role: role
        }, jwtSecret);
    },
    generateBoom: function (res) {
        return Boom.boomify(new Error(res.message), {statusCode: res.code});
    },
    ifErrorBoom: function (res, code, h) {
        if (code) {
            if (res.error)
                return this.generateBoom(res);
            return h.response("").code(204);
        } else {
            if (res.error)
                return this.generateBoom(res);
            return res;
        }
    },
    errorToBoom: function (err) {
        if (!Boom.isBoom(err))
            return Boom.badRequest();
        return err;
    },
    defaultFormat: (date) => {
        return moment(date).format(default_format);
    },
    datetimePathFormat: (date) => {
        return moment(date).format(path_format);
    }
};
