const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewRecordSchema = new Schema({
    identifier: String,
    ip: String,
    refer: String,
    url: String,
    os: String,
    client: String,
    language: String,
    browser: String,
    visit_date: Date
}, {
    versionKey: false // You should be aware of the outcome after set to false
});


const ViewRecord = mongoose.model('ViewRecord', viewRecordSchema);

module.exports = ViewRecord;
