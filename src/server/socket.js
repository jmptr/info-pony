const {
  MEMORY_STAT_RECEIVED,
  MEMORY_ALERT_CREATED,
  MEMORY_ALERT_UPDATED,
} = require('../shared/action-types');

const WebSocketServer = require('ws').Server;
const agent = require('./agent');

const createSocketServer = (server) => {
  const wss = new WebSocketServer({ server, clientTracking: true });

  agent.start();

  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ type: MEMORY_STAT_RECEIVED, payload: agent.getCache() }));
    ws.send(JSON.stringify({ type: MEMORY_ALERT_CREATED, payload: agent.alerts }));

    agent.on('stat_received', (data) => {
      data = Object.assign({ type: MEMORY_STAT_RECEIVED }, { payload: data });
      return ws.readyState === 1 && ws.send(JSON.stringify(data));
    });

    agent.on('alert_created', (data) => {
      data = Object.assign({ type: MEMORY_ALERT_CREATED }, { payload: data });
      return ws.readyState === 1 && ws.send(JSON.stringify(data));
    });

    agent.on('alert_closed', (data) => {
      data = Object.assign({ type: MEMORY_ALERT_UPDATED }, { payload: data });
      return ws.readyState === 1 && ws.send(JSON.stringify(data));
    });
  });

  return wss;
}

module.exports = createSocketServer;
