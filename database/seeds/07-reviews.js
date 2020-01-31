
exports.seed = function(knex) {
      return knex('reviews').insert([
        {
          user_id: 1,
          stylist_id: 1,
          date: '2018-04-06',
          review: 'Sandy was soooo nice! She did great with my hair.',
          image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
        },
        {
          user_id: 1,
          stylist_id: 1,
          date: '2018-04-06',
          review: 'Sandy was soooo nice! She did great with my hair.',
          image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
        },         
        {
          user_id: 2,
          stylist_id: 2,
          date: '2018-04-06',
          review: 'Very professional barbershop.',
          image: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
        },
        { 
          user_id: 2,
          stylist_id: 3,
          date: '2019-10-22',
          review: 'So much fun.',
          image: 'https://images.unsplash.com/photo-1501699169021-3759ee435d66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
        },
        {
          user_id: 3,
          salon_id: 4,
          date: '2019-05-06',
          review: 'I like the products they used. Stylist was very talkative and friendly and offerend mamosas! Super rocking.'
        },
        {
          user_id: 3,
          salon_id: 4,
          date: '2019-05-06',
          review: 'I like the products they used. Stylist was very talkative and friendly and offerend mamosas! Super rocking.'
        }
      ]);
};
