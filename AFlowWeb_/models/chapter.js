var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chapterSchema = mongoose.Schema({
    name: {type: String, require: true},
    description: String,
    marked: {type: Boolean, default: false},
    modify_time: {type: Date, default: Date.now},
    item: [{type: Schema.Types.ObjectId, ref: 'Doc'}]//order
});


chapterSchema.virtual('size')
    .get(function () {
        return this.item.length;
    });
chapterSchema.virtual('model')
    .get(function () {
        return {
            _id: this._id,
            name: this.name,
            description: this.description,
            marked: this.marked,
            modify_time: this.modify_time.getTime(),
            size: this.size
        }
    });

chapterSchema.static({
    getUpdateMode: function (model) {
        var temp = {};
        model.name ? temp.name = model.name : '';
        model.description ? temp.description = model.description : '';
        model.marked ? temp.marked = model.marked : '';
        temp.modify_time = new Date();
        model.item ? temp.item = model.item : '';
        return temp;
    }
});

var Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;