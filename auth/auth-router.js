const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const { validateUser } = require('../users/users-helper.js');
const { validateStylists } = require('../stylists/stylists-helper.js');


//USER
router.post('/register/user', (req, res) => {
    let user = req.body;
    const validateResults = validateUser(user);
  
    if(validateResults.isSuccessful === true){
      const hash = bcrypt.hashSync(user.password, 8); 
      user.password = hash;
  
      Users.add(user)
        .then(saved => {
          req.body.username = saved.username;
          res.status(201).json(saved);
        })
        .catch(error => {
          res.status(500).json(error);
      });
    } else {
      res.status(400).json({message:'Error:', err: validateResults.errors})
    }
  });

router.post('/login/user', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username);
        req.body.username = user.username;

        res.status(200).json({
          message: `Welcome back, ${user.username}.`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Username or password is incorrect.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


//STYLIST
router.post('/register/stylist', (req, res) => {
  let stylist = req.body;
  const validateResults = validateStylists(stylist);

  if(validateResults.isSuccessful === true){
    const hash = bcrypt.hashSync(stylist.password, 10); // 2 ^ n
    stylist.password = hash;

    Stylists.add(stylist)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
    });
  } else {
    res.status(400).json({message:'Error:', err: validateResults.errors})
  }
});

router.post('/login/stylist', (req, res) => {
  let { username, password } = req.body;

  Stylists.findBy({ username })
    .first()
    .then(stylist => {
      if (user && bcrypt.compareSync(password, stylist.password)) {
        req.body.username = stylist.username;

        const token = getJwtToken(stylist.username);

        res.status(200).json({
          message: `Welcome back, ${stylist.username}.`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


function getJwtToken(username){
  const payload = {
    username,
    role: 'user' || 'stylist' 
  };
  const secret = process.env.JWT_SECRET || 'Beautiful Hair';
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;

// function checkRole(role){
//   return function(req, res, next){
//     if(role === req.decodedJwt.role){
//       next()
//     } else {
//       res.status(403).json({message: 'Access denied'})
//     }
//   }
// }
