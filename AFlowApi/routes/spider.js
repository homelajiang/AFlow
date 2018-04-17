const Config = require('../config');
const Promise = require('bluebird');
const Bounce = require('bounce');
const Boom = require('boom');
const Joi = require('joi');
const seneca = require('seneca')()
    .use('basic')
    .use('entity')
    .client(Config.spider.port);
var act = Promise.promisify(seneca.act, {context: seneca});


module.exports = [
    {
        method: 'GET',
        path: '/spider/tasks',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'spider',
                    cmd: 'list'
                });
            } catch (e) {
                throw Boom.badRequest("获取任务列表失败");
            }
        },
        config: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/spider/start',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'spider',
                    cmd: 'start'
                });
            } catch (e) {
                throw Boom.badRequest("操作失败");
            }
        },
        config: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/spider/stop',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'spider',
                    cmd: 'stop'
                });
            } catch (e) {
                throw Boom.badRequest("操作失败");
            }
        },
        config: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/spider/update/{id}',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'spider',
                    cmd: 'update',
                    taskId: request.params.id
                });
            } catch (e) {
                throw Boom.badRequest("操作失败");
            }
        },
        config: {
            auth: false
        }
    }
];
