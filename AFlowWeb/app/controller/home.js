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
}

module.exports = HomeController;
