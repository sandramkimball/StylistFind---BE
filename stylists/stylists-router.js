const router = require('express').Router();
const Stylists = require('./stylists-model.js');
const db = require('../database/dbConfig.js');
const restricted = require('../auth/restricted-middleware.js');

const multer = require('multer')
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.filename + '-' + Date.now().toISOString())
  }
})
const upload = multer({storage: storage})



//GET
router.get('/', (req, res) => {
  Stylists
  .find()
  .then(stylists => {
    res.json(stylists);
  })
  .catch (err => {
    res.status(500).json({message: 'Request failed to get stylists.', err});
  });
});

router.get('/:id', restricted, (req, res) => {
  id = req.params.id;
  Stylists.findStylistById(id)
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

router.get('/:id/salon', restricted, (req, res) => {
  id = req.params.id;
  return db
    .findSalonById(id)
    .then(salon => {res.status(200).json(salon)})
    .catch(err => {
      res.status(500).json({ message: `Could not find salon with id ${id}.`})
    });
});

router.get('/:id/posts', restricted, (req, res) => {
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

router.get('/:id/reviews', (req, res) => {
  id = req.params.id
  return db
    .select(
      'reviews.*', 
      'users.first_name as user_first', 
      'users.profile_img', 
      'stylists.first_name as stylist_first', 
      'stylists.last_name as stylist_last',
    )
    .from('reviews')
    .where('reviews.stylist_id', '=', `${id}`)
    .join('users', 'users.id', '=', 'reviews.user_id')
    .join('stylists', 'stylists.id', '=', 'reviews.stylist_id')
    .then(reviews => { res.status(200).json(reviews) })
    .catch(err=> {res.status(500).json({error: 'Request failed to retrieve reviews.', err}) })
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
router.put('/:id', restricted,  (req, res) => {
  const stylistData = req.body;
  const id = req.params.id;

  db('stylists').where({id}).update(stylistData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to edit user information.' });
  });
});

router.put('/:id/salon', restricted,  (req, res) => {
  const salonData = req.body;
  const id = req.params.id;

  db('salons').where({id}).update(salonData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to edit user information.' });
  });
});


router.put('/:id/posts/:id', restricted, upload.single(), (req, res) => {
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


