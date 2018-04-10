'use strict';
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const  routes = require('./routes/index');
const plugins = require('./plugin_config');

// Create a server with a host and port
const server = Hapi.server({
    host: 'localhost',
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
async function start() {
    try {
        await server.register({
            plugin: require('good'),
            options,
        });
        // await server.
        await server.register(Inert);
        routes.forEach(function(r){
            server.route(r);
        });

        await server.start();
        console.log('Server running at:', server.info.uri);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

}

start();