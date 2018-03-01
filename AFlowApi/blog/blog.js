const seneca = require('seneca')();
const async = require('async');

seneca
    .use("basic")
    .use("entity")
    .use('mongo-store', {
        uri: 'mongodb://localhost:27017/aflow'
    });

const postSeneca = seneca.make('post');
const tagSeneca = seneca.make('tag');
const categoriesSeneca = seneca.make('categories');

module.exports = function (options) {
    //post
    this.add('role:blog,cmd:add', function (msg, respond) {
        var post = seneca.make('post');
        post.title = msg.title;
        post.description = msg.description;
        post.content = msg.content;
        post.md_content = msg.md_content;
        post.create_date = new Date();
        post.modify_date = new Date();
        // post.tags
        // post.categories=
        // post.creator
        // post.status//0草稿 1已发布 -1已删除
    });
    this.add('role:blog,cmd:query', function (msg, respond) {
        postSeneca.load$({id: msg.id}, respond);
    });
    this.add('role:blog,cmd:list', function (msg, respond) {

    });
    this.add('role:blog,cmd:remove', function (msg, respond) {

    });
    //tag
    this.add('role:tag,cmd:add', function (msg, respond) {

    });
    this.add('role:tag,cmd:query', function (msg, respond) {

    });
    this.add('role:tag,cmd:list', function (msg, respond) {

    });
    this.add('role:tag,cmd:remove', function (msg, respond) {

    });
    //categories
    this.add('role:categories,cmd:add', function (msg, respond) {

    });
    this.add('role:categories,cmd:query', function (msg, respond) {

    });
    this.add('role:categories,cmd:list', function (msg, respond) {

    });
    this.add('role:categories,cmd:remove', function (msg, respond) {

    });
};