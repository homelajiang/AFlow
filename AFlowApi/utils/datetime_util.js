const moment = require('moment');
const default_format = "YYYY-MM-DD HH:mm:ss";
const path_format = "YYYYMMDD";

module.exports = {
    defaultFormat: (date) => {
        return moment(date).format(default_format);
    },
    datetimePathFormat: (date) => {
        return moment(date).format(path_format);
    }
};
