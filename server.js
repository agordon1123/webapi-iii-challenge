const express = require('express');
const userRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

const server = express();
server.use(express.json());
server.use(logger);

server.use('/users', userRouter);
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`);
  next();
};

module.exports = server;
