var seneca = require('seneca')();
seneca
    .use("basic")
    .use("entity")
    .use('mongo-store', {
        uri: 'mongodb://localhost:27017/test'
    });

module.exports = function blog_plugin(options) {
    this.add('role:blog,cmd:fetch', function (msg, res) {
        blog.load$({id: msg.id}, res)
    });

    this.add('role:blog,cmd:create', function (msg, res) {

    });

    this.add('role:blog,cmd:list', function (msg, res) {

    });

    this.add('role:blog,cmd:remove', function (msg, res) {

    });

};