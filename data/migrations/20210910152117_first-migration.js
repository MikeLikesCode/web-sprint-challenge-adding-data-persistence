
exports.up = async function(knex) {
    await knex.schema
    .createTable('projects', table => {
        table.increments('project_id')
        table.string('project_name', 150).notNullable()
        table.string('project_description', 250)
        table.boolean('project_completed')
    })
    .createTable('resources', table => {
        table.increments('resource_id')
        table.string('resource_name',150).notNullable().unique()
        table.string('resource_description', 250)
    })
    .createTable('tasks', table  => {
        table.increments('task_id')
        table.string('task_description', 250).notNullable()
        table.string('task_notes', 200)
        table.boolean('task_completed')
        table.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')

    })
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
