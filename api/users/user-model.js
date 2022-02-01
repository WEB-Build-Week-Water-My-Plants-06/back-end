const db = require("../data/db-config")

module.exports = {
  add,
  update,
  getById,
  findBy
}

function getById (user_id){
    return db('users').where('user_id', user_id).select('user_id','username', 'phone_number').first()
}
function findBy(username) {
    return db('users').where('username', username).first()
}
async function add(user) {
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'phone_number'])
    return newUserObject
}

async function update(user_id, changes) {
    const [updatedUser] = await db('users').where('user_id', user_id).update(changes,['user_id', 'username', 'phone_number'])
    return updatedUser
}