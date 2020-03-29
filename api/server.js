const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const multer = require('multer')
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldename + '-' + Date.now() + Path2D.extname(file.originalname))
  }
})
const upload = multer({storage: storage})

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

server.get('/', cors(), upload.single(), (req, res) => {
  res.send("Let\'s find you a stylist.");
});

module.exports = server;