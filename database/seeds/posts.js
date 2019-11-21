
exports.seed = function(knex) {
      return knex('table_name').insert([
        {
          date: '2018-11-15',
          image: 'https://images.unsplash.com/photo-1549236177-f9b0031756eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 1,
        },
        {
          date: '2018-11-15',
          text: 'Come visit us here at Stella\'s!',
          image: 'https://images.unsplash.com/photo-1554519515-242161756769?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 1,
        },
        {
          date: '2018-11-15',
          image: 'https://images.unsplash.com/photo-1522336284037-91f7da073525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 1
        },
        {  
          date: '2018-11-15',
          text: 'Love my work.',
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
          text: 'Another great day at the salon.',
          image: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 3,
        },
      
        {
          date: '2018-11-15',
          image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          stylist_id: 3,
        },
        {
          date: '2018-11-15',
          image: 'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
          stylist_id: 3,
        }
      
        
      ]);
};
