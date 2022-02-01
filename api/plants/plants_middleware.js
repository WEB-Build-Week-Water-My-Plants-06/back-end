const jwt = require('jsonwebtoken')
const {JWT_SECRET } = require('../helpers/secrets')

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        return next({ status: 401, message: "token required"})
    }
    jwt.verify(token, JWT_SECRET, (err, decoded)=> {
        if (err) {
            return next({ status: 401, message: 'token invalid' })
        }
        req.decodedJwt= decoded
        next()
    })
}

const validateInfo = async (req, res, next) => {
    try {
        const { nickname, species, h20_freq} = req.body
        if(!nickname || !species || !h20_freq) {
            next({status:401, message: 'Nickname, Species, and h20_freq are required!'})
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    restricted,
    validateInfo,
}