'use strict';

// The Apache ProxyPass should be configured to redirect /bba/stats to localhost:port
// <VirtualHost ...>
//     ...
//     ProxyPass /bba/stats http://localhost:8080/
// </VirtualHost>

const fs = require('fs');
const http = require('http');

const port = 8080;

const server = http.createServer((req, res) => {
    if( req.method === 'POST' ) {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            console.log( 'Received data from: ' + req.connection.remoteAddress + body );
        });
    }
    res.end();
});

process.on('SIGINT', function() {
    console.log( 'Interrupting process' );
    process.exit();
});

server.listen({
    host: 'localhost',
    port: port
}, () => console.log( 'Statistics server running on localhost:' + port ) );
