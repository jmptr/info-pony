const {
  CPU_STAT_RECEIVED,
  MEMORY_STAT_RECEIVED,
} = require('../shared/action-types');

const WebSocketServer = require('ws').Server;
const agent = require('./agent');

const createSocketServer = (server) => {
  const wss = new WebSocketServer({ server, clientTracking: true });

  agent.start();

  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ type: MEMORY_STAT_RECEIVED, payload: agent.getCache() }));

    agent.on('stat_received', (data) => {
      data = Object.assign({ type: MEMORY_STAT_RECEIVED }, { payload: data });
      return ws.readyState === 1 && ws.send(JSON.stringify(data));
    });
  });

  return wss;
}

module.exports = createSocketServer;
