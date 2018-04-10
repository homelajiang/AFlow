const config = require("../../config");
const mongoose = require('mongoose');
const seneca = require('seneca')();

mongoose.connect(config.spider.db_connection, {}, (err) => {
    if (err)
        return console.log("数据库链接失败。");

    seneca.use(require('./plugins/feed_plugin'))
        .listen(config.spider.port);
    seneca.act('role:feed,cmd:start');

    // require('./plugins/feed_plugin').start();
});

mongoose.Promise = global.Promise;