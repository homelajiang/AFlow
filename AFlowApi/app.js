'use strict';
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const routes = require('./routes/index');
const hapiAuthJWT = require('hapi-auth-jwt2');


const JWT = require('jsonwebtoken');  // used to sign our content
const jwtSecret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!

// const token = JWT.sign(people[1], jwtSecret); // synchronous

const validate = async function (decoded, request, h) {
    console.log(" - - - - - - - decoded token:");
    console.log(decoded);
    console.log(" - - - - - - - request info:");
    console.log(request.info);
    console.log(" - - - - - - - user agent:");
    console.log(request.headers['user-agent']);

    // do your checks to see if the person is valid
    /*    if (!people[decoded.id]) {
            return {isValid: false};
        }
        else {
            return {isValid: true};
        }*/
    return {isValid: true};
};

// Create a server with a host and port
const server = Hapi.server({
    // host: 'localhost',
    port: 8000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{log: '*', response: '*'}]
        }, {
            module: 'good-console'
        }, 'stdout'],
    }
};

// Start the server
const init = async () => {
    await server.register({
        plugin: require('good'),
        options,
    });
    await server.register(Inert);

/*    await server.register(hapiAuthJWT);
    server.auth.strategy('jwt', 'jwt', {
        key: jwtSecret,
        validate,
        verifyOptions: {
            ignoreExpiration: false,    // do not reject expired tokens
            // algorithms: ['HS256']    // specify your secure algorithm}
        }
    });
    server.auth.default('jwt');*/

    routes.forEach(function (r) {
        server.route(r);
    });

    await server.start();
    return server;
};

init()
    .then(server => {
        console.log('Server running at:', server.info.uri);
    }).catch(err => {
    console.error(err);
});
