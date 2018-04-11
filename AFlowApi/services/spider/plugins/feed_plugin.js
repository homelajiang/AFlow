var AcFun = require("../api/acfun_api");
var Feed = require("../../../models/feed");
var mongoose = require('mongoose');
var config = require('../../../config');
var async = require('async');
var SpiderTask = require("../../../models/spider_task");
var FeedType = require('../constant/feed_type');
var FeedSource = require('../constant/feed_source');
var schedule = require('node-schedule');
var scheduleJobs = {};
var UUID = require('uuid/v1');
const log4js = require('log4js');
log4js.configure({
    appenders: {
        spider: {
            type: 'dateFile',
            filename: 'logs/access',
            pattern: "_yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            maxLogSize: 1024 * 1024,
            backups: 3
        },
        console: {
            type: "console"
        }
    },
    categories: {default: {appenders: ['spider', 'console'], level: 'INFO'}}
});
var logger = log4js.getLogger("Spider");
logger.level = 'INFO';

var opts = {
    useMongoClient: true
};

module.exports = function feed(options) {
    //开始抓取
    this.add('role:feed,cmd:start', async function (msg, respond) {
        try {
            const feedTasks = await SpiderTask.find({});
            initScheduleJobs(feedTasks);
            respond(null);
        } catch (err) {
            respond(err);
        }
    });
    //开启/关闭task
    this.add('role:feed,cmd:update', async function (msg, respond) {
        try {
            await SpiderTask.where({_id: msg.taskId})
                .update({start_up: msg.start_up});
            const task = await SpiderTask.findOne({_id: msg.taskId});
            updateScheduleJob(task);
            respond(task);
        } catch (err) {
            respond(err);
        }
    });
    //获取所有task信息
    this.add('role:feed,cmd:list', async function (msg, respond) {
        try {
            const tasks = await  SpiderTask.find({});
            respond(tasks);
        } catch (err) {
            respond(err);
        }
    });
};

//check all schedule status
function initScheduleJobs(tasks) {
    for (index in tasks) {
        updateScheduleJob(tasks[index])
    }
}

//update schedule status
function updateScheduleJob(task) {
    var job = scheduleJobs[task.id];
    if (!task.start_up) {//状态为停止
        if (job)
            job.cancel();
        scheduleJobs[task.id] = null;
    } else {//状态为启动
        if (!job)
            scheduleJobs[task.id] = getScheduleJob(task);
    }
}

function getScheduleJob(task) {
    switch (task.id) {
        case 101://AcFun香蕉榜
            var j = schedule.scheduleJob(task.update_interval, function (temp) {
                temp.uuid = UUID();
                startBananaVideoJob(temp);
            }
                .bind(null, task));
            return j;
        case 102://AcFun活动
            return schedule.scheduleJob(task.update_interval, function (temp) {
                temp.uuid = UUID();
                startArticlesJob(temp, "499083");
            }
                .bind(null, task));
        case 103://AcFun专题
            return schedule.scheduleJob(task.update_interval, function (temp) {
                temp.uuid = UUID();
                startArticlesJob(temp, "335261");
            }
                .bind(null, task));
        default:
            scheduleJobLog(task, "the schedule of " + task.id + " not found.");
            return null;
    }
}

async function startBananaVideoJob(task) {
    try {
        task = await SpiderTask.findOne({_id: task._id});
        const videos = await  AcFun.getVideoListByBanana();
        for (i in videos) {
            var video = videos[i];
            var videoInfo = await AcFun.getVideoInfo(video.contentId);
            var vv = handleFeed(videoInfo);
            vv.type = FeedType.video;
            vv.source = FeedSource.acfun;
            vv.channel = 0;
            vv.attachment = [];
            for (index in videoInfo.videos) {
                var t = {
                    source: videoInfo.videos[index].videoId,
                    description: videoInfo.videos[index].title,
                    danmakuId: videoInfo.videos[index].danmakuId
                };
                vv.attachment.push(t);
            }

            await Feed.where({contentId: vv.contentId, source: vv.source})
                .setOptions({upsert: true})
                .update(vv);
        }
        scheduleJobLog(task);
        task.status_record.push(true);
    } catch (e) {
        scheduleJobLog(task, e);
        task.status_record.push(false);
    } finally {
        task.update_date = Date.now();
        if (task.status_record.length > 5)
            task.status_record = task.status_record.slice(-5);
        console.log(task.status_record.toString());
        await SpiderTask.findOne({_id: task._id})
            .update(task);
    }
}

async function startArticlesJob(task, userId) {
    try {
        task = await SpiderTask.findOne({_id: task._id});
        const articles = await AcFun.getArticlesByUser(userId, 1, 5);
        for (i in articles) {
            var article = articles[i];
            var articleInfo = await AcFun.getArticleInfo(article.id);
            var vv = handleFeed(articleInfo);
            vv.type = FeedType.rich_text;
            vv.source = FeedSource.acfun;
            vv.channel = 1;
            vv.attachment = [{
                description: articleInfo.article.content,
                danmakuId: null,
                source: null
            }];
            await Feed.where({contentId: vv.contentId, source: vv.source})
                .setOptions({upsert: true})
                .update(vv);
        }
        scheduleJobLog(task);
        task.status_record.push(true);
    } catch (e) {
        scheduleJobLog(task, e);
        task.status_record.push(false);
    } finally {
        task.update_date = Date.now();
        if (task.status_record.length > 5)
            task.status_record = task.status_record.slice(-5);
        await SpiderTask.findOne({_id: task.id})
            .update(task);
    }
}

function handleFeed(info) {
    return {
        contentId: info.contentId,
        title: info.title,
        description: info.description,
        cover: info.cover,
        releaseDate: info.releaseDate,
        visit: {
            views: info.visit.views,
            comments: info.visit.comments,
            score: info.visit.goldBanana,
            danmakuSize: info.danmakuSize ? info.danmakuSize : 0
        },
        owner: {
            id: info.owner.id,
            name: info.owner.name,
            avatar: info.owner.avatar
        }
    };
}

function scheduleJobLog(task, err) {
    if (err) {
        logger.error("[error]" + task.id + " - " + task.title + " " + err);
    } else {
        logger.info("[task] " + task.id + " - " + task.title);
    }
}