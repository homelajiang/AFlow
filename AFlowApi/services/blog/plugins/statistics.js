import moment from "moment";

const Statistics = require('../../../models/statistics');
const Util = require('../../util');
const Boom = require('boom');

module.exports = function (options) {
    //添加数量
    this.add('role:statistics,cmd:add', async (args, respond) => {
        const date = moment().format('yyyy-MM-dd');

        if (args.type === 'post' && args.id) {

        } else if (args.type === 'comment' && args.id) {

        }
    });

    //获取数量(view post count)
    this.add('role:statistics,cmd:statistics', async (args, respond) => {

    });

    //获取排序
    this.add('role:statistics,cmd:rank', async (args, respond) => {

    });

    return 'statistics';
};
