// controllers/MemoryMetricsController.js
const MemoryMetrics = require('../models/MemoryMetrics')
const Kid = require('../models/Kid')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const generateGameNum = require('../helpers/generate-game-num')

module.exports = class MemoryController{
    static async getMemoryMetricsByKid(req, res) {
        const { kidId } = req.params
        const token = getToken(req)
        const tutor = await getUserByToken(token)

        try {
            // Verifica se a criança pertence ao tutor logado
            const kid = await Kid.findOne({ _id: kidId, tutor: tutor._id })
            if (!kid) {
                return res.status(403).json({ message: 'Essa criança não pertence a você!' })
            }
            // Busca as métricas da criança
            const metrics = await MemoryMetrics.find({ kid: kidId }).sort({ createdAt: -1 })
            return res.status(200).json(metrics)
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar as métricas.', error: err.message })
        }
    }

    static async createMemoryMetrics(req, res) {
        const { kid: kidId, totalAttempts, correctMatches, durationInSeconds, wrongMatches } = req.body
        const token = getToken(req)
        const tutor = await getUserByToken(token)
        const gameNum = await generateGameNum()

        
        // Verifica se a criança existe e se pertence ao tutor logado
        const kid = await Kid.findOne({ _id: kidId, tutor: tutor._id })
        if (!kid) {
            return res.status(404).json({ message: 'Criança não encontrada ou não pertence ao tutor.' })
        }

        // Cria e salva a métrica
        const memoryMetric = new MemoryMetrics({
            kid: kid._id,
            totalAttempts,
            correctMatches,
            durationInSeconds,
            wrongMatches,
            gameName: 'Jogo da Memória',
            gameNum: gameNum,
        })

        try {    
            const newMetric = await memoryMetric.save()
            res.status(201).json({ message: 'Métricas salvas com sucesso!', newMetric})
        } catch (err) {
            res.status(500).json({ message: err})
        }
    }
}
