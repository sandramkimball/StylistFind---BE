const router = require('express').Router();
const multer = require('multer')
const Users = require('./users-model.js');
const db = require('../database/dbConfig.js');
const path = require('path');
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

router.get('/:id', restricted, (req, res) => {
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

router.get('/:id/reviews', restricted, (req, res) => {
  id = req.params.id;
  return db
    .select(
      'reviews.*', 
      'users.first_name as user_first', 
      'users.profile_img', 
      'stylists.first_name as stylist_first', 
      'stylists.last_name as stylist_last',
    )
    .from('reviews')
    .where('reviews.user_id', '=', `${id}`)
    .join('users', 'users.id', '=', 'reviews.user_id')
    .join('stylists', 'stylists.id', '=', 'reviews.stylist_id')
    .then(reviews => { res.status(200).json(reviews) })
    .catch(err=> {res.status(500).json({error: 'Request failed to retrieve reviews.', err}) })
});

router.get('/:id/bookmarks', restricted, (req, res) => {
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
      res.status(500).json({error: 'Error retrieving bookmarks.', error})
    });
});


//POST
router.post('/:id/reviews', restricted, (req, res) => {
  const newReview = req.body
  db('reviews').insert(newReview)
  .then(ids => {
    res.status(201).json({ message: 'Review successfully added.' });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to add new review.' });
  });
});

router.post('/:id/bookmarks', restricted, (req, res) => {
  const newBookmark = req.body
  db('bookmarks').insert(newBookmark)
  .then(ids => {
    res.status(201).json({ message: 'Bookmark successfully added.' });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to add new bookmark.', err });
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
    res.status(204).json({ message: 'This review has been deleted.', res });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete review.', err });
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
    res.status(500).json({ message: 'Failed to edit user information.', err });
  });
});

//API for posting images - under experimentation
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb( null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

function checkFile(file, cb){
  //Allowed ext
  const filetypes = /jpeg|jpg|png/;
  //Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mime(application/json or img/jpeg?)
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true)
  } else {
    cb('Error: File is not type of jpeg, jpg or png.')
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    checkFile(file, cb)
  }
}).single('userImg');

router.put('/uploads', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.json({message: err})
    } else if(req.file === undefined){
      res.json({ message: 'File is undefined or empty.', err });
    } else {
      const newImage = req.body;
      const id = req.params.id;
    
      db('users').where({id}).update(newImage)
      .then(()=> res.status(500).json({
          message: 'File recieved.',
          file: `uploads/${req.file.filename}`,
          filePath: req.protocol + "://" + req.host + '/' + req.file.path,
      })
    }
  })
})



// EXPORT
module.exports = router;