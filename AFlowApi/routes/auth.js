const Config = require('../config');
const Promise = require('bluebird');
const Bounce = require('bounce');
const Boom = require('boom');
const Joi = require('joi');
const seneca = require('seneca')()
    .use('basic')
    .use('entity')
    .client(Config.auth.port);
var act = Promise.promisify(seneca.act, {context: seneca});


module.exports = [
    {
        method: 'POST',
        path: '/signIn',
        handler: async (request, h) => {
            try {
                return await act({
                    role: 'auth',
                    cmd: 'signIn',
                    username: request.params.username,
                    password: request.params.password
                });
            } catch (err) {
                // Bounce.ignore(err, 'system');
                throw Boom.unauthorized(err.details.message)
                // return h.response(data).code(201)
            }
        },
        config: {
            auth: false,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
/*                , failAction: async (request, h, err) => {
                    if (process.env.NODE_ENV === 'production') {
                        // In prod, log a limited error message and throw the default Bad Request error.
                        console.error('ValidationError:', err.message); // Better to use an actual logger here.
                        throw Boom.badRequest(`Invalid request payload input`);
                    } else {
                        // During development, log and respond with the full error.
                        console.error(err);
                        throw err;
                    }
                }*/
            }
        }
    },
    {
        method: 'POST',
        path: '/signUp',
        handler: async (request, h) => {

        }
    },
    {
        method: 'GET',
        path: '/profile/{id}',
        handler: async (request, h) => {

        }
    }
];