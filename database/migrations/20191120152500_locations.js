
exports.up = function(knex) {
    return knex.schema

    .createTable('countries', tbl=> {
        tbl.increments('id').primary();
        tbl.string('country').notNullable();
    })
  
    // .createTable('cities', tbl=> {
    //     tbl.increments('id').primary();
    //     tbl.string('city').notNullable();
    //     tbl.string('zipcode').notNullable();
    //     tbl.string('state').notNullable();
    //     tbl
    //       .integer('country_id')
    //       .unsigned()
    //       .notNullable()
    //       .references('id')
    //       .inTable('countries')
    //       .onDelete('CASCADE')
    //       .onUpdate('CASCADE');
    // })

    .createTable('salons', tbl=> {
        tbl.increments('id').primary();
        tbl.string('salon').notNullable();
        tbl.string('street_address').notNullable();
        tbl.string('zipcode').notNullable();
        tbl.string('city').notNullable();
        tbl.string('state').notNullable();
        
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('salons')
    .dropTableIfExists('cities')
    .dropTableIfExists('countries')
};
