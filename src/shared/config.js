const config = {};

config.express = {
  port: process.env.HTTP_PORT || 8081,
  ip: process.env.IP_ADDRESS || '127.0.0.1',
};

config.websockets = {
  address: process.env.SOCKET_ADDRESS || 'ws://localhost:8081',
};

module.exports = config;
