const base_url_file = require('../config').base_url;
const Promise = require('bluebird');
const Config = require('../config');
const Bounce = require('bounce');
const Boom = require('boom');
const Joi = require('joi');
const Path = require('path');
const fs = require('fs');
var UUID = require('uuid/v1');

var seneca = require('seneca')()
    .use("basic")
    .use("entity")
    .client(Config.blog.port);

var act = Promise.promisify(seneca.act, {context: seneca});

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/post/{id}',
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
        path: '/api/v1/post',
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
    /*    {
            method: 'DELETE',
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
        },*/
    {
        method: 'DELETE',
        path: '/api/v1/post/{ids}',
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
        path: '/api/v1/post',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'blog',
                    cmd: 'add',
                    title: request.params.title,
                    content: request.params.content,
                    description: request.params.description
                })
            } catch (err) {
                throw Boom.badGateway();
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
    }
];