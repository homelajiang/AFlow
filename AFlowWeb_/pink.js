var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var hbs = require('hbs');
var http = require('http');
var hbs_helper = require('./lib/hbs_helper');
var opts = {};
var config = require('./config.js');
var blog = require('./routes/index');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper(hbs_helper);

app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.set('view options',{layout:'./layouts/layout'});
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
// app.use(logger('dev'));

function mongodbCallback(err) {
    if (err)
        console.log("数据库链接失败！！！")
}
mongoose.Promise = global.Promise;

switch (app.get('env')) {
    case 'development':
        app.use(require('morgan')('dev'));
        mongoose.connect(config.mongodb.development.connectionString, opts, mongodbCallback);
        break;
    case 'production':
        app.use(require('express-logger')({
            path: __dirname + '/log/requests.log'
        }));
        mongoose.connect(config.mongodb.production.connectionString, opts, mongodbCallback);
        break;
    default:
        throw new Error('Unknown execution environment:' + app.get('env'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(config.cookie.cookieSecret));

var session_options = config.session;
var MongoStore = require('connect-mongo')(session);
session_options.store = new MongoStore(
    {
        url: app.get('env' === 'production')
            ? config.mongodb.production.connectionString
            : config.mongodb.development.connectionString
    });
app.use(session(session_options));

/*app.use(function (req, res, next) {
    //为请求定义一个域
    var domain = require('domain').create();
    //处理这个域中的错误
    domain.on('error', function (err) {
        console.error('DOMAIN ERROR CAUGHT\n', err.stack);

        try {
            //5秒内进行故障保护关机
            setTimeout(function () {
                console.error('Failsafe shutdown.');
                process.exit(1);
            }, 5000);

            //从集群中断开
            var worker = require('cluster').worker;
            if (worker)
                worker.disconnect();

            //停止接受新的请求
            server.close();

            try {
                //尝试使用Express错误路由
                next(err);
            } catch (err) {
                //如果Express错误路由诗词奥，尝试返回普通的文本响应
                console.error('Express error mechanism failed.\n', err.stack);
                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain');
                res.end('Server error.');
            }
        } catch (err) {
            console.error('Unable to send 500 response.\n', err.stack);
        }
    });
    //向域中添加请求和响应对象
    domain.add(req);
    domain.add(res);

    //执行该域中剩余的请求链
    domain.run(next);
});*/


app.use('/', blog);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error',err);
});

function startServer() {
    http.createServer(app)
        .listen(app.get('port'), function () {
            console.log(
                '\n********************************\n' +
                '*     SERVER IS RUNNING ON     *\n' +
                '*     PORT:' +
                app.get('port') +
                '                *\n' +
                '*     MODE:' +
                app.get('env') +
                '         *' +
                '\n********************************\n'
            )
        });
}

if (require.main === module) {
    startServer();
} else {
    module.exports = startServer;
}

// module.exports = app;
