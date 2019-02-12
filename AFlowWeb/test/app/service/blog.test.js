'use strict';

const {app, assert} = require('egg-mock/bootstrap');

describe('test/app/service/blog.test.js', () => {

    it('should assert', async () => {
        const pkg = require('../../../package.json');
        assert(app.config.keys.startsWith(pkg.name));

        const ctx = app.mockContext();
        // yield ctx.service.xx();
        const res = await ctx.service.blog.getTags();
        assert(res);
    });

    it('Archive', async () => {
        const ctx = app.mockContext();
        const res = await ctx.service.blog.getArchives();
        assert(res);
    });

    it('Get Post Detail', async () => {
        const ctx = app.mockContext();
        const res = await ctx.service.blog.getPost('5c14ba42f1a28c2998d0efb1');
        assert(res);
    })

    // it('should GET /', () => {
    //     return app.httpRequest()
    //         .get('/')
    //         .expect('hi, egg')
    //         .expect(200);
    // });
});
