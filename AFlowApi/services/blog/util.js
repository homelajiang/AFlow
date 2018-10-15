module.exports = {
    //生成分页格式
    generatePageModel: function (pageSize, pageNum, count, list) {
        return {
            pageSize: pageSize,
            pageNum: pageNum,
            count: count,
            list: list
        };
    }
};

