const Util = require('../../util');
const Boom = require('boom');
const StatisticsComment = require('../../../models/statistics_comment');
const StatisticsPost = require('../../../models/statistics_post');
const StatisticsView = require('../../../models/statistics_view');
const ViewRecord = require('../../../models/view_record');
const Post = require('../../../models/post');
const moment = require('moment');
const Comment = require('../../../models/comment');
const Statistics = require('../../../models/statistics');

const schedule = require('node-schedule');


module.exports = function (options) {

    this.add('role:statistics,cmd:add', async (args, respond) => {//异步
        // 添加记录
        ViewRecord.save(args.record);
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
            storage: { // todo 多媒体统计
                used: 70,
                total: 100,
                mediaCount: 4000
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

    //获取文章浏览数
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

    //获取文章（评论数）排行  今天 近3天 近7天 近30天 近一年 所有
    this.add('role:statistics,cmd:sort,by:comment', async (args, respond) => {
        let startDate;
        const nowDate = new Date();

        switch (args.date_range) {
            case 'day':
                startDate = moment(nowDate).format("YYYYMMDD");
                break;
            case 'three day':
                startDate = moment(new Date(nowDate.getTime() - 2 * 24 * 3600 * 1000)).format('YYYYMMDD');
                break;
            case 'week':
                startDate = moment(new Date(nowDate.getTime() - 6 * 24 * 3600 * 1000)).format('YYYYMMDD');
                break;
            case 'month':
                startDate = moment(new Date(nowDate.getTime() - 29 * 24 * 3600 * 1000)).format('YYYYMMDD');
                break;
            case 'year':
                startDate = moment(nowDate.setFullYear(nowDate.getFullYear() - 1)).format('YYYYMMDD');
                break;
        }

        let posts;
        if (startDate) {
            posts = await StatisticsComment.aggregate([
                {
                    $match: {
                        date: {$gte: startDate}
                    }
                },
                {
                    $group: {
                        _id: '$post',
                        post: {$first: '$post'},
                        commentCount: {$sum: '$count'}
                    }
                },
                // { //可对获取到的数据进行排序
                //     $match: {commentCount: {$gte: 2}}
                // },
                {
                    $sort: {
                        commentCount: -1
                    }
                },
                {
                    $limit: 5
                }
            ]);

            posts = await Post.populate(posts, {path: 'post'});

        } else {//查询所有的
            posts = await StatisticsPost.find()
                .populate('post')
                .sort({count: 1}).limit(5);

        }
        respond(posts);

    });

    //获取文章（浏览数）排行 今天 近3天 近7天 近30天 近一年 所有
    this.add('role:statistics,cmd:sort,by:view', async (args, respond) => {
        let startDate;
        const nowDate = new Date();

        switch (args.date_range) {
            case 'day':
                startDate = moment(nowDate).format("YYYYMMDD");
                break;
            case 'three day':
                startDate = moment(new Date(nowDate.getTime() - 2 * 24 * 3600 * 1000)).format('YYYYMMDD');
                break;
            case 'week':
                startDate = moment(new Date(nowDate.getTime() - 6 * 24 * 3600 * 1000)).format('YYYYMMDD');
                break;
            case 'month':
                startDate = moment(new Date(nowDate.getTime() - 29 * 24 * 3600 * 1000)).format('YYYYMMDD');
                break;
            case 'year':
                startDate = moment(nowDate.setFullYear(nowDate.getFullYear() - 1)).format('YYYYMMDD');
                break;
        }
        let posts;
        if (nowDate) {
            posts = await StatisticsPost.find({
                date: {$gte: startDate}
            })
                .populate('post')//todo tag categories
                .sort({count: 1}).limit(5);
        } else {//查询所有的
            posts = await StatisticsPost.find()
                .populate('post')
                .sort({count: 1}).limit(5);

        }
        respond(posts);
    });


    // 开启定时任务
    schedule.scheduleJob('0 2 * * *', async () => {
        console.log('归档访问记录');

        //统计过去的一天的数据
        let nowDate = new Date();
        nowDate.setHours(0);
        nowDate.setMinutes(0);
        nowDate.setSeconds(0);
        nowDate.setMilliseconds(0);

        let preDate = new Date(nowDate.getTime() - 24 * 3600 * 1000);

        const statistics = {};
        statistics['date'] = preDate;
        statistics['num'] = await ViewRecord.find({
            date: {$gte: preDate, $lt: nowDate}
        }).countDocuments();

        statistics['post'] = await ViewRecord.aggregate([
            {
                $match: {
                    date: {$gte: preDate, $lt: nowDate},
                    post: {$ne: null}
                }
            }, {
                $group: {
                    _id: '$post',
                    num: {$sum: 1}
                }
            }
        ]);

        statistics['comment'] = await Comment.aggregate([
            {
                $match: {
                    date: {$gte: preDate, $lt: nowDate}
                }
            }, {
                $group: {
                    _id: '$post',
                    num: {$sum: 1}
                }
            }
        ]);

        await new Statistics(statistics).save();
    });

    return 'statistics';
};
