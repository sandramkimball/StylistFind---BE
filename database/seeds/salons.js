
exports.seed = function(knex) {
  return knex('salons').del()
    .then(function () {
      return knex('salons').insert([
        {
          salon: 'Richie\'s Barber Shop',
          address: '3104 Bay Str.',
          zipcode: '31401',
          state: 'GA',
          city_id: 1,
          country_id: 1,
        },
        {
          salon: 'Lunatic Fringe',
          address: '666 Jefferson Str',
          zipcode: '83702',
          state: 'ID',
          city_id: 2,
          country_id: 1,
        },
        {
          salon: 'Stella\'s  Hair Parlor',
          address: '921 Grand Avenue',
          zipcode: '92121',
          state: 'CA',
          city_id: 3,
          country_id: 1,
        },
        {
          salon: 'Luma Salon and Spa',
          address: '921 Grand Avenue',
          zipcode: 'L6A 4N9',
          state: 'ON',
          city_id: 3,
          country_id: 1,
        },
        {
          salon: 'Celebrity Salon',
          address: '552 Squash Avenue',
          zipcode: 'T5J 0N3',
          state: 'AB',
          city_id: 3,
          country_id: 2,
        },

      ]);
    });
};
