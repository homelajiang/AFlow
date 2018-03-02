const config = require("../../config/config");
const mongoose = require('mongoose');

mongoose.connect(config.blog.db_connection, {}, (err) => {
    if (err)
        return console.log("数据库链接失败！！！");
    require('seneca')()
        .use(require('./plugins/blog_plugin'))
        .listen(config.blog.port);
});
mongoose.Promise = global.Promise;
