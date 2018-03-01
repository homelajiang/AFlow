var Categories = require('../models/categories');


module.exports = {

    getCategories: function (req, res, next) {
        Categories.getCategories(function (err, categories) {
            if (err) {
                res.status(502).json();
            } else {
                res.json(categories);
            }
        })
    },
    addCategories: function (req, res, next) {
        var categories = new Categories({
            title: req.body.title,
            image: req.body.image
        });
        categories.save(function (err, categories) {
            if (err) {
                res.status(502).json();
            } else {
                res.json(categories);
            }
        })
    },
    updateCategories: function (req, res, next) {
        var categories = {
            title: req.body.title,
            image: req.body.image
        };
        Categories.findByIdAndUpdate(req.body._id, categories, function (err, categories) {
            if (err) {
                res.status(502).json();
            } else {
                res.json(categories);
            }
        })
    },
    deleteCategories: function (req, res, next) {
        Categories.remove({_id: req.body._id}, function (err) {
            if (err) {
                res.status(502).json();
            } else {
                res.json();
            }
        })
    }
};
