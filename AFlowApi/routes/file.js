const base_url = require('../services/config').image_hosting.base_url;
const Promise = require('bluebird');
const Config = require('../services/config');
const Bounce = require('bounce');
const Boom = require('boom');
const Joi = require('joi');
const Path = require('path');
const fs = require('fs');
const async = require('async');
const UUID = require('uuid/v1');
const DatetimeUtil = require('../utils/datetime_util');
const IAMGE_ROOT = Path.resolve(__dirname, '../public');

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
        path: '/upload/{fileName*2}',
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
        path: '/file/{id}',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'file',
                    cmd: 'query',
                    id: request.params.id
                });
            } catch (err) {
                // Bounce.ignore(err, { name: 'ValidationError' });       // rethrow any non validation errors, or
                if (!Boom.isBoom(Boom))
                    err = Boom.badRequest();
                return err;
            }
        }
    },
    {
        method: 'POST',
        path: '/file/{id}',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'file',
                    cmd: 'update',
                    id: request.params.id,
                    file: request.body
                });
            } catch (err) {
                // Bounce.ignore(err, { name: 'ValidationError' });       // rethrow any non validation errors, or
                if (!Boom.isBoom(Boom))
                    err = Boom.badRequest();
                return err;
            }
        }
    },
    {
        method: 'GET',
        path: '/file',
        handler: async function (request, h) {
            try {
                return await act({
                    role: 'file',
                    cmd: 'list',
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
        path: '/file',
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 5 * 1024 * 1024
            }
        },
        handler: async (request, h) => {
            const fileName = Path.basename(request.payload.file.hapi.filename);
            const fileFormat = (fileName).split(".");

            const datetimeDir = DatetimeUtil.datetimePathFormat(Date.now());

            const targetDir = Path.join(IAMGE_ROOT, "uploads/" + datetimeDir + "/");

            if (!fs.existsSync(targetDir))
                fs.mkdirSync(targetDir);

            const targetName = UUID() + "." + fileFormat[fileFormat.length - 1];
            const targetPath = Path.join(targetDir, targetName);
            const encode = request.payload.file._encoding;
            fs.writeFileSync(targetPath, request.payload.file._data, {encoding: encode ? encode : 'utf8'});
            return await
                act({
                    role: 'file',
                    cmd: 'add',
                    file: {
                        name: fileName,
                        path: datetimeDir + "/" + targetName,
                        mimetype: request.payload.file.hapi.headers["content-type"]
                    },
                    host: base_url
                });

        }
    },
    {
        method: 'DELETE',
        path: '/file/{id}',
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
