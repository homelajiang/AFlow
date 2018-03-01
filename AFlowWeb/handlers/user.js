var User = require('../models/user.js');
var Auth = require('../models/oath');
var Error = require('../lib/error');
var async = require('async');
var helper = require('../lib/helpers');


module.exports = {

    //登录
    signIn: function (req, res, next) {
        async.waterfall([
            function (cb) {

                if (!req.body.grant_type || !((req.body.grant_type == 'refresh_token' && req.body.refresh_token) || (req.body.username && req.body.password))) {
                    cb(Error.request_params_invalid(req));
                    return;
                }

                if (req.body.grant_type == 'refresh_token') {
                    Auth.findOne({refresh_token: req.body.refresh_token}, function (err, auth) {
                        cb(err, auth);
                    })
                } else if (req.body.grant_type == 'app' || req.body.grant_type == 'web') {
                    Auth.findOne({username: req.body.username}, function (err, auth) {
                        cb(err, auth);
                    })
                } else {
                    cb(Error.request_params_invalid(req));
                }
            },
            //校验token
            function (auth, cb) {
                if (req.body.grant_type == 'refresh_token') {
                    if (!auth) {
                        cb(Error.user_invalid(req));
                        return;
                    }
                    cb(null, auth);
                } else {
                    if (!auth) {
                        cb(Error.user_invalid(req));
                        return;
                    }
                    if (auth.password == req.body.password) {
                        cb(null, auth);
                    } else {
                        cb(Error.username_password_mismatch(req));
                    }
                }
            },
            //更新token
            function (auth, cb) {
                if (req.body.grant_type == 'refresh_token' || req.body.grant_type == 'app') {
                    Auth.findByIdAndUpdate(auth._id, {
                        access_token: auth.generateAccessToken(),
                        refresh_token: auth.generateRefreshToken(),
                        expires_date: new Date()
                    }, function (err) {
                        cb(err, auth);
                    })
                } else {
                    cb(null, auth);
                }
            },
            //获取auth
            function (auth, cb) {
                if (req.body.grant_type == 'refresh_token' || req.body.grant_type == 'app') {
                    Auth.findById(auth._id, function (err, authDoc) {
                        if (err)
                            cb(err, authDoc);
                        cb(null, authDoc);
                    });
                } else {
                    cb(null, auth);
                }

            },
            //获取user
            function (auth, cb) {
                if (req.body.grant_type == 'refresh_token' || req.body.grant_type == 'app') {
                    cb(null, auth.model);
                } else {
                    User.findById(auth.uid, function (err, user) {
                        if (err) {
                            cb(err);
                            return;
                        }
                        if (!user) {
                            cb(Error.user_invalid(req));
                            return;
                        }
                        req.session.user = user.model;
                        req.session.auth = auth.model;
                        cb(null, user.model);
                    });
                }

            }
        ], function (err, data) {
            helper.res(req, res, err, data);
        });

    },
    //注册
    signUp: function (req, res, next) {
        async.waterfall([
            function (cb) {
                Auth.findOne({username: req.body.username}, function (err, auth) {
                    cb(err, auth);
                })
            },
            function (auth, cb) {
                if (auth) {
                    cb(Error.user_existed(req));
                    return;
                }
                new User({
                    nickname: req.body.nickname ? req.body.nickname : req.body.username
                }).save(function (err, user) {
                    //todo delete the user
                    cb(err, user);
                });
            },
            function (user, cb) {
                new Auth({
                    access_token: Auth.generateAccessToken(user._id, req.body.username),
                    refresh_token: Auth.generateRefreshToken(user._id, req.body.username),
                    uid: user._id,
                    username: req.body.username,
                    password: req.body.password
                })
                    .save(function (err, authDoc) {
                        cb(err, authDoc);
                    });
            },
            function (auth, cb) {
                cb(null, auth.model)
            }
        ], function (err, data) {
            helper.res(req, res, err, data);
        });
    },
    //重置密码
    resetPassword: function (req, res, next) {

    },
    //获取用户信息
    getUserInfo: function (req, res, next) {

        User.findById(req.params.userId, function (err, user) {
            if (!user) {
                err = Error.user_invalid(req);
            }
            helper.res(req, res, err, user);
        });
    },
    //修改用户信息
    updateUserInfo: function (req, res, next) {
        async.waterfall([
            //验证
            function (cb) {
                Auth.findOne({access_token: req.headers.authorization}, function (err, auth) {
                    cb(err, auth);
                })
            },
            //更新
            function (auth, cb) {
                if (!auth) {
                    cb(Error.access_token_invalid(req));
                    return;
                }
                User.findByIdAndUpdate(auth.uid,
                    User.getUpdateMode(req.body), function (err) {
                        cb(err, auth);
                    });
            },
            //获取更新后的结果
            function (auth, cb) {
                User.findById(auth.uid, function (err, user) {
                    cb(err, user.model);
                })
            }
        ], function (err, data) {
            helper.res(req, res, err, data);
        });
    }
};