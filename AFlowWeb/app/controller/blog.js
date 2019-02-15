'use strict';

const Controller = require('egg').Controller;

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

            const postInfo = await ctx.service.blog.getPost(postId);
            // todo 文章不存在处理 (错误处理)
            const aroundPost = await ctx.service.blog.getAroundPost(postId);
            const comments = await ctx.service.blog.getComments(postId, 1, 10);

            result = {
                post: postInfo,
                previous: aroundPost.previous,
                next: aroundPost.next,
                comments: comments,
                showAround: aroundPost.next || aroundPost.previous
            };
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

    async searchTag() {
        const {ctx} = this;
        const posts = await ctx.service.blog.search('tag', this.ctx.params.tagName);
        let archives;
        if (posts.error) {
            archives = {error: posts.message};
        } else {
            archives = {archives: [{_id: this.ctx.params.tagName, count: posts.length, posts: posts}]}
        }
        await this.ctx.render('archives.tpl', archives);
    }

    async searchCategories() {
        const {ctx} = this;
        const posts = await ctx.service.blog.search('categories', this.ctx.params.categoriesName);
        let archives;
        if (posts.error) {
            archives = {error: posts.message};
        } else {
            archives = {archives: [{_id: this.ctx.params.categoriesName, count: posts.length, posts: posts}]}
        }
        await this.ctx.render('archives.tpl', archives);
    }

    async searchKeyword() {
        const {ctx} = this;
        const posts = await ctx.service.blog.search('keyword', this.ctx.query.key);
        let archives;
        if (posts.error) {
            archives = {error: posts.message};
        } else {
            archives = {archives: [{_id: this.ctx.query.key, count: posts.length, posts: posts}]}
        }
        await this.ctx.render('archives.tpl', archives);
    }

}

module.exports = BlogController;
