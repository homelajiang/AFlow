var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    title: {type: String, require: true},
    image: {type: String}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

TagSchema.static({
    /**
     * 搜索和关键字类似的tag列表
     * @param q
     * @param callback
     */
    searchLike: function (q, callback) {
        Tag.find({title: {$regex: q, $options: "$i"}})
            .limit(10)
            .exec(callback);
    },
    getTags: function (pageNo, pageSize, callback) {
        Tag.find({})
            .select('title image')
            .skip((pageNo - 1) * pageSize)
            .exec(callback);
    }
});

var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;