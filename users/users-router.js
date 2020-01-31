const router = require('express').Router();
const Users = require('./users-model.js');
const db = require('../database/dbConfig.js');
const restricted = require('../auth/restricted-middleware.js');


//GET
router.get('/', restricted, (req, res) => {
  Users
  .find()
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    console.log(err);
    res.status(500).json({message: 'Request failed to get users.'});
  });
});

router.get('/:id', (req, res) => {
  id = req.params.id;
  Users
  .findById(id)
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to get user by id' });
  });
});

router.get('/:id/reviews', (req, res) => {
  id = req.params.id;
  return db
    .select('reviews.*', 'u.*', 's.first_name' )
    .from('reviews')
    .where('reviews.user_id', '=', `${id}`)
    .join('users as u', 'u.id', '=', 'reviews.user_id')
    .join('stylists as s', 's.id', '=', 'reviews.stylist_id')
    .then(reviews => { res.status(200).json(reviews) })
    .catch(err=> {
      console.log(err);
      res.status(500).json({error: 'Error retrieving reviews.'})
    });
});


//POST
router.post('/:id/reviews', restricted, (req, res) => {
  const newReview = req.body;

  db('reviews').insert(newReview)
  .then(ids => {
    res.status(201).json({ message: 'Your review was added.' });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to add new review.' });
  });
});


//PUT
router.put('/:id', restricted, (req, res) => {
  const userData = req.body;
  const id = req.params.id;

  db('users').where({id}).update(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to edit user information.' });
  });
});

router.put('/:id/reviews/:id', restricted, (req, res) => {
  const editedReview = req.body;
  const id = req.params.id;

  db('reviews').where({id}).update(editedReview)
  .then(ids => {
    res.status(201).json({ message: 'Your review was updated.' });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to edit review.' });
  });
});


//DELETE
router.delete('/:id', restricted, (req, res) => {
  const id = req.params.id;

  db('users').where({id}).delete()
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user.' });
  });
});

router.delete('/:id/reviews/:id', restricted, (req, res) => {
  const id = req.params.id;

  db('reviews').where({id}).delete()
  .then(ids => {
    res.status(201).json({ message: 'This review has been deleted.' });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete review.' });
  });
});




module.exports = router;


