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
            const aroundPost = await ctx.service.blog.getAroundPost(postId);
            const comments = await ctx.service.blog.getComments(postId,1, 10);

            result = {
                post: postInfo,
                previous: aroundPost.previous,
                next: aroundPost.next,
                comments: comments,
                showAround: aroundPost.next || aroundPost.previous,
                postComment: false // todo 是否禁止评论
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

}

module.exports = BlogController;
