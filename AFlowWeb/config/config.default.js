'use strict';

module.exports = appInfo => {
    const config  = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1548406444368_6263';

    // add your config here
    config.middleware = [];

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        }
    };

    return config;
};
