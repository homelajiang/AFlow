const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    date: String,// 20181221
    count: Number//数量
}, {
    versionKey: false
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;
