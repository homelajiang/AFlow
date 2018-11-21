const Promise = require('bluebird');
const Config = require('../../services/config');
const Bounce = require('bounce');
const Boom = require('boom');
const Joi = require('joi');
const Path = require('path');
const fs = require('fs');
const UUID = require('uuid/v1');
const Util = require('../../libs/util');
const UtilApi = require('../../config_api');


const seneca = require('seneca')()
    .use("basic")
    .use("entity")
    .client(Config.blog.port);

const act = Promise.promisify(seneca.act, {context: seneca});

module.exports = [
    {
        method: 'POST',
        path: UtilApi.api_v1 + '/tag',
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
                    alias: Joi.string().allow(null),
                    image: Joi.string().allow(null),
                    description: Joi.string().allow(null)
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: UtilApi.api_v1 + '/tag/{id}',
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
        path: UtilApi.api_v1 + '/tag/{id}',
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
        path: UtilApi.api_v1 + '/tag/{id}',
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
        path: UtilApi.api_v1 + '/tag',
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
        path: UtilApi.api_v1 + '/categories',
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
                    alias: Joi.string().allow(null),
                    image: Joi.string().allow(null),
                    description: Joi.string().allow(null)
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: UtilApi.api_v1 + '/categories/{id}',
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
        path: UtilApi.api_v1 + '/categories/{id}',
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
        path: UtilApi.api_v1 + '/categories/{id}',
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
        path: UtilApi.api_v1 + '/categories',
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
        path: UtilApi.api_v1 + '/post',
        handler: async (request, h) => {
            //todo 添加creator
            try {
                request.payload.creator = "5bceea05a7ebdd1938a6fa9d";
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
                    content: Joi.string(),
                    description: Joi.string(),
                    open: Joi.number(),
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
        path: UtilApi.api_v1 + '/post/{id}',
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
                    id: Joi.string().required()
                }
            }
        }
    },
    {
        method: "POST",
        path: UtilApi.api_v1 + '/post/{id}',
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
        path: UtilApi.api_v1 + '/post/{id}',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: 'post',
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
        path: UtilApi.api_v1 + '/post',
        handler: async (request, h) => {
            try {
                const res = await act({
                    role: 'post',
                    cmd: 'list',
                    pageSize: request.query.pageSize,
                    pageNum: request.query.pageNum,
                    key: request.query.key,
                    type:request.query.type
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
                    key: Joi.string(),
                    type: Joi.number().integer().min(-1).max(1)
                }
            }
        }
    },
//===========================================================================
    {
        method: "POST",
        path:
            UtilApi.api_v1 + '/post/{id}/comment',
        handler:
            async (request, h) => {
                //todo 添加creator
                try {
                    request.payload.creator = "5bceea05a7ebdd1938a6fa9d";
                    const res = await act({
                        role: 'comment',
                        cmd: 'add',
                        id: request.params.id,
                        comment: request.payload
                    });
                    return Util.ifErrorBoom(res);
                } catch (err) {
                    return Util.errorToBoom(err);
                }
            },
        config:
            {
                validate: {
                    payload: {
                        content: Joi.string().required()
                    }
                }
            }
    }
    ,
    {
        method: 'DELETE',
        path:
            UtilApi.api_v1 + '/comment/{id}',
        handler:
            async (request, h) => {
                try {
                    const res = await act({
                        role: 'comment',
                        cmd: 'remove',
                        id: request.params.id
                    });
                    return Util.ifErrorBoom(res, 204, h);
                } catch (err) {
                    return Util.errorToBoom(err);
                }
            },
        config:
            {
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            }
    }
    ,
    {//审核
        method: "POST",
        path:
            UtilApi.api_v1 + '/comment/{id}/{status}',
        handler:
            async (request, h) => {
                try {
                    const res = await act({
                        role: 'comment',
                        cmd: 'update',
                        id: request.params.id,
                        comment: {
                            status: request.params.status
                        }
                    });
                    return Util.ifErrorBoom(res);
                } catch (err) {
                    return Util.errorToBoom(err);
                }
            },
        config:
            {
                validate: {
                    params: {
                        id: Joi.string().required(),
                        status:
                            Joi.number().integer().min(-1).max(1).required()
                    }
                }
            }
    }
    ,
    {
        method: "POST",
        path:
            UtilApi.api_v1 + '/comment/{id}',
        handler:
            async (request, h) => {
                try {
                    const res = await act({
                        role: 'comment',
                        cmd: 'update',
                        id: request.params.id,
                        comment: request.payload
                    });
                    return Util.ifErrorBoom(res);
                } catch (err) {
                    return Util.errorToBoom(err);
                }
            },
        config:
            {
                validate: {
                    payload: {
                        content: Joi.string().required(),
                    }
                }
            }
    }
    ,
    {
        method: "GET",
        path:
            UtilApi.api_v1 + '/comment/{id}',
        handler:
            async (request, h) => {
                try {
                    const res = await act({
                        role: 'comment',
                        cmd: 'query',
                        id: request.params.id
                    });
                    return Util.ifErrorBoom(res);
                } catch (err) {
                    return Util.errorToBoom(err);
                }
            },
        config:
            {
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            }
    }
    ,
    {
        method: "GET",
        path:
            UtilApi.api_v1 + '/comment',
        handler:
            async (request, h) => {
                try {
                    const res = await act({
                        role: 'comment',
                        cmd: 'list',
                        pageSize: request.query.pageSize,
                        pageNum: request.query.pageNum,
                        id: request.query.post_id,
                        key: request.query.key,
                    });
                    return Util.ifErrorBoom(res);
                } catch (err) {
                    return Util.errorToBoom(err);
                }
            },
        config:
            {
                validate: {
                    query: {
                        pageSize: Joi.number().default(10),
                        pageNum:
                            Joi.number().default(1),
                        key:
                            Joi.string(),
                        post_id:
                            Joi.string()
                    }
                }
            }
    }
    ,
]
;
