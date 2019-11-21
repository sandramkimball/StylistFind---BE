
exports.seed = function(knex) {
      return knex('users').insert([

        {
          password: 'Sandy',
          username: 'Sandy',
          name: 'Sandy',
          email: 'sandy@gmail.com',
          usertype: 'user',
          profile_img: 'https://images.unsplash.com/photo-1509704215857-7ac19c9842b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        },
        {
          password: 'Maggie',
          username: 'Maggie',
          name: 'Maggie',
          email: 'maggie@gmail.com',
          usertype: 'user',
          profile_img: 'https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',      
        },
        {
          password: 'Stefano',
          username: 'Stefano',
          name: 'Stefano',
          email: 'stefano@gmail.com',
          usertype: 'user',
          profile_img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',  
        },

      ]);
};
