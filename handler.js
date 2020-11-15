const awsServerlessExpress = require('aws-serverless-express');

const app = require('./src/server');

const server = awsServerlessExpress.createServer(app);

module.exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
}