var AcFun = require("../api/acfun_api");
var Feed = require("../../../models/feed");
var mongoose = require('mongoose');
var config = require('../../../config');
var async = require('async');
var FeedTask = require("../../../models/feed_task");
var FeedType = require('../constant/feed_type');
var FeedSource = require('../constant/feed_source');
var schedule = require('node-schedule');
var schedules = [];
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
            const feedTasks = await FeedTask.find({});
            createScheduleJobs(feedTasks);
            respond(null);
        } catch (err) {
            respond(err);
        }
    });
};

function initSpider(callback) {
    var raw_menus = menu_data;
    async.waterfall([
            function (cb) {//链接数据库
                mongoose.Promise = global.Promise;
                mongoose.connect(config.mongodb.connectionString, opts, function (err) {
                    cb(err);
                });
            },
            function (cb) {//查询所有菜单
                Menu.find()
                    .exec(cb);
            },
            function (menus, cb) {//将数据库中的数据和给定数据进行对比
                if (menus.length !== 0) {
                    for (i in raw_menus) {
                        for (m in menus) {
                            if (raw_menus[i].id === menus[m].id) {
                                raw_menus[i]._id = menus[m]._id;
                                raw_menus[i].update_date = menus[m].update_date;
                                raw_menus[i].status_record = menus[m].status_record;
                                raw_menus[i].start_up = menus[m].start_up;
                                raw_menus[i].uuid = menus[m].uuid;
                                if (menus[m].update_interval)
                                    raw_menus[i].update_interval = menus[m].update_interval;
                                if (menus[m].parent_id)
                                    raw_menus[i].parent_id = menus[m].parent_id;
                                break;
                            }
                        }
                        for (j in raw_menus[i].children) {
                            for (m in menus) {
                                if (raw_menus[i].children[j].id === menus[m].id) {
                                    raw_menus[i].children[j]._id = menus[m]._id;
                                    raw_menus[i].children[j].update_date = menus[m].update_date;
                                    raw_menus[i].children[j].status_record = menus[m].status_record;
                                    raw_menus[i].children[j].start_up = menus[m].start_up;
                                    raw_menus[i].children[j].uuid = menus[m].uuid;
                                    if (menus[m].update_interval)
                                        raw_menus[i].children[j].update_interval = menus[m].update_interval;
                                    if (menus[m].parent_id)
                                        raw_menus[i].children[j].parent_id = menus[m].parent_id;
                                    break;
                                }
                            }
                        }
                    }
                }
                cb(null);
            },
            function (cb) {//删除所有菜单
                Menu.remove(function (err) {
                    cb(err);
                });
            },
            function (cb) {//创建父菜单
                Menu.create(raw_menus, cb)
            },
            function (data, cb) {//创建子菜单
                var temp = [];
                for (index in data) {
                    for (arrIndex in raw_menus[index].children) {
                        raw_menus[index].children[arrIndex].parent_id = data[index]._id;
                    }
                    temp = temp.concat(raw_menus[index].children);
                }
                Menu.create(temp, cb);
            }
        ],
        function (err, res) {
            callback(err);
        }
    )
    ;
}

function createScheduleJobs(menus) {
    for (index in menus) {
        var j = null;
        var menu = menus[index];
        switch (menu.id) {
            case 101://AcFun香蕉榜
                j = schedule.scheduleJob(menu.update_interval, function (temp) {
                    scheduleJobStart(temp);
                    temp.uuid = UUID();
                    startBananaVideoJob(temp);
                }
                    .bind(null, menu));
                break;
            case 102://AcFun活动
                j = schedule.scheduleJob(menu.update_interval, function (temp) {
                    scheduleJobStart(temp);
                    temp.uuid = UUID();
                    AcFun.getArticlesByUser(temp, "499083", 1, 5, saveMediaCallback)
                }
                    .bind(null, menu));
                break;
            case 103://AcFun专题
                j = schedule.scheduleJob(menu.update_interval, function (temp) {
                    scheduleJobStart(temp);
                    temp.uuid = UUID();
                    AcFun.getArticlesByUser(temp, "335261", 1, 5, saveMediaCallback)
                }
                    .bind(null, menu));
                break;
        }
        schedules.push(j);
    }
}

async function startBananaVideoJob(menu) {
    // AcFun.getVideoListByBanana(temp, saveMediaCallback)
    const videos = await  AcFun.getVideoListByBanana(menu);
    for (i in videos) {
        var video = videos[i];
        var tempVideo = await Feed.findOne({contentId: video.href, source: FeedSource.acfun});
        var videoInfo = await AcFun.getVideoInfo(video.contentId);
        console.log("111");
        //todo 组装数据
    }

}

//保存media
function saveMediaCallback(err, medias, menu) {
    if (err) {
        console.error(err);
        return;
    }
    async.waterfall([
        function (callback) {//保存数据
            var i = 0;
            async.whilst(
                function () {
                    return i < medias.length;
                },
                function (cb) {
                    i++;
                    async.waterfall([
                        function (cb) {//查询数据是否存在
                            Feed.find({
                                contentId: medias[i - 1].contentId,
                                source: medias[i - 1].source,
                                type: medias[i - 1].type
                            })
                                .exec(cb);
                        },
                        function (data, cb) {
                            if (data.length === 0) {//删除数据
                                Feed.create(medias[i - 1], cb);
                            } else { //更新数据
                                Feed.update({
                                        contentId: medias[i - 1].contentId,
                                        source: medias[i - 1].source,
                                        type: medias[i - 1].type
                                    },
                                    medias[i - 1], cb);
                            }
                        }
                    ], cb);
                }, callback
            );
        },
        /*        function (data, cb) {//更新子菜单
                    Menu.findByIdAndUpdate(menu._id, {update_date: Date.now(), uuid: menu.uuid}, cb);
                },
                function (data, cb) {//查找主菜单
                    Menu.findById(menu.parent_id, cb);
                },
                function (data, cb) {//更新主菜单
                    if (data == null) {
                        cb(null, null);
                    } else {
                        Menu.findByIdAndUpdate(data._id, {update_date: Date.now(), uuid: menu.uuid}, cb);
                    }
                }*/
    ], function (err, res) {
        scheduleJobEnd(err, menu);
    });
}

function scheduleJobStart(menu) {
    logger.info("[req] " + menu.id + " - " + menu.title);
}

function scheduleJobEnd(err, menu) {
    if (err) {
        logger.error(err);
    } else {
        logger.info("[res] " + menu.id + " - " + menu.title);
    }
}