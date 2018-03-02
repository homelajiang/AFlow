var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MediaSchema = new Schema({
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
    image: [{
        url: String,
        title: String,
        description: String
    }],
    update_date: Number,
    visit: {
        views: Number,
        score: Number,
        comments: Number,
        danmaKuSize: Number
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

MediaSchema.static({
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


var Media = mongoose.model("Media", MediaSchema);

module.exports = Media;