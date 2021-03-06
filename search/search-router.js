const router = require('express').Router();
const Search = require('./search-model.js');
const db = require('../database/dbConfig.js');


router.get('/',  (req, res) => {
    db
    .select('*')
    .from('salons')
    .join('stylists', 'salons.stylist_id', '=', `stylists.id`)
    .then(stylists => {
      res.status(200).json(stylists)
    })
      .catch(err=> {
        console.log(err);
        res.status(500).json({error: 'Error retrieving salons.', error})
      });
});

router.get('/posts',  (req, res) => {
  return db
  .select('posts.*', 'salons.*', 'stylists.first_name', 'stylists.last_name','stylists.id')
  .from('posts')
  .join('stylists', 'posts.stylist_id', '=', `stylists.id`)
  .join('salons', 'posts.stylist_id', '=', `salons.stylist_id`)
  .then(posts => {
    res.status(200).json(posts)
  })
    .catch(err=> {
      console.log(err);
      res.status(500).json({error: 'Error retrieving posts.', error})
    });
});


module.exports = router;



//FOR POSSIBLE FILTER/SORT BY OPTIONS:  
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

