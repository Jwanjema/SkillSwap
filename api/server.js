// api/server.js

const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '..', 'src', 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route for POST timestamps (optional)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = new Date().toISOString();
  }
  next();
});

server.use(router);

module.exports = server;
