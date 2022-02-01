exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.string('phone_number', 10).notNullable()
    })
    .createTable('plants', (plants) => {
      plants.increments('plant_id')
      plants.string('nickname', 20).notNullable() 
      plants.string('species', 40).notNullable()
      plants.string('h20_freq', 30).notNullable()
      plants.string('plant_image')
      plants.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete("CASCADE")
    })
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('plants')
  .dropTableIfExists('users')
  
}