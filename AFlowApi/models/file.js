const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    name: {type: String, require: true},
    path: {type: String, require: true},
    description: String,
    mimetype: String,
    create_date: {type: Date, default: Date.now()},
    modify_date: {type: Date, default: Date.now()}

}, {
    versionKey: false // You should be aware of the outcome after set to false
});

fileSchema.static({
    getInsertModel: function (model) {
        let temp = {};
        model.name ? temp.name = model.name : '';
        model.path ? temp.path = model.path : '';
        model.description ? temp.description = model.description : '';
        model.mimetype ? temp.mimetype = model.mimetype : '';
        return temp;
    },
    getUpdateModel: function (model) {
        let temp = {
            modify_date: Date.now()
        };
        model.name ? temp.name = model.name : '';
        model.description ? temp.description = model.description : '';
        return temp;
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
