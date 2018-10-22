const base_url = require('../services/config').image_hosting.base_url;
const Promise = require('bluebird');
const Config = require('../services/config');
const Bounce = require('bounce');
const Boom = require('boom');
const Joi = require('joi');
const Path = require('path');
const fs = require('fs');
const UUID = require('uuid/v1');

const seneca = require('seneca')()
    .use("basic")
    .use("entity")
    .client(Config.image_hosting.port);
// Promisify the .act() method; to learn more about this technique see:
// http://bluebirdjs.com/docs/features.html#promisification-on-steroids
const act = Promise.promisify(seneca.act, {context: seneca});


module.exports = [
    {
        method: 'GET',
        path: '/api/v1/uploads/{fileName}',
        handler: {
            directory: {
                path: 'uploads/',
                redirectToSlash: true,
                index: true,
            }
        }
    },
    {
        method: 'GET',
        path: '/api/v1/file/{id}',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'file',
                    cmd: 'query',
                    host: base_url,
                    id: request.params.id
                });
            } catch (err) {
                // Bounce.ignore(err, { name: 'ValidationError' });       // rethrow any non validation errors, or
                throw Boom.notFound();
            }
        }
    },
    {
        method: 'GET',
        path: '/api/v1/file',
        handler: async function (request, h) {
            try {
                return await act({
                    role: 'file',
                    cmd: 'list',
                    host: base_url,
                    pageSize: request.query.pageSize,
                    pageNum: request.query.pageNum
                });
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
    {
        method: 'POST',
        path: '/api/v1/file',
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 5 * 1024 * 1024
            }
        },
        handler: async function (request, h) {
            const fileName = Path.basename(request.payload.file.hapi.filename);
            const fileFormat = (fileName).split(".");
            const targetDir = Path.resolve(__dirname, '../public');
            const targetName = "uploads/" + Date.now() + '-' + UUID() + "." + fileFormat[fileFormat.length - 1];
            const targetPath = Path.join(targetDir, targetName);
            const encode = request.payload.file._encoding;
            fs.writeFileSync(targetPath, request.payload.file._data, {encoding: encode ? encode : 'utf8'});
            return await
                act({
                    role: 'file',
                    cmd: 'add',
                    host: base_url,
                    name: fileName,
                    path: targetName,
                    mimetype: request.payload.file.hapi.headers["content-type"]
                });
        }
    },
    {
        method: 'DELETE',
        path: '/api/v1/file/{id}',
        handler: async function (request, h) {
            try {
                return await act({role: "file", cmd: "remove", id: request.params.id});
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
    }
]
;
