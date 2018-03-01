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

var options_ac = {
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

var Menu = require('../models/menu');
var Media = require('../models/feed');
var async = require('async');
module.exports = {
    //获取发现列表
    getDiscovery: function (req, res, next) {
        getMedia(1, 1, 20, function (err, result) {
            if (err) {
                res.status(502).json();
            } else {
                res.status(200).json(result);
            }
        })
    },
    //推荐菜单获取
    getRecommendMenu: function (req, res, next) {

    },
    //获取推荐活动
    getRecommendActivity: function (req, res, next) {
        getMedia(2, 1, 6, function (err, result) {
            if (err) {
                res.status(502).json();
            } else {
                res.status(200).json(result);
            }
        })
    },
    //获取推荐信息
    getRecommendFlow: function (req, res, next) {

    }
};

function getMedia(menuId, pageNo, pageSize, cb) {
    var mainMenu;
    async.waterfall([
        function (cb) {
            Menu.findOne({id: menuId}, cb);
        },
        function (menu, cb) {
            mainMenu = menu;
            Menu.find({parent_id: menu._id}, cb);
        },
        function (menus, cb) {
            var i = 0;
            var mediaArr = [];
            async.whilst(
                function () {
                    return i < menus.length
                },
                function (cb) {
                    i++;
                    Media.getMediasByUuid(menus[i - 1].uuid, pageNo, pageSize, function (err, medias) {
                        if (err) {
                            cb(err, null);
                            return;
                        }
                        mediaArr = mediaArr.concat(medias);
                        cb(null, null);
                    });
                },
                function (err, result) {
                    if (err) {
                        cb(err, null);
                    } else {
                        var temp = {
                            menu: mainMenu.model
                            , data: mediaArr
                        };
                        cb(null, temp);
                    }
                }
            );
        }
    ], function (err, result) {
        cb(err, result);
    });
}