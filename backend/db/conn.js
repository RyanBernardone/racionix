const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/racionix')
    console.log('Conectou ao Banco!')
}

main().catch((err) => console.log(err))
module.exports = mongoose