const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String},
    content: {type: String, require: true},
    create_date: {type: Date, default: Date.now()},
    modify_date: {type: Date, default: Date.now()},
    ref_id: {type: Schema.Types.ObjectId}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
