const Boom = require('boom');

module.exports = {
    //生成分页格式
    generatePageModel: function (pageSize, pageNum, count, list) {
        let hasNextPage;
        if (list.length === pageSize && pageSize * pageNum < count) {
            hasNextPage = true;
        }
        return {
            hasNextPage: hasNextPage,
            pageSize: pageSize,
            pageNum: pageNum,
            count: count,
            list: list
        };
    },//生成错误信息
    generateErr: function (msg, code) {
        return {
            code: code ? code : "400",
            error: true,
            message: msg ? msg : "请求错误"
        }
    }
};

