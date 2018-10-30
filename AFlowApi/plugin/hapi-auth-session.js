'use strict';

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

        }
    }
};
