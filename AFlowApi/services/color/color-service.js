require('seneca')()
    .use(require('./plugin/color'))
    .listen(9586);
