var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Chapter = require('./chapter');
var Error = require('../lib/error');
var async = require('async');

var docSchema = mongoose.Schema({
    name: {type: String, required: true},
    chapterId: {type: Schema.Types.ObjectId, ref: 'Chapter'},
    request: {
        url: String,
        method: String,
        header: [
            {
                _id: false,
                key: String,
                value: String,
                description: String,
                enabled: Boolean,
                warning: String
            }
        ],
        body: {
            mode: String,
            urlencoded: [
                {
                    _id: false,
                    key: String,
                    value: String,
                    type: {type: String},
                    enabled: Boolean,
                    warning: String
                }
            ],
            raw: String
        },
        description: String

    },
    response: [
        {
            _id: false,
            name: String,
            code: Number,
            status: String,
            body: String
        }
    ]
});

docSchema.virtual('model')
    .get(function () {
        return {
            name:this.name,
            _id:this._id,
            chapterId:this.chapterId,
            request:this.request,
            body:this.body,
            response:this.response
        }
    });

docSchema.static({
    insertDocs: function (data, callback) {

        async.waterfall([
            //创建chapter
            function (cb) {
                new Chapter({
                    name: data.info.name,
                    description: data.info.description
                })
                    .save(function (err, chapter) {
                        cb(err, chapter);
                    })
            },
            //创建docs
            function (chapter, cb) {
                var docs = [];
                data.item.map(function (item) {
                    item.chapterId = chapter._id;
                    docs.push(item);
                });
                Doc.create(docs, function (err, docs) {
                    if (err) {
                        cb(err);
                        return;
                    }
                    var temp = [];
                    docs.map(function (val) {
                        temp.push(val._id);
                    });
                    cb(null, {docId: temp, chapterId: chapter._id});
                })
            },
            //更新chapter
            function (data, cb) {
                Chapter.update({_id: data.chapterId}, {item: data.docId}, function (err) {
                    cb(err);
                });
            }
        ], function (err) {
            callback(err, null);
        });

    },
    getUpdateMode: function (data) {
        var mode = {};
        data.name ? mode.name = data.name : '';
        data.request ? mode.request = data.request : '';
        data.response ? mode.response = data.response : '';
        return mode;
    }
});


var Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;