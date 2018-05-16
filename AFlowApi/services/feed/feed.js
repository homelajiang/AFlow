const config = require('../../config');
const mongoose = require('mongoose');
const seneca = require('seneca')();

mongoose.connect(config.feed.db_connection, {}, err => {
    if (err)
        return console.log("数据库链接失败");
    seneca.use(require('./plugins/feed_plugin'))
        .listen(config.feed.port);
});

mongoose.Promise = global.Promise;