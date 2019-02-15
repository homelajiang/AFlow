'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.blog.page);
    router.get('/page/:pageNo', controller.blog.page);
    router.get('/post/:id', controller.blog.post);
    router.get('/tags', controller.blog.tags);
    router.get('/archive', controller.blog.archive);
    router.get('/tag/:tagName', controller.blog.searchTag);
    router.get('/categories/:categoriesName', controller.blog.searchCategories);
    router.get('/search', controller.blog.searchKeyword);
};
