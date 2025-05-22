const jwt = require('jsonwebtoken')

const Tutor = require("../models/Tutor")

const getUserByToken = async (token) => {

    if(!token){
        return res.status(401).json({message: 'Acesso Negado!'})
    }

    const decoded = jwt.verify(token, 'meusecret')

    const tutorId = decoded.id
    
    const user = await Tutor.findOne({_id: tutorId})

    return user
}

module.exports = getUserByToken