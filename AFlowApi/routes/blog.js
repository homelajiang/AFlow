const Promise = require('bluebird');
const Config = require('../services/config');
const Bounce = require('bounce');
const Boom = require('boom');
const Joi = require('joi');
const Path = require('path');
const fs = require('fs');
const UUID = require('uuid/v1');
const Util = require('../libs/util');

const seneca = require('seneca')()
    .use("basic")
    .use("entity")
    .client(Config.blog.port);

const act = Promise.promisify(seneca.act, {context: seneca});

module.exports = [
    {
        method: 'GET',
        path: '/post/{id}',
        handler: async (request, h) => {
            try {
                return await act({
                    role: "blog",
                    cmd: 'query',
                    id: request.params.id
                })
            } catch (err) {
                Bounce.rethrow(err, {name: 'ValidationError'});
                throw Boom.notFound();
            }
        },
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    },
    {
        method: "GET",
        path: '/post',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'blog',
                    cmd: 'list',
                    pageSize: request.query.pageSize,
                    pageNum: request.query.pageNum
                })
            } catch (err) {
                Bounce.rethrow(err, {name: 'ValidationError'});       // rethrow any non validation errors, or
                throw Boom.badGateway();
            }
        },
        config: {
            validate: {
                query: {
                    pageSize: Joi.number().default(10),
                    pageNum: Joi.number().default(1)
                }
            }
        }
    },
    {//标记删除
        method: 'POST',
        path: '/post/{id}',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'blog',
                    cmd: 'remove',
                    id: request.params.id
                })
            } catch (err) {
                Bounce.rethrow(err, {name: 'ValidationError'});       // rethrow any non validation errors, or
                throw Boom.badGateway();
            }
        },
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/post/{ids}',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'blog',
                    cmd: 'remove',
                    ids: request.params.ids
                })
            } catch (err) {
                Bounce.rethrow(err, {name: 'ValidationError'});       // rethrow any non validation errors, or
                throw Boom.badGateway();
            }
        },
        config: {
            validate: {
                params: {
                    ids: Joi.array().required()
                }
            }
        }
    },
    {
        method: "POST",
        path: '/post',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: 'blog',
                    cmd: 'add',
                    blog: request.payload
                });
                if (res.error)
                    return Util.generateBoom(res);
                return res;
            } catch (err) {
                if (!Boom.isBoom(err))
                    err = Boom.badRequest();
                return err;
            }
        },
        config: {
            validate: {
                /*                params: {
                                    title: Joi.string().required(),
                                    content: Joi.string().required(),
                                    description: Joi.string().default("")
                                }*/
            }
        }
    },
    {
        method: "POST",
        path: '/post',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: 'post',
                    cmd: 'add',
                    post: request.payload
                });
                if (res.error)
                    return Util.generateBoom(res);
                return res;
            } catch (err) {
                if (!Boom.isBoom(err))
                    err = Boom.badRequest();
                return err;
            }
        },
        config: {
            validate: {
                payload: {
                    title: Joi.string().required(),
                    content: Joi.string().required(),
                    description: Joi.string().default("")
                }
            }
        }
    }
];
