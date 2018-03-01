require('seneca')()
    .use(require('./blog'))
    .listen(5202);