
exports.seed = function(knex) {
  return knex('countries').insert([
    {country: 'USA'},
    {country: 'Canada'},
    {country: 'UK'},
  ]);
};