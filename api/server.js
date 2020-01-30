const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cron = require('node-cron');
// const fs = require('fs');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const stylistsRouter = require('../stylists/stylists-router.js');
const searchRouter = require('../search/search-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/stylists', stylistsRouter);
server.use('/api/search', searchRouter);

//CRON SCHEDULER
cron.schedule('0 4 * * *', function(){
  console.log('runs at 4 o\'clock, or every 4hrs?')
  if(shell.exec('dir').code !== 0){}
})

server.get('/', (req, res) => {
  res.send("Let\'s find you a stylist.");
});

module.exports = server;