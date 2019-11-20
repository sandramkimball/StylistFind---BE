exports.up = function(knex) {
    return knex.schema
  
    .createTable('users', users=> {
      users.increments('id').primary();
      users.string('username', 128).notNullable().unique();
      users.string('password', 128).notNullable();
      users.string('first_name').notNullable();
      users.string('last_name').notNullable();
      users.string('email').notNullable().unique();
      users.string('profile_img');
    })
  
   .createTable('comment', tbl=> {
        tbl.increments('id').primary();
        tbl.timestamp('date').defaultTo(knex.fn.now());
        tbl.string('content');      
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
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('comments')
      .dropTableIfExists('users')
  };