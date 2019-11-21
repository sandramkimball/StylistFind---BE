
exports.seed = function(knex) {
  return knex('cities').insert([
    {
      city: 'Savannah',
      zipcode: '31401',
      state: 'GA',
      country_id: 1,
    },
    {
      city: 'Boise',
      zipcode: '83702',
      state: 'ID',
      country_id: 1,
    },
    {
      city: 'Dallas',
      zipcode: '92121',
      state: 'TX',
      country_id: 1,
    },
    {
      city: 'Toronto',
      zipcode: 'L6A 4NP',
      state: 'ON',
      country_id: 2,
    },
    {
      city: 'Calgary',
      zipcode: 'T5J 0N3',
      state: 'AB',
      country_id: 2,
    },
  ]);
};