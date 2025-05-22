const MemoryMetrics = require('../models/MemoryMetrics')

const generateGameNum = async () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code

  while (true) {
    code = Array.from({ length: 10 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('')

    const exists = await MemoryMetrics.findOne({ gameNum: code })
    if (!exists) break // garantimos que o código é único
  }

  return code
}

module.exports = generateGameNum
