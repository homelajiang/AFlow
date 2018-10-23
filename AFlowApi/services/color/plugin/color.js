const Boom = require('Boom');
const Util = require('../../util');

module.exports = function (options) {

    const hexmap = {
        red: 'FF0000',
        green: '00FF00',
        blue: '0000FF',
        black: '000000'
    };

    this.add('role:color,to:hex', function (msg, reply) {
        const hex = hexmap[msg.color] || hexmap.black;
        reply(null, {hex: hex})
    });

    this.add('role:error,cmd:one', function (args, reply) {
        reply(null, {code: 404});
    });

    this.add('role:error,cmd:two', function (args, reply) {
        reply({code: 404, message: "未找到"});
    });

    this.add('role:error,cmd:three', function (args, reply) {
        reply("服务器异常")
    });

    this.add('role:error,cmd:four', function (args, reply) {
        reply(Boom.badRequest("哈哈"))
    });

    this.add('role:error,cmd:five', function (args, reply) {
        reply(Util.generateErr(404,"用户未找到"))
    });

    return "color";
};
