const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewRecordSchema = new Schema({
    user: String,
    ip: String,
    refer: String,
    target: String,
    target_type: String,
    os: String,
    client: String,
    language: String,
    browser: String,
    date: Date
}, {
    versionKey: false // You should be aware of the outcome after set to false
});


const ViewRecord = mongoose.model('ViewRecord', viewRecordSchema);

module.exports = ViewRecord;
