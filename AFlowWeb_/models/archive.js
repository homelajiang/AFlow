var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var archiveSchema = mongoose.Schema({
    tags: [{type: String}],
    categories: [{type: String}]
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

var Archive = mongoose.model('Archive', archiveSchema);

module.exports = Tag;