const mongoose = require('../db/conn')
const { Schema } = mongoose

const Tutor = mongoose.model(
    'Tutor',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true 
        },

        image: {
            type: String
        }
    },
    {timestamps: true},
    ),
)

module.exports = Tutor