
exports.seed = function(knex) {
  return knex('stylists').del()
  .then(function () {
    return knex('stylists').insert([
      {
        password: 'Richie',
        first_name: 'Richie',
        last_name: 'Usman',
        email: 'richie@usman.com',
        usertype: 'stylist',
        bio: 'Wassup ya\'ll? I\'m Richie, a stylist and barber in Savannah, Ga.',
        profile_img: 'https://images.unsplash.com/photo-1523532888648-532ebf887c74?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      {
        password: 'Kat',
        first_name: 'Kat',
        last_name: 'Moon',
        email: 'kat@moon.com',
        usertype: 'stylist',
        bio: 'I\'ve been doing hair for 5yrs. I love it! Everyday I strive to learn and get better to make to the most stylish in town.' ,
        profile_img: 'https://images.unsplash.com/photo-1534445538923-ab38438550d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
      },
      {
        password: 'Stella',
        first_name: 'Stella',
        last_name: 'Dragon',
        email: 'stella@dragon.com',
        usertype: 'stylist',
        bio: 'Hi, I am Stella. I specialize in color, color, color.',
        profile_img: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
      },
      {
        password: 'Maggie',
        first_name: 'Maggie',
        last_name: 'Mills',
        email: 'maggie@mills.com',
        usertype: 'stylist',
        bio: 'I specialize in wedding hair and makeup with 7yrs of experience. I am dedicated to making you look and as fabulous as you feel. Don\'t skip out on spoiling yourself on your important day!',
        profile_img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
      },
    ])
  })    
};
