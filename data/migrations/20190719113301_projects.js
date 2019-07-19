exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();

      tbl
        .string('project_name', 128)
        .notNullable()
        .unique();
      tbl
        .string('description', 256)
        .notNullable()
        .unique();
      tbl.boolean('complete').notNullable();
    })
    .createTable('actions', tbl => {
      tbl.increments();

      tbl
        .string('description', 256)
        .notNullable()
        .unique();

      tbl.string('notes', 256);

      tbl.boolean('completed').notNullable();

      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .unique()
        .references('id')
        .inTable('projects');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects').dropTableIfExists('actions');
};
