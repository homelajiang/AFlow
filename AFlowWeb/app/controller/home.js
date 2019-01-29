'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        await this.ctx.render('layout.tpl');
    }

    async posts() {
        await this.ctx.render('posts.tpl');
    }

    async post() {
        await this.ctx.render('post.tpl');
    }

    async tags() {
        await this.ctx.render('tags.tpl');
    }

    async categories() {
        await this.ctx.render('categories.tpl');
    }

    async search() {
        await this.ctx.render('search.tpl');
    }

    async archives() {
        await this.ctx.render('archives.tpl');
    }

    async comment() {
        await this.ctx.render('comment.tpl');
    }
}

module.exports = HomeController;
