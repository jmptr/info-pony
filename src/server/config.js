require('dotenv').config();

const config = {};
const PRODUCTION = process.env.NODE_ENV === 'production';

config.express = {
  port: process.env.HTTP_PORT || 8081,
  ip: process.env.IP_ADDRESS || '127.0.0.1',
};

module.exports = config;
