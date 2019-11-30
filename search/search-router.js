const router = require('express').Router();
const Search = require('./search-model.js');
const db = require('../database/dbConfig.js');
const restricted = require('../auth/restricted-middleware.js');

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
