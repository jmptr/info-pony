const os = require('os');
const bole = require('bole');
const log = bole('server');

const WebSocketServer = require('ws').Server;
const Agent = require('./agent');

const createSocketServer = (server) => {
  const wss = new WebSocketServer({ server, clientTracking: true });
  const agent = new Agent();

  agent.addEvent('cpus', () => {
    const captured = new Date();
    const stat = os.cpus();

    return {
      captured,
      stat,
    };
  });

  agent.start();

  wss.on('connection', (ws) => {
    log.info('connected');
    ws.send(JSON.stringify(agent.cache['cpus']));

    ws.on('message', (message) => {
      log.info('message', message);
    });

    agent.on('cpus', (data) => {
      return ws.readyState === 1 && ws.send(JSON.stringify(data));
    });

    ws.on('close', (connection) => {
      log.info('close');
    });
  });

  return wss;
}

module.exports = createSocketServer;
