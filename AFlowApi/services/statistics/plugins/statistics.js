const Util = require('../../util');
const Boom = require('boom');
const ViewRecord = require('../../../models/view_log');

module.exports = function (options) {

    this.add('role:statistics,cmd:add', async (args, respond) => {//异步
        new ViewRecord(args.record).save();
        respond(null);//返回一个参数则为结果，两个参数第一个是错误信息
    });

    this.add('role:statistics,cmd:blog', async (args, respond) => {
        // 访问量 点击量
        respond(null);
    });

    return 'statistics';
};
