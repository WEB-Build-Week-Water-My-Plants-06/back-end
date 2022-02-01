const User = require('./user-model')

const checkUserExists = async (req, res, next) => {
    try {
        const user = await User.findBy( req.body.username )
        if(!user) {
            next({status:401, message: 'invalid credentials'})
        } else {
            req.user = user
            next()
        }
    } catch (error) {
        next(error)
    }
}

const checkUsernameFree = async (req, res, next) => {
    try {
        const user = await User.findBy( req.body.username )
        if(user) {
            next({status:401, message: 'Username is Taken!'})
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

const validateCredentials = async (req, res, next) => {
    try {
        const {username, password, phone_number} = req.body
        if(!username || !password || !phone_number) {
            next({status:401, message: 'Username, password, and phone number are required!'})
        }  else if (typeof(phone_number) !== "string") {
            next({status:401, message: 'Phone number must be a string'})
        } else if (phone_number.length !== 10) {
            next({status:401, message: 'Phone number must contain (10 digits)'})
        }
        else {
            next()
        }
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    checkUserExists,
    checkUsernameFree,
    validateCredentials
}