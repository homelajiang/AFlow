const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    name: {type: String, require: true},
    alias: {type: String},
    image: {type: String},
    description: {type: String}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

CategoriesSchema.static({
    getCategories: function (callback) {
        Categories.find()
            .exec(callback);
    }
});

const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = Categories;
