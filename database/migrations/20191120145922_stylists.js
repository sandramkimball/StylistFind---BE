
exports.up = function(knex) {
    return knex.schema
    
    .createTable('stylists', users=> {
      users.increments('id').primary();
      users.string('username', 128).notNullable().unique();
      users.string('password', 128).notNullable();
      users.string('first_name').notNullable();
      users.string('last_name').notNullable();
      users.string('email').notNullable().unique();
      users.string('profile_img');
      users.text('bio');
      tbl
          .integer('salon_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('salons')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');    
    })
  
   .createTable('posts', tbl=> {
        tbl.increments('id').primary();
        tbl.timestamp('date').defaultTo(knex.fn.now());
        tbl.string('comment');  
        tbl.string('image');
        tbl
          .integer('stylist_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');    
    })
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('posts')
      .dropTableIfExists('stylists')
  };