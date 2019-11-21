
exports.up = function(knex) {
    return knex.schema
    
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
          .notNullable()
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
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('posts')
      .dropTableIfExists('stylists')
  };