var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
    name: String,
    path: String,
    mimetype: String,
    create_date: {type: Date, default: new Date()}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});




var File = mongoose.model('File', fileSchema);

module.exports = File;