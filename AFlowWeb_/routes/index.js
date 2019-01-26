/**
 * Created by Administrator on 2017/3/31 0031.
 */
var express = require('express');
var router = express.Router();
var blog = require('../handlers/blog');
var index = require('../handlers/index');

/* GET home page. */
router
// .get('/login', index.showLogin)//登录界面
// .get('/api', index.showApi)//api页面

    .get('/', blog.pagePage)//首页
    .get('/page/:pageNo', blog.pagePage)//博客列表
    .get('/post/:postId', blog.postPage)//博客详情
    .get('/archive', blog.archivePage)//按博客归档
    .get('/tags/:tag', blog.tagPage)//按tag分类
    .get('/search', blog.searchPage)//按关键字分类
    .get('/categories/:categories', blog.categoriesPage)//按类别分类
    // .get('/apiAddPost', blog.apiAddPost)
    // .get('/test',blog.apiGetPost)
;

module.exports = router;