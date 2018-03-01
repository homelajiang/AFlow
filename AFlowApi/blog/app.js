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
    //tag
    //categories
};