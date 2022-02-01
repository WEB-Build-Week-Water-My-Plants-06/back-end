const router = require('express').Router()
const Plants = require('./plants-model')
const { validateInfo } = require('./plants_middleware')

//EACH ONE OF THIS ENDPOINTS IS RESTRICTED TO VALIDATED USERS

// [GET]takes in user_id from the token and returns plants owned by the user
router.get('/', (req,res,next)=> {
    Plants.getPlants(req.decodedJwt.user_id)
    .then(plants => {
       res.status(201).json(plants)
    }).catch(next)
})
//[POST]API/PLANTS takes in the new plant as the req.body returns the newly created plant
router.post('/add', validateInfo, (req, res, next) => {
    let plant = req.body
    Plants.addPlant(plant)
    .then(newPlant => {
        res.status(201).json(newPlant)
    }).catch(next)
})
//[PUT]api/plants/:id takes in the id of the plant and the updated body. returns the updated plant
router.put('/:id', validateInfo, (req, res, next) => {
    Plants.update(req.params.id, req.body)
    .then(updatedPlant => {
        res.status(200).json(updatedPlant)
    }).catch(next)
})

//[DELETE] api/plants/:id takes in the id of the plant and returns a message saying that the plant was removed
router.delete('/:id', (req, res, next) => {
    Plants.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: `plant with id ${req.params.id} removed`})
    }).catch(next)
})


module.exports = router