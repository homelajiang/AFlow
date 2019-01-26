var seneca = require('seneca')();
seneca
    .use('blog_plugin')
    .act('role:blog,cmd:fetch,id:5a601945fdaa48e9583403f7', function (err, entity) {
        console.log(entity);
    });