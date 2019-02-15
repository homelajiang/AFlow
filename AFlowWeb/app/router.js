'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    const statistics = app.middleware.statistics();

    router.get('/',statistics, controller.blog.page);
    router.get('/page/:pageNo',statistics, controller.blog.page);
    router.get('/post/:id',statistics, controller.blog.post);
    router.get('/tags',statistics, controller.blog.tags);
    router.get('/archive',statistics, controller.blog.archive);
    router.get('/tag/:tagName',statistics, controller.blog.searchTag);
    router.get('/categories/:categoriesName',statistics, controller.blog.searchCategories);
    router.get('/search',statistics, controller.blog.searchKeyword);
};
