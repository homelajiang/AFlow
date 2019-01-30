'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/post', controller.home.post);
    router.get('/categories', controller.home.categories);
    router.get('/archive', controller.home.archive);
};
