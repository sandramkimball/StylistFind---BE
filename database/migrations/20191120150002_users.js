exports.up = function(knex, Promise) {
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
    
    .createTable('stylists', stylists=> {
      stylists.increments().primary();
      stylists.string('first_name', 128).notNullable();
      stylists.string('last_name', 128).notNullable();
      stylists.string('password', 128).notNullable();
      stylists.string('email').notNullable().unique();
      stylists.string('usertype').notNullable();
      stylists.string('profile_img');
      stylists.text('bio');
    })

    .createTable('users', users=> {
      users.increments().primary();
      users.string('first_name', 128).notNullable();
      users.string('last_name', 128).notNullable();
      users.string('password', 128).notNullable();
      users.string('email').notNullable().unique();
      users.binary('profile_img');
      users.string('usertype').notNullable();
    })
    
    .createTable('salons', tbl=> {
      tbl.increments().primary();
      tbl.string('salon').notNullable();
      tbl.string('street_address').notNullable();
      tbl.string('city').notNullable();
      tbl.string('zipcode').notNullable();
      tbl.string('state').notNullable();
      tbl
        .integer('stylist_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('stylists')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
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
      tbl.binary('image');
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
  
  exports.down = function(knex, Promise) {
      return knex.schema
      .dropTableIfExists('bookmarks')
      .dropTableIfExists('reviews')
      .dropTableIfExists('posts')
      .dropTableIfExists('salons')
      .dropTableIfExists('users')
      .dropTableIfExists('stylists')
      .dropTableIfExists('cities')
      .dropTableIfExists('countries')
  };