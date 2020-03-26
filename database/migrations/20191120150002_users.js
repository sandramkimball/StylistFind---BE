exports.up = function(knex) {
    return knex.schema

    
    .createTable('countries', tbl=> {
        tbl.increments().primary();
        tbl.string('country').notNullable();
    })

    .createTable('cities', tbl=> {
        tbl.increments().primary();
        tbl.string('city').notNullable();
        tbl.string('zipcode').notNullable();
        tbl.string('state').notNullable();
        tbl
          .integer('country_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('countries')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
    })
    
    .createTable('salons', tbl=> {
        tbl.increments().primary();
        tbl.string('salon').notNullable();
        tbl.string('street_address').notNullable();
        tbl.string('city').notNullable();
        tbl.string('zipcode').notNullable();
        tbl.string('state').notNullable();
        tbl.string('profile_img');
    })

    .createTable('stylists', stylists=> {
        stylists.increments().primary();
        stylists.string('first_name', 128).notNullable();
        stylists.string('last_name', 128).notNullable();
        stylists.string('password', 128).notNullable();
        stylists.string('email').notNullable().unique();
        stylists.string('usertype').notNullable();
        stylists.string('profile_img');
        stylists.text('bio');
        stylists
              .integer('salon_id')
              .unsigned()
              .references('id')
              .inTable('salons')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
    })
    
    .createTable('users', users=> {
        users.increments().primary();
        users.string('first_name', 128).notNullable();
        users.string('last_name', 128).notNullable();
        users.string('password', 128).notNullable();
        users.string('email').notNullable().unique();
        users.string('profile_img');
        users.string('usertype').notNullable();
    })
      
    .createTable('posts', tbl=> {
            tbl.increments().primary();
            tbl.timestamp('date').defaultTo(knex.fn.now());
            tbl.text('comment');  
            tbl.string('image');
            tbl
              .integer('stylist_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('stylists')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');    
    })
    
    .createTable('reviews', tbl=> {
          tbl.increments().primary();
          tbl.timestamp('date').defaultTo(knex.fn.now());
          tbl.text('review');      
          tbl.string('image');
          tbl
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
          tbl
            .integer('stylist_id')
            .unsigned()
            .references('id')
            .inTable('stylists')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
          tbl
            .integer('salon_id')
            .unsigned()
            .references('id')
            .inTable('salons')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })

    .createTable('bookmarks', tbl=> {
      tbl.increments().primary();
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('stylist_id')
        .unsigned()
        .references('id')
        .inTable('stylists')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('salon_id')
        .unsigned()
        .references('id')
        .inTable('salons')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
})

  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('bookmarks')
      .dropTableIfExists('reviews')
      .dropTableIfExists('posts')
      .dropTableIfExists('users')
      .dropTableIfExists('stylists')
      .dropTableIfExists('salons')
      .dropTableIfExists('cities')
      .dropTableIfExists('countries')
  };