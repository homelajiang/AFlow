'use strict';

const Controller = require('egg').Controller;
const marked = require('marked');

class BlogController extends Controller {
    async page() {
        const {ctx} = this;
        const num = ctx.params.pageNo ? ctx.params.pageNo : '1';
        const posts = await ctx.service.blog.getPosts(num, 10);
        posts.hasPrePage = posts.pageNum > 1;
        posts.hasNextPage = posts.count > posts.pageSize * posts.pageNum;
        if (posts.hasPrePage)
            posts.prePage = posts.pageNum - 1;
        if (posts.hasNextPage)
            posts.nextPage = posts.pageNum + 1;
        await this.ctx.render('post_list.tpl', posts);
    }

    async post() {
        const {ctx} = this;
        const postId = ctx.params.id;

        let result;

        if (postId) {
            const post = await ctx.service.blog.getPost(postId);
            result = {};
            result.post = post;
            result.post.content = marked(post.content);
        }
        await this.ctx.render('post.tpl', result);

    }

    async tags() {
        const {ctx} = this;
        const tagsAndCategories = await ctx.service.blog.getTags();
        await this.ctx.render('tags.tpl', tagsAndCategories);
    }

    async archive() {
        const {ctx} = this;
        const archives = await ctx.service.blog.getArchives();
        await this.ctx.render('archives.tpl', {archives: archives});
    }

}

module.exports = BlogController;
