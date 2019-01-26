module.exports = {
    module: 'aflow',
    version: '0.0.1',
    build: 20170608,
    page: {
        size: 6,
        pageNoSize: 5
    },
    cookie: {
        cookieSecret: 'cookieSecret'
    },
    session: {
        secret: 'sessionSecret',
        key: 'PSESSION',
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 20 * 60 * 60 * 1000}
    },
    mongodb: {
        development: {
            connectionString: 'mongodb://localhost:27017/aflow'
        },
        production: {
            connectionString: 'mongodb://localhost:27017/aflow'
        }
    },
    blog: {
        url: '/',
        title: "HOMELAJIANG",
        description: 'homelajiang’s blog',
        nav: [
            {
                label: '首页',
                current: false,
                url: '/'
            },
            {
                label: '归档',
                current: false,
                url: '/archive'
            },
            {
                label: 'RSS',
                current: false,
                url: '/'
            }
        ]

    },
    base_url:{
      file:"http://localhost:3000/"
    },
    navigation: function (index) {
        if (index >= 0 && index < this.blog.nav.length) {
            var temp = JSON.parse(JSON.stringify(this.blog.nav));
            temp[index].current = true;
            return temp;
        } else {
            return this.blog.nav;
        }
    }
};