const http = require('http');

const bole = require('bole');
bole.output({level: 'debug', stream: process.stdout});
const log = bole('server');

const os = require('os');

const app = require('./app');
const config = require('./config');
const createSocketServer = require('./socket');

const server = http.createServer(app);

createSocketServer(server);

server.listen(config.express.port, (error) => {
  if (error) {
    log.error(`Unable to listen for connections ${error}`);
    process.exit(10);
  }
  log.info(`express is listening on http://${config.express.ip}:${config.express.port}`);

});

process.on('SIGINT', () => {
  process.exit(0);
});

module.exports = app;
