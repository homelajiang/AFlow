const config = require("../config");
const mongoose = require('mongoose');

mongoose.connect(config.statistics.db_connection, { useNewUrlParser: true }, (err) => {
    if (err)
        return console.log("数据库连接失败！！！");
    require('seneca')()
        .use(require('./plugins/statistics'))
        .listen(config.statistics.port);
});
mongoose.Promise = global.Promise;
