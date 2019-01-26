var config = require('./config');

module.exports = {
    /**
     * 处理页码信息
     * @param results
     * @param pageNo
     */
    handlePageNo: function (results, pageNo) {
        //处理page_info
        results.page_info.pageNo = pageNo;
        results.page_info.pageSize = config.page.size;
        results.page_info.prev = pageNo - 1 <= 0 ? 0 : pageNo - 1;
        results.page_info.next = pageNo === results.page_info.totalPage ? 0 : pageNo + 1;
        results.page_info.page = [];
        var pageNoMiddle = parseInt((config.page.pageNoSize - 1) / 2);
        var i;
        //页数左边不够
        if (pageNo - pageNoMiddle <= 0) {
            for (i = 0; i < config.page.pageNoSize; i++) {
                if (i < results.page_info.totalPage) {
                    results.page_info.page.push({
                        No: i + 1,
                        current: (pageNo === i + 1)
                    })
                }
            }
        } else if (pageNo - pageNoMiddle > 0 && pageNo + pageNoMiddle < results.page_info.totalPage) {
            for (i = 0; i < config.page.pageNoSize; i++) {
                results.page_info.page.push({
                    No: pageNo - pageNoMiddle + i,
                    current: (pageNo === pageNo - pageNoMiddle + i)
                })
            }
        } else {
            //页数右边不够
            for (i = 0; i < config.page.pageNoSize; i++) {
                if (results.page_info.totalPage - i > 0) {
                    results.page_info.page.unshift({
                        No: results.page_info.totalPage - i,
                        current: (pageNo === results.page_info.totalPage - i)
                    })
                }
            }
        }
    }
};