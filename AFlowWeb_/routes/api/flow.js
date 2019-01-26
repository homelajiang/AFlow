var express = require('express');
var router = express.Router();
var Auth = require('../../models/oath');
var user = require('../../handlers/user.js');
var weather = require('../../handlers/weather');
var doc = require('../../handlers/doc');
var multer = require('multer');

var Error = require('../../lib/error');
var helper = require('../../lib/helpers');
var videocd = require('videocd');
var flow = require('../../handlers/flow');

router.get('/videocd', function (req, res, next) {
    videocd(req.query.q, function (err, result) {
        res.json(result);
    })
});

//获取发现
router.get("/discovery.json", flow.getDiscovery);
router.get("/recommend/activities.json", flow.getRecommendActivity);
router.post('/login', user.signIn);
router.post('/join', user.signUp);

router.get('/users/:userId', user.getUserInfo);
router.get('/weather/img/:resourceName/:weatherCode/:timeStamp', weather.getResource);
router.get('/chapters', doc.getChapters);
router.post('/chapters', multer().single('file'), doc.createWithUpload);
router.put('/chapters/:chapterId', doc.updateChapters);
router.delete('/chapters/:chapterId', doc.deleteChapters);
router.get('/chapters/:chapterId/docs', doc.getDocs);
router.put('/chapters/:chapterId/docs/:docId', doc.updateDocs);
// router.all('*',auth);
router.put('/users/:userId', user.updateUserInfo);


function auth(req, res, next) {

    if (!req.headers.authorization) {
        resAuthFail(req, res);
        return;
    }

    Auth.findOne({access_token: req.headers.authorization}, function (err, auth) {
        if (err) {
            resServerFail(req, res);
            return;
        }
        if (!auth) {
            resAuthFail(req, res);
        } else {
            next();
        }
    })
}

function resAuthFail(req, res) {
    helper.res(req, res, Error.access_token_invalid(req));
}

function resServerFail(req, res) {
    helper.res(req, res, Error.user_invalid(req));
}

module.exports = router;