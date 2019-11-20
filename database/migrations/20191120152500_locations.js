
exports.up = function(knex) {
    return knex.schema

    .createTable('countries', tbl=> {
        tbl.increments('id').primary();
        tbl.string('name').notNullable();
    })
  
    .createTable('cities', tbl=> {
        tbl.increments('id').primary();
        tbl.string('name').notNullable();
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
        tbl.string('name').notNullable();
        tbl.string('address').notNullable();
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
