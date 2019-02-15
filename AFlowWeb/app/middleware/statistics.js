'use strict';
const requestIp = require('request-ip');

// 记录访问记录
module.exports = options => {
    return async (ctx, next) => {
        // const IP = requestIp.getClientIp(ctx.request);
        if (ctx.request.method === 'GET') {
            // todo 添加用户身份
            const record = {
                ip: ctx.request.ip,
                language: ctx.request.headers['accept-language'],
                browser: ctx.request.headers['user-agent'],
                path: ctx.request.path
            };

            const matches = ctx.request.path.match("^/post/\\w{24}$");
            if (matches && matches.length === 1) {
                record.post = ctx.request.path.slice(6)
            }

            ctx.service.blog.recordView(record);
        }

        await next();
    }
};
