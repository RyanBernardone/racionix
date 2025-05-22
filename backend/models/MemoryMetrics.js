const mongoose = require('../db/conn')
const { Schema } = mongoose

const MemoryMetrics = mongoose.model(
  'MemoryMetrics',
  new Schema({
    kid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kid',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    totalAttempts: Number,
    correctMatches: Number,
    durationInSeconds: Number,
    wrongMatches: Number,
    gameName: {
      type: String,
      default: { name: 'Jogo da Memória' },
      required: true
    },
    gameNum: {
      type: String,
      unique: true,
      required: true
    }
  }, { timestamps: true })
)

module.exports = MemoryMetrics