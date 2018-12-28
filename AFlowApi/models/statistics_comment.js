const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsCommentSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    date: String,// 20181221
    count: Number//数量
}, {
    versionKey: false
});

const StatisticsComment = mongoose.model('StatisticsComment', statisticsCommentSchema);

module.exports = StatisticsComment;
