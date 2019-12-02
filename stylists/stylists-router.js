const router = require('express').Router();
const Stylists = require('./stylists-model.js');
const db = require('../database/dbConfig.js');
const restricted = require('../auth/restricted-middleware.js');


//GET
router.get('/:id', restricted, (req, res) => {
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

router.get('/profile/:id', (req, res) => {
  id = req.params.id;
  return db
    .select('*')
    .from('stylists')
    .where('stylists.id', '=', `${id}`) 
    .join('salons', 'stylists.salon_id', '=', 'salons.id' )
    .then(stylist => {
      if (stylist) {res.json(stylist);
      } else {res.status(404).json({ message: `Could not find stylist with id ${id}.`})}
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.get('/profile/:id/posts', (req, res) => {
  id = req.params.id;
  return db
    .select('*' )
    .from('posts')
    .where('posts.stylist_id', '=', `${id}`)
    .join('stylists', 'stylists.id', '=', `${id}`)
    .then(posts => {res.status(200).json(posts)})
    .catch(err=> {
      console.log(err);
      res.status(500).json({error: 'Error retrieving posts.'})
    });
});



//POST
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



module.exports = router;


