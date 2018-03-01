var Post = require('../models/post');
var async = require('async');
var config = require('../config');

module.exports = {
    //首页
    showIndex: function (req, res, next) {
        res.render('index', {title: 'Express', user: req.session.user, layout: null});
    },
    //登录界面
    showLogin: function (req, res, next) {
        res.render('login');
    },
    //api页面
    showApi: function (req, res, next) {
        res.render('api', {title: "API"});
    }
};