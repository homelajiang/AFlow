const moment = require('moment');
const format1 = "YYYY-MM-DD HH:mm:ss";

module.exports = {
    defaultFormat: (date) => {
        moment(date).format(format1);
    }
};
