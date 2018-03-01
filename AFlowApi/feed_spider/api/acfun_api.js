var Media = require("../models/media");
var MediaType = require("../constant/media_type");
var options = {
    headers: {
        'cache-control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8;utf-8',
        'Accept-encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6'
    },
    encoding: null,
    gzip: true
};

var options_acfun = {
    headers: {
        "udid": '002b086b-a6e4-3d0c-a734-b916d6a0bf2f',
        'market': 'huawei',
        'appVersion': '4.7.1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
        'resolution': '1080x1920',
        'uuid': '43b7e987-d0f2-481a-aa20-8bcf70d37cba',
        'productId': 2000,
        'deviceType': 1,
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6'
    },
    gzip: true
};
var request = require('request');

var url_article = "http://www.acfun.cn/z/ac";
var url_video = "http://www.acfun.cn/v/ac";
var url_host = "http://www.acfun.cn";

module.exports = {
    //爬取acfun香蕉数最多的视频
    getVideoByBanana: function (menu, cb) {
        options_acfun.url = "http://apipc.app.acfun.cn/v2/ranks/1?range=86400000&page={num:1,size:10}";
        request(options_acfun, function (err, result, body) {
            if (err) {
                cb(err);
                return;
            }
            body = JSON.parse(body);
            if (body.errorid !== 0) {
                cb(err);
                return;
            }

            var datas = [];
            var vdataList = body.vdata.list;
            for (index in vdataList) {
                var media = {};
                media.type = MediaType.video;
                media.uuid = menu.uuid;
                media.contentId = vdataList[index].contentId;
                media.title = vdataList[index].title;
                media.description = vdataList[index].description;
                media.url = url_video + vdataList[index].contentId;
                media.image = [{
                    title: null,
                    description: null,
                    url: vdataList[index].image
                }];
                media.update_date = vdataList[index].releaseDate;
                media.visit = {
                    "comments": vdataList[index].visit.comments,
                    "score": vdataList[index].visit.goldBanana,
                    "danmaKuSize": vdataList[index].visit.danmakuSize,
                    "views": vdataList[index].visit.views
                };
                media.owner = {
                    "name": vdataList[index].owner.name,
                    "avatar": vdataList[index].owner.avatar,
                    "id": vdataList[index].owner.id
                };
                media.source = {
                    "name": "Acfun",
                    "url": url_host
                };
                datas.push(media);
            }
            cb(null, datas, menu);
        });
    },
    //获取用户发布的文章
    getArticleByUser: function (menu, userId, pageNo, pageSize, cb) {
        options_acfun.url = "http://apipc.app.acfun.cn/v2/user/content?userId=" + userId + "&type=1&sort=1&pageNo=" + pageNo + "&pageSize=" + pageSize;
        request(options_acfun, function (err, result, body) {
            if (err) {
                cb(err);
                return;
            }
            body = JSON.parse(body);
            if (body.errorid !== 0) {
                cb(err);
                return;
            }

            var datas = [];
            var vdataList = body.vdata.list;
            for (index in vdataList) {
                var media = {};
                media.type = MediaType.web;
                media.uuid = menu.uuid;
                media.contentId = vdataList[index].id;
                media.title = vdataList[index].title;
                media.description = vdataList[index].description;
                media.url = url_article + vdataList[index].id;
                media.image = [{
                    title: null,
                    description: null,
                    url: vdataList[index].cover
                }];
                media.update_date = vdataList[index].releaseDate;
                media.visit = {
                    "comments": vdataList[index].comments,
                    "score": 0,
                    "danmaKuSize": 0,
                    "views": vdataList[index].views
                };
                media.owner = {
                    "name": vdataList[index].user.username,
                    "avatar": vdataList[index].user.userImg,
                    "id": vdataList[index].user.id
                };
                media.source = {
                    "name": "Acfun",
                    "url": url_host
                };
                datas.push(media);
            }
            cb(null, datas, menu);
        })
    }
};
