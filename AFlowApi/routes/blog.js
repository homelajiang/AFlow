const base_url_file = require('../config/config').base_url;
const Promise = require('bluebird');
const Config = require('../config/config');
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
        path: '/post/{id}',
        handler: async (request, h) => {
            try {
                return await act({
                    role: "blog",
                    cmd: 'query',
                    id: request.params.id
                })
            } catch (err) {
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
        method:"POST",
        path:'/post'
    }
];