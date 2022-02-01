const db = require('../data/db-config')

module.exports = {
    getPlants,
    addPlant,
    update,
    remove,
}
 function getPlants(user_id) {
    return db("users as u")
		.leftJoin('plants as p', 'u.user_id', 'p.user_id')
        .select('p.plant_id', 'p.nickname', 'p.species', 'p.plant_image', 'p.h20_freq', 'p.user_id')
        // .select('h20_freq', 'plant_image', 'nickname', 'plant_id', 'species', 'phone_number')
		.where("u.user_id", user_id)
}

async function addPlant(plant) {
    const [newUserObject] = await db('plants').insert(plant, ['plant_id', 'nickname', 'species', 'plant_image', 'h20_freq', 'user_id'])
    return newUserObject
}

async function update(plant_id, changes) {
    const [updatedPlant] = await db('plants').where('plant_id', plant_id).update(changes,['plant_id', 'nickname', 'species', 'plant_image', 'h20_freq','user_id'])
    return updatedPlant
}
function remove(plant_id){
    return db('plants').where( 'plant_id', plant_id ).del();
}