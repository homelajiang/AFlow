var config = require('../config');
const pageNoSize = 5;

module.exports = {
    /**
     * 处理页码信息
     * @param pageNo
     * @param pageSize
     * @param totalCount
     */
    handlePageNo: function (pageNo, pageSize, totalCount) {
        var totalPage = totalCount % pageSize === 0 ?
            Math.floor(totalCount / pageSize) : Math.floor(totalCount / pageSize) + 1;
        var pageInfo = {
            totalPage: totalPage,
            pageNo: pageNo,
            pageSize: pageSize,
            prev: pageNo - 1 <= 0 ? 0 : pageNo - 1,
            next: pageNo === totalPage ? 0 : pageNo + 1,
            page: []
        };

        var pageNoMiddle = parseInt((pageNoSize - 1) / 2);
        var i;
        //页数左边不够
        if (pageNo - pageNoMiddle <= 0) {
            for (i = 0; i < pageNoSize; i++) {
                if (i < pageInfo.totalPage) {
                    pageInfo.page.push({
                        No: i + 1,
                        current: (pageNo === i + 1)
                    })
                }
            }
        } else if (pageNo - pageNoMiddle > 0 && pageNo + pageNoMiddle < pageInfo.totalPage) {
            for (i = 0; i < pageNoSize; i++) {
                pageInfo.page.push({
                    No: pageNo - pageNoMiddle + i,
                    current: (pageNo === pageNo - pageNoMiddle + i)
                })
            }
        } else {
            //页数右边不够
            for (i = 0; i < pageNoSize; i++) {
                if (pageInfo.totalPage - i > 0) {
                    pageInfo.page.unshift({
                        No: pageInfo.totalPage - i,
                        current: (pageNo === pageInfo.totalPage - i)
                    })
                }
            }
        }
        return pageInfo;
    }


};