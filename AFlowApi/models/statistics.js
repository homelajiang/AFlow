const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    date: String,//2018-12-21
    count: Number,
    s_type: String//post comment site
}, {
    versionKey: false
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;
