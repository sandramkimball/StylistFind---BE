
exports.seed = function(knex) {
  return knex('users').del()
  .then(function () {
    return knex('users').insert([
      {
        password: 'Cilia',
        first_name: 'Cilia',
        last_name: 'Cruz',
        email: 'cilia@cruz.com',
        usertype: 'user',
        profile_img: 'https://images.unsplash.com/photo-1509704215857-7ac19c9842b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
      },
      {
        password: 'Stefano',
        first_name: 'Stefano',
        last_name: 'Stefan',
        email: 'stefano@stefan.com',
        usertype: 'user',
        profile_img: 'https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',      
      }
    ]);
  })
};
