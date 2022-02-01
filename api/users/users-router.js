const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./user-model')
const {tokenBuilder} = require('./../helpers/token-builder');
const { 
    checkUserExists,
    checkUsernameFree,
    validateCredentials,
    } = require('./users-middleware');
const { restricted } = require('../plants/plants_middleware');

router.post('/register', checkUsernameFree, validateCredentials, (req, res, next) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash

    User.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(next)
})

router.post("/login", checkUserExists, (req, res, next) => {
    const { username, password } = req.body
    if (bcrypt.compareSync(password, req.user.password)) {
            const token = tokenBuilder(req.user)
            res.status(200).json({
              message: `${username} is back!`,
              token,
            })
          } else {
            next({status: 401, message: 'Invalid credentials'})
          }
  });

  router.get('/:id', restricted, (req,res,next)=> {
    User.getById(req.decodedJwt.user_id)
    .then(user => {
       res.status(201).json(user)
    }).catch(next)
})

  router.put('/:id', restricted, validateCredentials, (req, res, next) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash

    User.update(req.params.id, user)
    .then(updatedPlant => {
        res.status(200).json(updatedPlant)
    }).catch(next)
})



module.exports = router;