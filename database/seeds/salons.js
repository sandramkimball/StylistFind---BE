
exports.seed = function(knex) {
  return knex('salons').del()
    .then(function () {
      return knex('salons').insert([
        {
          salon: 'Richie\'s Barber Shop',
          street_address: '3104 Bay Str.',
          zipcode: '31401',
          state: 'GA',
          city_id: 'Savannah',
          country_id: 1,
        },
        {
          salon: 'Lunatic Fringe',
          street_address: '666 Jefferson Str',
          zipcode: '83702',
          state: 'ID',
          city_id: 'Boise',
          country_id: 1,
        },
        {
          salon: 'Stella\'s  Hair Parlor',
          street_address: '921 Grand Avenue',
          zipcode: '92121',
          state: 'CA',
          city_id: 'Dallas',
          country_id: 1,
        },
        {
          salon: 'Luma Salon and Spa',
          street_address: '921 Grand Avenue',
          zipcode: 'L6A 4N9',
          state: 'ON',
          city_id: 'Toronto',
          country_id: 1,
        },
        {
          salon: 'Celebrity Salon',
          street_address: '552 Squash Avenue',
          zipcode: 'T5J 0N3',
          state: 'AB',
          city_id: 'Calgary',
          country_id: 2,
        },

      ]);
    });
};
