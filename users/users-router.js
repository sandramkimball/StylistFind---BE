const router = require('express').Router();
const Users = require('./users-model.js');
const db = require('../database/dbConfig.js');
const restricted = require('../auth/restricted-middleware.js');


//GET
router.get('/', (req, res) => {
  Users
  .find()
  .then(users => {
    res.json(users);
  })
  .catch (err => {
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
    .select('reviews.*', 'users.first_name', 'stylist.first_name')
    .from('reviews')
    .where('reviews.user_id', '=', `${id}`)
    .join('users', 'users.id', '=', 'reviews.user_id')
    .join('stylists', 'stylists.id', '=', 'reviews.stylist_id')
    .then(reviews => { res.status(200).json(reviews) })
    .catch(err=> {
      console.log(err);
      res.status(500).json({error: 'Error retrieving reviews.'})
    });
});

router.get('/:id/bookmarks', (req, res) => {
  id = req.params.id;
  return db
    .select('bookmarks.*', 'u.*', 's.first_name' )
    .from('bookmarks')
    .where('bookmarks.user_id', '=', `${id}`)
    .join('users as u', 'u.id', '=', 'bookmarks.user_id')
    .join('stylists as s', 's.id', '=', 'bookmarks.stylist_id')
    .then(bookmarks => { res.status(200).json(bookmarks) })
    .catch(err=> {
      console.log(err);
      res.status(500).json({error: 'Error retrieving bookmarks.'})
    });
});


//POST
router.post('/:id/reviews', restricted, (req, res) => {
  const newReview = req.body
  db('reviews').insert(newReview)
  .then(ids => {
    res.status(201).json({ message: 'Your review was added.' });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to add new review.' });
  });
});

const multer = require('multer')
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.filename + '-' + Date.now().toISOString())
  }
})
const upload = multer({storage: storage})


//PUT
router.put('/:id/upload', restricted, (req, res) => {
  const id = req.params.id;
  upload(req, res, (err) => {
    if (err){
      res.render('err', {msg: err})
    } 
    else {
      if (req.file == undefined){
        res.status(500).json({message: 'No file selected'})
      } else {
        db('users').where({id}).update(req.file)
        .then(ids => {
          res.status(200).json({
            msg: 'File uploaded',
            file: `uploads/${req.file.filename}`
          })
        })
      }
    }
  })
})

router.put('/:id', (req, res) => {
  const userData = req.body;
  const id = req.params.id;

  db('users').where({id}).update(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to edit user information.', err });
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


