const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsPostSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    date: String,// 20181221
    count: Number//数量
}, {
    versionKey: false
});

const StatisticsPost = mongoose.model('StatisticsComment', statisticsPostSchema);

module.exports = StatisticsPost;
