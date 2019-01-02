const Util = require('../../util');
const Boom = require('boom');
const ViewRecord = require('../../../models/view_record');
const StatisticsComment = require('../../../models/statistics_comment');
const StatisticsPost = require('../../../models/statistics_post');
const StatisticsView = require('../../../models/statistics_view');
const Post = require('../../../models/post');
const moment = require('moment');

module.exports = function (options) {

    this.add('role:statistics,cmd:add', async (args, respond) => {//异步
        // 添加记录

        const dateString = moment().format("YYYYMMDD");

        if (args.type === 'post' && args.id) {
            await viewPost(dateString, args.id);
            await viewWebsite(dateString);
        } else if (args.type === 'comment' && args.id) {
            await viewComment(dateString, args.id);
            await viewWebsite(dateString);
        } else {
            await viewWebsite(dateString);
        }

        respond(null);//返回一个参数则为结果，两个参数第一个是错误信息
    });

    //获取统计结果
    this.add('role:statistics,cmd:statistics', async (args, respond) => {

        const result = {
            blog: {
                statistics: []
            },
            view: {
                statistics: []
            },
            comment: {
                statistics: []
            }
        };
        const nowDate = new Date();
        const nowDayOfWeek = nowDate.getDay();//本周第几天
        const nowDay = nowDate.getDate();//当前日
        const nowMonth = nowDate.getMonth();//当前月
        const nowYear = nowDate.getFullYear();//当前年


        //最近10周
        for (let i = 0; i > -11; i--) {
            const weekRange = Util.getWeekRange(nowYear, nowMonth, nowDay, nowDayOfWeek, i, false);
            const res = await Post.find({
                create_date: {$gte: weekRange[0], $lt: weekRange[1]}
            }).exec();

            if (i === 0) {
                result.blog.count = res.length;
            } else {
                const key = moment(weekRange[0]).format("YYYYMMDD") + "-" + moment(weekRange[1]).format("YYYYMMDD");
                const d = {};
                d[key] = res.length;
                result.blog.statistics.unshift(d);
            }
        }
        //获取总数量



        //最近10天访问量
        //最近10天评论量

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
