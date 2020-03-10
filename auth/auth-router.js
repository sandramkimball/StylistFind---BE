const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const Stylists = require('../stylists/stylists-model.js');
const { validateUser } = require('./users-helper.js');
const { validateStylists } = require('./stylists-helper.js');


function getJwtToken(user){
  const payload = {
    username: user.username,
    subject: user.id, //sub in payload is what token is about
    role: 'user' || 'stylist' 
  };
  const secret = process.env.JWT_SECRET || 'Beautiful Hair';
  const options = {
    expiresIn: '2d'
  };

  return jwt.sign(payload, secret, options);
}

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  // let istStylist = req.decodedJwt.isStylist

  if(!username || !password){
    return res.status(401).send({message: 'Missing username or password.'})
  }
  Users.findBy({ username })
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = getJwtToken(user);
      req.body.username = user.username;      
      res.status(200).json({message: `Welcome back, ${user.username}.`, token});

    } else {
      Stylist.findStylistBy({ username })
      .then(stylist => {
        if (stylist && bcrypt.compareSync(password, stylist.password)) {
          const token = getJwtToken(stylist);
          req.body.username = user.username;
          res.status(200).json({message: `Welcome back, ${stylist.username}.`, token});
        } else {
          res.status(401).json({ message: 'Username or password is incorrect.' });
        }
      })
    }
  })

  .catch(error => {
    res.status(500).send({ message: 'Could not find user.', error });
  });
});


// REGISTER
router.post('/register/user', (req, res) => {
    let user = req.body;
    const validateResults = validateUser(user);
  
    if(validateResults.isSuccessful === true){
      const hash = bcrypt.hashSync(user.password, 8); 
      user.password = hash;
  
      Users.add(user)
        .then(saved => {
          res.status(201).json({message:'User created:', saved});
        })
        .catch(error => {
          res.status(500).json({message:'Error. Unable to add new user:', error});
      });
    } else {
      res.status(400).json({message:'Error. One or more fields may be incorrect:', err: validateResults.errors})
    }
});

router.post('/register/stylist', (req, res) => {
  let stylist = req.body;
  const validateResults = validateStylists(stylist);

  if(validateResults.isSuccessful === true){
    const hash = bcrypt.hashSync(stylist.password, 10); // 2 ^ n
    stylist.password = hash;

    Stylists.addStylist(stylist)
      .then(saved => {
        req.body.username = saved.username;
        req.body.email = saved.email;
        req.body.name = saved.name;
        req.body.usertype = saved.user;
        res.status(201).json({message:'Stylist User created:', saved});
      })
      .catch(error => {
        res.status(500).json({message:'Error. Unable to add new user:', error});
    });
  } else {
    res.status(400).json({message:'Error:', err: validateResults.errors})
  }
});

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