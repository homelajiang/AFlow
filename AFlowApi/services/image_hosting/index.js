const config = require("../../config");
const mongoose = require('mongoose');

mongoose.connect(config.image_hosting.db_connection, {}, (err) => {
    if (err)
        return console.log("数据库链接失败！！！");
    require('seneca')()
        .use(require('./plugins/image_hosting'))
        .listen(config.image_hosting.port);
});
mongoose.Promise = global.Promise;