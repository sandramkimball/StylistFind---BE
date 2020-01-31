const router = require('express').Router();
const Stylists = require('./stylists-model.js');
const db = require('../database/dbConfig.js');
const restricted = require('../auth/restricted-middleware.js');
const { validateStylists } = require('../stylists/stylists-helper.js');


//GET
router.get('/', (req, res) => {
  Stylists
  .find()
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    console.log(err);
    res.status(500).json({message: 'Request failed to get stylists.'});
  });
});

router.get('/:id', (req, res) => {
  id = req.params.id;
  Stylists
  .findById(id)
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find stylist with given id.' })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to get stylist by id' });
  });
});

router.get('/profile/:id', (req, res) => {
  id = req.params.id;
  return db
    .select('*')
    .from('stylists')
    .where('stylists.id', '=', `${id}`) 
    .first()
    .join('salons', 'stylists.salon_id', '=', 'salons.id' )
    .then(stylist => {res.status(200).json(stylist)})
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: `Could not find stylist with id ${id}.`})
    });
});

router.get('/:id/posts', (req, res) => {
  id = req.params.id;
  return db
    .select('*' )
    .from('posts')
    .where('posts.stylist_id', '=', `${id}`)
    .join('stylists', 'stylists.id', '=', `posts.stylist_id`)
    .then(posts => {res.status(200).json(posts)})
    .catch(err=> {
      console.log(err);
      res.status(500).json({error: 'Error retrieving posts.', err})
    });
});


//POST
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "cc" && password === "cc") {
    req.loggedIn = true;
    setTimeout(() => {
      res.status(200).json({
        payload: token
      });
    }, 1000);
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect." });
  }
});

router.post('/:id/posts', restricted, (req, res) => {
  const postData = req.body;

  db('posts').insert(postData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to add new posts.' });
  });
});


//PUT
router.put('/:id', restricted, (req, res) => {
  const userData = req.body;
  const id = req.params.id;

  db('stylists').where({id}).update(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to edit user information.' });
  });
});

router.put('/:id/posts/:id', restricted, (req, res) => {
  const editedPost = req.body;
  const id = req.params.id;

  db('posts').where({id}).update(editedPost)
  .then(ids => {
    res.status(201).json({ message: 'Your post was updated.' });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to edit post.' });
  });
});


//DELETE
router.delete('/:id', restricted, (req, res) => {
  const id = req.params.id;

  db('stylists').where({id}).delete()
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user.' });
  });
});

router.delete('/:id/posts/:id', restricted, (req, res) => {
  const id = req.params.id;

  db('posts').where({id}).delete()
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete post.' });
  });
});

// function checkRole(role){
//   return function(req, res, next){
//     if(role === req.decodedJwt.role){
//       next()
//     } else {
//       res.status(403).json({message: 'Access denied'})
//     }
//   }
// }

//LOGIN SIGNUP

router.post('/register', (req, res) => {
  let user = req.body;
  const validateResults = validateUser(user);

  if(validateResults.isSuccessful === true){
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Stylists.add(user)
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

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Stylists.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.body.username = user.username;

        const token = getJwtToken(user.username);

        res.status(200).json({
          message: `Welcome back, ${user.username}.`,
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
    role: 'user' 
  };
  const secret = process.env.JWT_SECRET || 'Beautiful Hair';
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;


