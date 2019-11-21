exports.up = function(knex) {
    return knex.schema

    .createTable('salons', tbl=> {
        tbl.increments('id').primary();
        tbl.string('salon').notNullable();
        tbl.string('street_address').notNullable();
        tbl.string('city').notNullable();
        tbl.string('zipcode').notNullable();
        tbl.string('state').notNullable();
    })

    .createTable('stylists', stylists=> {
        stylists.increments('id').primary();
        stylists.string('username', 128).notNullable().unique();
        stylists.string('password', 128).notNullable();
        stylists.string('first_name').notNullable();
        stylists.string('last_name').notNullable();
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
      
    .createTable('posts', tbl=> {
            tbl.increments('id').primary();
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
    
    .createTable('users', users=> {
        users.increments('id').primary();
        users.string('username', 128).notNullable().unique();
        users.string('password', 128).notNullable();
        users.string('name').notNullable();
        users.string('email').notNullable().unique();
        users.string('profile_img');
        users.string('usertype').notNullable();
    })
    
    .createTable('reviews', tbl=> {
          tbl.increments('id').primary();
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

    .createTable('countries', tbl=> {
        tbl.increments('id').primary();
        tbl.string('country').notNullable();
    })

    .createTable('cities', tbl=> {
        tbl.increments('id').primary();
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

  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('cities')
      .dropTableIfExists('countries')
      .dropTableIfExists('reviews')
      .dropTableIfExists('users')
      .dropTableIfExists('posts')
      .dropTableIfExists('stylists')
      .dropTableIfExists('salons')
      
  };