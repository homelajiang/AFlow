const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {type: String, require: true},
    alias: {type: String},
    image: {type: String},
    description: {type: String}
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

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
