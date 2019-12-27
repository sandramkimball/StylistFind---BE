const router = require('express').Router();
const Search = require('./search-model.js');
const db = require('../database/dbConfig.js');


router.get('/',  (req, res) => {
    db
    .select('*')
    .from('salons')
    .join('stylists', 'salons.id', '=', `stylists.salon_id`)
    .join('cities', 'salons.zipcode', '=', `cities.zipcode`)
    .then(salons => {
      res.status(200).json(salons)
    })
      .catch(err=> {
        console.log(err);
        res.status(500).json({error: 'Error retrieving salons.', error})
      });
  });

router.get('/posts',  (req, res) => {
  return db
  .select('posts.*', 'stylist.username as stylist', 'user.username as user')
  .from('posts')
  .join('stylists', 'stylist.id', '=', `posts.stylist_id`)
  .join('users', 'users.id', '=', `posts.user_id`)
  .then(posts => {
    res.status(200).json(posts)
  })
    .catch(err=> {
      console.log(err);
      res.status(500).json({error: 'Error retrieving posts.', error})
    });
});

router.get('/reviews',  (req, res) => {
  return db
  .select('reviews.*', 'stylist.username as stylist', 'user.username as user')
  .from('reviews')
  .join('stylists', 'stylist.id', '=', `reviews.stylist_id`)
  .join('users', 'users.id', '=', `reviews.user_id`)
  .then(reviews => {
    res.status(200).json(reviews)
  })
    .catch(err=> {
      console.log(err);
      res.status(500).json({error: 'Error retrieving reviews.', error})
    });
});

  
router.get('/search/:city',  (req, res) => {
    name = req.params.city;
    db
    .select('*')
    .from('cities')
    .join('stylists', 'cities.id', '=', 'stylists.city_id')
    .join('salons', 'cities.id', '=', 'salons.city_id')
    .where('cities.name', '=', `${name}`)
    .then(cities => {
      res.status(200).json(cities)
    })
      .catch(err=> {
        console.log(err);
        res.status(500).json({error: 'Error retrieving posts.'})
      });
});

router.get('/search/:zipcode',  (req, res) => {
    zip = req.params.zipcode;
    Search
    .findByZip(zip)
    .then(results => {
        res.json(results);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({message: 'Request failed.'});
    });
});
  
router.get('/search/:stylists',  (req, res) => {
    name = req.params.stylists;
    db
    .select('*')
    .from('stylists')
    .where('stylists.name', '=', `${name}`)
    .then(salons => {
      res.status(200).json(stylists)
    })
      .catch(err=> {
        console.log(err);
        res.status(500).json({error: 'Error retrieving posts.'})
      });
});

module.exports = router;
