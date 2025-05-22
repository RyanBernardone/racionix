const mongoose = require('../db/conn')
const { Schema } = mongoose

const Kid = mongoose.model(
    'Kid',
    new Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true 
        },

        image: {
            type: String,
            required: true
        },

        tutor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tutor',
            required: true
          }
    },
    {timestamps: true},
    ),
)

module.exports = Kid