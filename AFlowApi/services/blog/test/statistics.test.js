const Seneca = require('seneca');
const mongoose = require('mongoose');
const config = require("../../config");
const async = require('async');
const should = require('should');

describe('statistics_test', () => {

    before(function (done) {
        mongoose.connect(config.blog.db_connection, {useNewUrlParser: true}, (err) => {
            done(err);
        })
    });

    it('Add record', (done) => {
        const seneca = test_seneca(done);
        for (let i = 0; i < 10; i++) {
            seneca.act({
                role: 'statistics',
                cmd: 'add',
                type: 'comment',
                id: '5bd3fbd5909a780d548f8c17'
            });

            // seneca.act({
            //     role: 'statistics',
            //     cmd: 'add',
            //     type: 'post',
            //     id: '5bd3fbd5909a780d548f8c17'
            // });
            // seneca.act({
            //     role: 'statistics',
            //     cmd: 'add'
            // });
        }
        done();
    });

    // it('Get Statistics', (done) => {
    //     const seneca = test_seneca(done);
    //     seneca.act({
    //         role: 'statistics',
    //         cmd: 'all'
    //     }, (err, res) => {
    //         console.log(res);
    //         done();
    //     });
    // });

    // it('查询文章排行（按评论）', (done) => {
    //     const seneca = test_seneca(done);
    //     seneca.act({
    //         role: 'statistics',
    //         cmd: 'sort',
    //         by: 'comment',
    //         date_range: 'year'
    //     }, (err, res) => {
    //         console.log(res);
    //         done();
    //     })
    // });
});

function test_seneca(cb) {
    return Seneca({log: 'test'})
        .test(cb, 'print')
        .use(require('../plugins/statistics'))
}
