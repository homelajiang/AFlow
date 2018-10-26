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
        method: 'POST',
        path: '/tag',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: "tag",
                    cmd: 'add',
                    tag: request.payload
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
            }
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    alias: Joi.string(),
                    image: Joi.string(),
                    description: Joi.string()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/tag/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: "tag",
                    cmd: 'remove',
                    id: request.params.id
                });
                return Util.ifErrorBoom(res, 204, h);
            } catch (err) {
                return Util.errorToBoom(err);
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
        method: 'POST',
        path: '/tag/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: "tag",
                    cmd: 'update',
                    id: request.params.id,
                    tag: request.payload
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
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
        method: 'GET',
        path: '/tag/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: "tag",
                    cmd: 'query',
                    id: request.params.id
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
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
        path: '/tag',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: 'tag',
                    cmd: 'list',
                    pageSize: request.query.pageSize,
                    pageNum: request.query.pageNum,
                    key: request.query.key
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
            }
        },
        config: {
            validate: {
                query: {
                    pageSize: Joi.number().default(10),
                    pageNum: Joi.number().default(1),
                    key: Joi.string()
                }
            }
        }
    },
    // ==========================================================================
    {
        method: 'POST',
        path: '/categories',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: "categories",
                    cmd: 'add',
                    categories: request.payload
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
            }
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    alias: Joi.string(),
                    image: Joi.string(),
                    description: Joi.string()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/categories/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: "categories",
                    cmd: 'remove',
                    id: request.params.id
                });
                return Util.ifErrorBoom(res, 204, h);
            } catch (err) {
                return Util.errorToBoom(err);
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
        method: 'POST',
        path: '/categories/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: "categories",
                    cmd: 'update',
                    id: request.params.id,
                    categories: request.payload
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
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
        method: 'GET',
        path: '/categories/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: "categories",
                    cmd: 'query',
                    id: request.params.id
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
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
        path: '/categories',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: 'categories',
                    cmd: 'list',
                    pageSize: request.query.pageSize,
                    pageNum: request.query.pageNum,
                    key: request.query.key
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
            }
        },
        config: {
            validate: {
                query: {
                    pageSize: Joi.number().default(10),
                    pageNum: Joi.number().default(1),
                    key: Joi.string()
                }
            }
        }
    },
    //===========================================================================
    {
        method: "POST",
        path: '/post',
        handler: async (request, h) => {
            //todo 添加creator
            try {
                const res = await act({
                    role: 'post',
                    cmd: 'add',
                    post: request.payload
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
            }
        },
        config: {
            validate: {
                payload: {
                    title: Joi.string().required(),
                    content: Joi.string().default(""),
                    description: Joi.string().default(""),
                    open: Joi.number().default(0),
                    password: Joi.string(),
                    open_comment: Joi.boolean(),
                    need_review: Joi.boolean(),
                    tags: Joi.array(),
                    categories: Joi.string()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/post/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: 'post',
                    cmd: 'remove',
                    id: request.params.id
                });
                return Util.ifErrorBoom(res, 204, h);
            } catch (err) {
                return Util.errorToBoom(err);
            }
        },
        config: {
            validate: {
                params: {
                    id: Joi.array().required()
                }
            }
        }
    },
    {
        method: "POST",
        path: '/post/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: 'post',
                    cmd: 'update',
                    id: request.params.id,
                    post: request.payload
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
            }
        },
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: {
                    title: Joi.string(),
                    content: Joi.string(),
                    description: Joi.string(),
                    open: Joi.number(),
                    status: Joi.number(),
                    password: Joi.string(),
                    open_comment: Joi.boolean(),
                    need_review: Joi.boolean(),
                    tags: Joi.array(),
                    categories: Joi.string()
                }
            }
        }
    },
    {
        method: "GET",
        path: '/post/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: 'post',
                    cmd: 'query'
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
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
                const res = await act({
                    role: 'post',
                    cmd: 'list',
                    pageSize: request.query.pageSize,
                    pageNum: request.query.pageNum,
                    key: request.query.key
                });
                return Util.ifErrorBoom(res);
            } catch (err) {
                return Util.errorToBoom(err);
            }
        },
        config: {
            validate: {
                query: {
                    pageSize: Joi.number().default(10),
                    pageNum: Joi.number().default(1),
                    key: Joi.string()
                }
            }
        }
    }
];
