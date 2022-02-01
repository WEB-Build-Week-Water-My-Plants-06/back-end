exports.seed = function (knex) {
  return knex('users').insert([
      {username: 'Lambda', password: '1234', phone_number: '8016690601'},
      {username: 'Water', password: '2345', phone_number: '1234567891'},
      {username: 'Plant', password: '3456', phone_number: '1212121212'},
  ])
}
