'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
  async page() {
    const { ctx } = this;
    const num = ctx.params.pageNo ? ctx.params.pageNo : '1';
    const posts = await ctx.service.blog.getPosts(num, 10);
    posts.hasPrePage = posts.pageNum > 1;
    posts.hasNextPage = posts.count > posts.pageSize * posts.pageNum;
    if (posts.hasPrePage) {
      posts.prePage = posts.pageNum - 1;
    }
    if (posts.hasNextPage) {
      posts.nextPage = posts.pageNum + 1;
    }
    await this.ctx.render('post_list.tpl', posts);
  }

  // 文章详情
  async post() {
    const { ctx } = this;
    const postId = ctx.params.id;

    let result;

    const postInfo = await ctx.service.blog.getPost(postId);
    // todo 文章不存在处理 (错误处理)
    // TODO 判断文章私密度
    const aroundPost = await ctx.service.blog.getAroundPost(postId);
    const comments = await ctx.service.blog.getComments(postId, 1, 10);

    result = {
      post: postInfo,
      previous: aroundPost.previous,
      next: aroundPost.next,
      comments: comments,
      showAround: aroundPost.next || aroundPost.previous
    };

      await this.ctx.render('post.tpl', result);

  }

  // 添加评论
  async comment() {
    const { ctx } = this;
    const postId = ctx.params.id;
    const createRule = {
      content: {
        type: 'string',
        required: true,
        max: 1000
      },
      name: {
        type: 'string',
        require: true,
        min: 1,
        max: 50,
        trim: true
      },
      email: {
        type: 'email'
      },
      host: {
        type: 'url'
      }
    };

    // 验证评论 校验不通过会抛出异常
    ctx.validate(createRule, ctx.request.body);

    const postInfo = await ctx.service.blog.getPost(postId);

    if (postInfo.error) {
      await this.ctx.renderString(postInfo.message);
      return;
    }

    // 添加评论 // TOOD 添加评论
    // await this.ctx.service.blog.commitComment(postId, ctx.request.body);

    //内部重定向到文章详情页面
    this.app.router.redirect('/', '/blog/' + postId, app.controller.blog.post);
  }


  // 标签和分类页面
  async tags() {
    const { ctx } = this;
    const tagsAndCategories = await ctx.service.blog.getTags();
    await this.ctx.render('tags.tpl', tagsAndCategories);
  }

  // 归档页面
  async archive() {
    const { ctx } = this;
    const num = ctx.params.pageNo ? ctx.params.pageNo : '1';
    const archives = await ctx.service.blog.getArchives(num, 15);
    await this.ctx.render('archives.tpl', archives);
  }

  // 标签搜索页面
  async searchTag() {
    const { ctx } = this;
    const posts = await ctx.service.blog.search('tag', this.ctx.params.tagName);
    let results;
    if (posts.error) {
      results = { error: posts.message };
    } else {
      results = { archives: [{ _id: this.ctx.params.tagName, count: posts.length, posts: posts }] };
    }
    await this.ctx.render('search.tpl', results);
  }

  // 分类搜索界面
  async searchCategories() {
    const { ctx } = this;
    const posts = await ctx.service.blog.search('categories', this.ctx.params.categoriesName);
    let results;
    if (posts.error) {
      results = { error: posts.message };
    } else {
      results = { archives: [{ _id: this.ctx.params.categoriesName, count: posts.length, posts: posts }] };
    }
    await this.ctx.render('search.tpl', results);
  }

  // 关键字搜索界面
  async searchKeyword() {
    const { ctx } = this;
    const posts = await ctx.service.blog.search('keyword', this.ctx.query.key);
    let results;
    if (posts.error) {
      results = { error: posts.message };
    } else {
      results = { archives: [{ _id: this.ctx.query.key, count: posts.length, posts: posts }] };
    }
    await this.ctx.render('search.tpl', results);
  }

}

module.exports = BlogController;
