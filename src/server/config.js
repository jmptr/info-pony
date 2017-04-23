require('dotenv').config();

const config = {};
const PRODUCTION = process.env.NODE_ENV === 'production';

config.express = {
  port: process.env.EXPRESS_PORT || 8081,
  ip: '127.0.0.1',
};

module.exports = config;
