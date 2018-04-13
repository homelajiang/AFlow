const config = require("../../config");
const mongoose = require('mongoose');

mongoose.connect(config.auth.db_connection, {}, (err) => {
    if (err)
        return console.log(err);
    require('seneca')()
        .use(require('./plugins/auth_plugin'))
        .use(require('./plugins/profile_plugin'))
        .listen(config.auth.port);
});
mongoose.Promise = global.Promise;