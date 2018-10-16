const config = require("../../config");
const mongoose = require('mongoose');

mongoose.connect(config.blog.db_connection, { useNewUrlParser: true }, (err) => {
    if (err)
        return console.log("数据库链接失败！！！");
    require('seneca')()
        .use(require('./plugins/post'))
        .use(require('./plugins/tag'))
        .listen(config.blog.port);
});
mongoose.Promise = global.Promise;
