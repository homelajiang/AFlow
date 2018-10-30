'use strict';
const Boom = require('boom');
const internals = {};

exports.plugin = {
    name: 'hapi-auth-session',
    version: '1.0.0',
    register: async function (server, options) {
        server.auth.scheme('session', internals.implementation);
    }
};

internals.implementation = function (server, options) {

    return {
        authenticate: async function (request, h) {
            const user = request.yar.get('user');
            if (user && user.id) {
                return h.authenticated({credentials: user, artifacts: user});
            } else {
                return h.unauthenticated(Boom.unauthorized());
            }
        }
    }
};
