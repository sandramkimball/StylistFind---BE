const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const stylistsRouter = require('../stylists/stylists-router.js');
const searchRouter = require('../search/search-router.js');

//Init App
const server = express();

//Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

//Public Folder
server.use(express.static('./public'));

//Connect to Routers
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/stylists', stylistsRouter);
server.use('/api/search', searchRouter);
server.get('/', cors(corsOptions), (req, res) => {
  res.send("Let\'s find you a stylist.");
});

module.exports = server;