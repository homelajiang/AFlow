'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        await this.ctx.render('index.tpl');
    }

    async post() {
        await this.ctx.render('post.tpl');
    }

    async categories() {
        await this.ctx.render('categories.tpl');
    }

    async archive() {
        await this.ctx.render('archives.tpl');
    }

}

module.exports = HomeController;
