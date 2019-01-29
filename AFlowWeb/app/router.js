'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/post', controller.home.post);
    router.get('/posts', controller.home.posts);
    router.get('/tags', controller.home.tags);
    router.get('/categories', controller.home.categories);
    router.get('/search', controller.home.search);
    router.get('/archives', controller.home.archives);
    router.get('/comments', controller.home.comment);
};
