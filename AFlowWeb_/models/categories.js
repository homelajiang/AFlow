var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
    name: {type: String, require: true},
    image: {type: String}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

CategoriesSchema.static({
    getCategories: function (callback) {
        Categories.find()
            .exec(callback);
    }
});

var Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = Categories;