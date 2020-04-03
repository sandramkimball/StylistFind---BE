
exports.seed = function(knex) {
      return knex('posts').insert([
        {
          date: '2018-10-13',
          comment: 'Richie\'s Barbershop is waiting for yuh.',
          image: 'https://images.unsplash.com/photo-1550091354-bae8a0afb246?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1833&q=80',
          stylist_id: 1,
        },
        { 
          date: '2018-11-15',
          comment: 'Another great day at the shop.',
          image: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 1,
        },
        {
          date: '2018-11-16',
          comment: 'You wanna look like a gentleman or a homeless man?',
          image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
          stylist_id: 1,
        },
        {
          date: '2019-12-05',
          image: 'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
          stylist_id: 1,
        },
        {  
          date: '2018-11-15',
          comment: 'Love my work.',
          image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 2,
        },
        {
          date: '2018-11-15',
          image: 'https://images.unsplash.com/photo-1552425883-1fd7e6a11c31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          stylist_id: 2,
        },
        {
          date: '2018-11-15',
          image: 'https://images.unsplash.com/photo-1522336284037-91f7da073525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 3,
        },
        {
          date: '2018-11-15',
          comment: 'Come see us here at Stella\'s!',
          image: 'https://images.unsplash.com/photo-1554519515-242161756769?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 3,
        },
        {
          date: '2019-09-17',
          image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 3,
        },
        {
          date: '2018-11-15',
          image: 'https://images.unsplash.com/photo-1549236177-f9b0031756eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 3,
        },
        {
          date: '2015-11-15',
          image: 'https://images.unsplash.com/photo-1481066717861-4775e000c88a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          stylist_id: 4,
        },
        {
          date: '2018-04-10',
          image: 'https://images.unsplash.com/photo-1523263685509-57c1d050d19b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 4,
        },
        {
          date: '2018-11-15',
          image: 'https://images.unsplash.com/photo-1541314053190-1db8c88dc05a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 4,
        },
        {
          date: '2017-06-25',
          image: 'https://images.unsplash.com/photo-1551726824-bbeab11db685?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 4,
        },
        {
          date: '2020-01-05',
          image: 'https://images.unsplash.com/photo-1563339037-84fb4e623969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 4,
        }
      ]);
};