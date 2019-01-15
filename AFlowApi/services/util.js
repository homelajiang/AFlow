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
    },
    //获取一周的开始时间和结束时间
    getWeekRange: function (year, month, nowDay, dayOfWeek, index, sundayFirst) {
        if (sundayFirst) {
            const start = new Date(year, month, 7 * (index) + nowDay - dayOfWeek);
            const end = new Date(year, month, 7 * (index + 1) + nowDay - dayOfWeek);
            return [start, end];
        } else {
            const start = new Date(year, month, 7 * (index) + nowDay - dayOfWeek + 1);
            const end = new Date(year, month, 7 * (index + 1) + nowDay - dayOfWeek + 1);
            return [start, end];
        }
    },
    //获取一天的开始时间和结束时间
    getDayRange: function (nowDate, index) {
        let temp = new Date(nowDate.getTime());
        temp.setHours(0);
        temp.setMinutes(0);
        temp.setSeconds(0);
        temp.setMilliseconds(0);

        temp = new Date(temp.getTime() + index * 24 * 3600 * 1000);

        return [temp, new Date(temp.getTime() + 24 * 3600 * 1000)];
    }
};

