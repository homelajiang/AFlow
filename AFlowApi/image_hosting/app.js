require('seneca')()
    .use(require('./file.js'))
    .listen(5201);
