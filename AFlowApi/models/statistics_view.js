const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsViewSchema = new Schema({
    date: String,// 20181221
    count: Number//数量
}, {
    versionKey: false
});

const StatisticsView = mongoose.model('StatisticsView', statisticsViewSchema);

module.exports = StatisticsView;
