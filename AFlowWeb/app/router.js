'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 自定义控件 统计访问记录
  const statistics = app.middleware.statistics();

  router.get('/', statistics, controller.blog.archive); // 首页使用归档
  router.get('/page/:pageNo', statistics, controller.blog.archive);
  router.get('/post/:id', statistics, controller.blog.post);
  router.post('/post/:id', statistics, controller.blog.comment);
  router.get('/tags', statistics, controller.blog.tags);
  router.get('/archive',statistics, controller.blog.archive);
  router.get('/tag/:tagName', statistics, controller.blog.searchTag);
  router.get('/categories/:categoriesName', statistics, controller.blog.searchCategories);
  router.get('/search', statistics, controller.blog.searchKeyword);
};
