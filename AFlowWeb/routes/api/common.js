var express = require('express');
var router = express.Router();
var request = require('request');
var Auth = require('../../models/oath');
var user = require('../../handlers/user.js');
var weather = require('../../handlers/weather');
var doc = require('../../handlers/doc');
var multer = require('multer');

var Error = require('../../lib/error');
var helper = require('../../lib/helpers');
var videocd = require('videocd');


//获取天气实况
//https://api.seniverse.com/v3/weather/now.json?key=xkfhdmuybtisb2ru&location=beijing&language=zh-Hans&unit=c
router.get('/weather/now.json', function (req, res, next) {
    options.url = "https://api_v1.seniverse.com/v3/weather/now.json?key=xkfhdmuybtisb2ru"
        + "&location=" + req.query.location + "&language=" + req.query.language + "&unit=" + req.query.unit;
    request(options, function (err, result, body) {
        if (err) {
            res.status(500).json();
            return;
        }
        var weather;
        if (result.statusCode === 200) {
            weather = JSON.parse(body.toString()).results[0];
        } else {
            weather = JSON.parse(body.toString());
        }
        res.status(result.statusCode).json(weather);
    })
});