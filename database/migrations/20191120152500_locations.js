
exports.up = function(knex) {
    return knex.schema

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

    .createTable('salons', tbl=> {
        tbl.increments('id').primary();
        tbl.string('salon').notNullable();
        tbl.string('address').notNullable();
        tbl.string('zipcode').notNullable();
        tbl.string('state').notNullable();
        tbl
          .integer('city_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('cities')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
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
    .dropTableIfExists('salons')
    .dropTableIfExists('cities')
    .dropTableIfExists('countries')
};
