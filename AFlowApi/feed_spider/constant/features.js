module.exports = [
    {
        id: 1,
        title: "发现",
        description: "发现不一样的信息",
        icon: "",
        children: [
            {
                id: 101,
                title: "AcFun香蕉榜",
                description: "获取AcFun香蕉榜视频",
                icon: "",
                update_interval: "0 */30 * * * *"
            }
        ]
    },
    {
        id: 2,
        title: "推荐活动",
        description: "",
        icon: "",
        children: [
            {
                id: 102,
                title: "AcFun活动",
                description: "获取AcFun活动文章",
                icon: "",
                update_interval: "0 0 * * * *"
            },
            {
                id: 103,
                title: "AcFun专题",
                description: "获取AcFun专题文章",
                icon: "",
                update_interval: "0 0 * * * *"
            }
        ]
    }
];