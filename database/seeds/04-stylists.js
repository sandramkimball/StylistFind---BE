
exports.seed = function(knex, Promise) {
      return knex('stylists').insert([
        
        {
          password: 'Richie',
          first_name: 'Richie',
          last_name: 'Usman',
          email: 'richie@gmail.com',
          usertype: 'stylist',
          bio: 'Wassup ya\'ll? I\'m Richie, a stylist and barber in Savannah, Ga.',
          profile_img: 'https://images.unsplash.com/photo-1523532888648-532ebf887c74?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          salon_id: 1,
        },
        {
          password: 'Kat',
          first_name: 'Kat',
          last_name: 'Moon',
          email: 'kat@lunafringe.com',
          usertype: 'stylist',
          bio: 'I\'ve been doing hair for 5yrs. I love it! Everyday I strive to learn and get better to make to the most stylish in town.' ,
          profile_img: 'https://images.unsplash.com/photo-1534445538923-ab38438550d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          salon_id: 2,          
        },
        {
          password: 'Stella',
          first_name: 'Stella',
          last_name: 'Dragon',
          email: 'stella@gmail.com',
          usertype: 'stylist',
          bio: 'Hi, I am Stella. I am a hairstylist.',
          profile_img: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          salon_id: 3,
        },

      ]);
};
