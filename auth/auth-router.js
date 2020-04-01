const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const Stylists = require('../stylists/stylists-model.js');
const { validateUser } = require('./users-helper.js');
const { validateStylist } = require('./stylists-helper.js');


function getJwtToken(user){
  const payload = {
    email: user.email,
    subject: user.id, //sub in payload is what token is about
    usertype: 'user' || 'stylist' 
  };
  const secret = process.env.JWT_SECRET || 'Beautiful Hair';
  const options = {
    expiresIn: '2d'
  };

  return jwt.sign(payload, secret, options);
}

// LOGIN
router.post('/login/users', (req, res) => {
  let { email, password } = req.body;

  if(!email || !password){
    return res.status(401).json({message: 'Server Error: Missing email or password.'})
  }

  Users.findBy({ email })
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = getJwtToken(user);   
      res.status(200).json({message: `Welcome back, ${user.first_name}.`, token, user});
    } 
  })
  .catch(error => {
    res.status(500).json({ message: 'Could not find user.', error });
  });
})

router.post('/login/stylists', (req, res) => {
  let { email, password } = req.body;

  if(!email || !password){
    return res.status(401).json({message: 'Server Error: Missing email or password.'})
  }
    Stylist.findStylistBy({ email })
    .then(stylist => {
      if (stylist && bcrypt.compareSync(password, stylist.password)) {
        const token = getJwtToken(stylist);
        res.status(200).json({message: `Welcome back, ${stylist.first_name}.`, token, stylist});
      } else {
        res.status(401).json({ message: 'Email or password is incorrect.' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Could not find user.', error });
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
          res.status(201).json({message: 'User created', saved, user});
        })
        .catch(err => {
          res.status(500).json({message:'Unable to add new user:', err});
      });
    } 
    else {
      res.status(400).json({message:'One or more fields may be incorrect:', err: validateResults.errors})
    }
});

router.post('/register/stylist', (req, res) => {
  let stylist = req.body;
  const validateResults = validateStylist(stylist);

  if(validateResults.isSuccessful === true){
    const hash = bcrypt.hashSync(stylist.password, 10); // 2 ^ n
    stylist.password = hash;

    Stylists.addStylist(stylist)
      .then(saved => {
        res.status(201).json({message:'Stylist User created:', saved, stylist});
      })
      .catch(err => {
        res.status(500).json({message:'Unable to add new stylist:', err});
    });
  } 
  else {
    res.status(400).json({message:'Unable to validate.', err: validateResults.errors})
  }
});

router.post('/register/salon', (req, res) => {
  let salon = req.body;
    Salons.addSalon(salon)
    .then(saved => {
      res.status(201).json({message:'Salon profile created:', saved, salon});
    })
    .catch(err => {
      res.status(500).json({message:'Error. Unable to add new salon:', err});
  });
});


module.exports = router;
