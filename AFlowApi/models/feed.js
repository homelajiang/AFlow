var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
    type: {
        id: Number,
        value: String,
        name: String
    },
    uuid: String,
    contentId: String,
    title: String,
    description: String,
    url: String,
    cover:String,
    attachment: [{
        source: String,
        description: String,
        danmakuId:String
    }],
    update_date: Number,
    visit: {
        views: Number,
        score: Number,
        comments: Number,
        danmakuSize: Number
    },
    owner: {
        id: Number,
        name: String,
        avatar: String
    },
    source: {
        name: String,
        url: String
    }
});

FeedSchema.static({
    /**
     * 通过uuid查询多媒体信息
     * @param uuid 要查询的多媒体的uuid
     * @param pageNo
     * @param pageSize
     * @param cb
     */
    getMediasByUuid: function (uuid, pageNo, pageSize, cb) {
        Media.find({uuid: uuid})
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            .sort({releaseDate: -1})
            .exec(cb);
    }
});


var Feed = mongoose.model("Feed", FeedSchema);

module.exports = Feed;