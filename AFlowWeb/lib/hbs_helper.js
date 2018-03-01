
var moment = require('moment');

module.exports = {
    //行级//
    //资源引用路径
    asset: function (name) {
        return '/stylesheets/' + name;
    },
    //文章内容 处理内容
    description: function () {
        // console.log(arguments[0].hash.words);
        return this.description;
    },
    //时间格式化
    date: function () {
        return moment(this.createDate).format(arguments[0].hash.format);
    },
    url: function () {
        return this.url;
    },
    post_href: function () {
        return arguments[0].hash.head + this._id;
    },
    href: function (u, r, options) {
        if (arguments.length < 2)
            throw new Error('Handlerbars Helper "url" needs 2 parameters');
        return u + r;
    },
    page_url: function (page) {
        return "/page/" + page;
    }
};