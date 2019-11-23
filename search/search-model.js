const db = require('../database/dbConfig.js');

module.exports = {  
  findBySalon,
  findByStylist,
  findByZip,
  findByCity,
};


function findByCity(city) {
    return db
    .select('salons.*')
      .where('salons.city', '=', `${city}`)
      .first();
}

function findByZip(zip) {
    return  db
    .select('*')
    .from('salons')
    .join('stylists', 'stylists.zipcode', '=', `${zip}`)
    .where('salons.zipcode', '=', `${zip}`)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error: 'Error retrieving posts.'})
    })
};

function findByStylist(name) {
    return db
      .select('stylists.*')
      .where('stylists.name', '=', `${name}`)
      .first();
}

function findBySalon(name) {
    return db
      .seletct('salons.*')
      .where('salons.name', '=', `${name}`)
      .first();
}
  