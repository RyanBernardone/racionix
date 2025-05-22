const express = require('express')
const router = express.Router()

const checkToken = require('../helpers/verify-token')
const MemoryController = require('../controllers/MemoryController')

router.post('/memory-metrics', checkToken, MemoryController.createMemoryMetrics)
// GET /memory-metrics/:kidId
router.get('/:kidId', checkToken, MemoryController.getMemoryMetricsByKid)

module.exports = router