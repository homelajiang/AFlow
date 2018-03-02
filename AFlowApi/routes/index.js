var routes = [];
routes = routes.concat(require('./file.js'))
    .concat(require('./blog.js'));
module.exports = routes;