const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const stylistsRouter = require('../stylists/stylists-router.js');
const searchRouter = require('../search/search-router.js');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
var whitelist = ['http://localhost:3000/', 'https://stylistfind.now.sh/']
var corsOptions = {
  origin: whitelist
}

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/stylists', stylistsRouter);
server.use('/api/search', searchRouter);

server.get('/', cors(corsOptions), (req, res) => {
  res.send("Let\'s find you a stylist.");
});

module.exports = server;