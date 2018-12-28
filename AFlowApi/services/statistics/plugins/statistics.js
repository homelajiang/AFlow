const Util = require('../../util');
const Boom = require('boom');
const ViewRecord = require('../../../models/view_record');
const StatisticsComment = require('../../../models/statistics_comment');
const StatisticsPost = require('../../../models/statistics_post');
const StatisticsView = require('../../../models/statistics_view');
const moment = require('moment');

module.exports = function (options) {

    this.add('role:statistics,cmd:add', async (args, respond) => {//异步
        // 添加记录

        const dateString = moment().format("YYYYMMDD");

        if (args.type === 'post' && args.id) {
            viewPost(dateString, args.id);
            viewWebsite(dateString);
        } else if (args.type === 'comment' && args.id) {
            viewComment(dateString, args.id);
            viewWebsite(dateString);
        } else {
            viewWebsite(dateString);
        }

        respond(null);//返回一个参数则为结果，两个参数第一个是错误信息
    });

    this.add('role:statistics,cmd:blog', async (args, respond) => {
        // 访问量 点击量
        respond(null);
    });

    return 'statistics';
};

async function viewWebsite(date) {
    const record = await StatisticsView.findOne({
        data: date
    });

    if (record) {
        record.count++;
        await StatisticsView.updateOne(record);
    } else {
        await StatisticsView.save({
            date: date,
            count: 1
        });
    }
}

async function viewPost(date, id) {
    const record = await StatisticsPost.findOne({
        data: date,
        post: id
    });

    if (record) {
        record.count++;
        await StatisticsPost.updateOne(record);
    } else {
        await StatisticsPost.save({
            date: date,
            post: id,
            count: 1
        });
    }
}

async function viewComment(date, id) {
    const record = await StatisticsComment.findOne({
        data: date,
        post: id
    });

    if (record) {
        record.count++;
        await StatisticsComment.updateOne(record);
    } else {
        await StatisticsComment.save({
            date: date,
            post: id,
            count: 1
        });
    }
}
