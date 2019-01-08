const Util = require('../../util');
const Boom = require('boom');
const ViewRecord = require('../../../models/view_record');
const StatisticsComment = require('../../../models/statistics_comment');
const StatisticsPost = require('../../../models/statistics_post');
const StatisticsView = require('../../../models/statistics_view');
const Post = require('../../../models/post');
const moment = require('moment');

module.exports = function (options) {

    this.add('role:statistics,cmd:all', async (args, respond) => {//异步
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
    this.add('role:statistics,cmd:all', async (args, respond) => {

        const result = {
            blog: {
                statistics: []
            },
            view: {
                statistics: []
            },
            comment: {
                statistics: []
            },
            storage: {
                used: 70,
                total: 100
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
            });

            if (i === 0) {
                result.blog.current = res.length;
            } else {
                const key = moment(weekRange[0]).format("YYYYMMDD") + "-" + moment(weekRange[1]).format("YYYYMMDD");
                const d = {};
                d[key] = res.length;
                result.blog.statistics.unshift(d);
            }
        }

        //最近10天访问量
        for (let i = 0; i > -11; i--) {
            const dateString = moment(new Date(nowDate.getTime() + i * 24 * 3600 * 1000)).format('YYYYMMDD');
            const res = await StatisticsView.find({date: dateString});
            if (i === 0) {
                result.view.current = res.length;
            } else {
                const d = {};
                d[dateString] = res.length;
                result.view.statistics.unshift(d);
            }
        }

        //最近10天评论量
        for (let i = 0; i > -11; i--) {
            const dateString = moment(new Date(nowDate.getTime() + i * 24 * 3600 * 1000)).format('YYYYMMDD');
            const res = await StatisticsComment.find({date: dateString});
            if (i === 0) {
                result.comment.current = res.length;
            } else {
                const d = {};
                d[dateString] = res.length;
                result.comment.statistics.unshift(d);
            }
        }

        //获取总数量
        result.blog.count = await Post.find().countDocuments();//只查询count字段

        const views = await StatisticsView.find({}, 'count');
        let viewCount = 0;
        views.forEach((value) => {
            viewCount += value.count;
        });
        result.view.count = viewCount;

        const comments = await StatisticsComment.find({}, 'count');
        let commentCount = 0;
        comments.forEach((value) => {
            commentCount += value.count;
        });
        result.comment.count = commentCount;

        respond(result);
    });

    //获取文章总浏览数
    this.add('role:statistics,cmd:views', async (args, respond) => {
        const views = await StatisticsPost.find({
            post: args.id,
            count: {$gt: 0}
        }, 'count');

        let viewCount = 0;
        views.forEach((view) => {
            viewCount += view.count;
        });
        respond(viewCount);
    });

    //获取文章（评论数）排行  当前 近3天 近一周 近一个月 所有
    this.add('role:statistics,cmd:sort,by:comment', async (args, respond) => {

    });

    //获取文章（浏览数）排行
    this.add('role:statistics,cmd:sort,by:view', async (args, respond) => {

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
