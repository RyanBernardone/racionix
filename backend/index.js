const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(express.static('public'))

//Rotas
const TutorRoutes  = require('./routes/TutorRoutes')
const KidRoutes = require('./routes/KidRoutes')
const MemoryMetricsRoutes = require('./routes/MemoryMetricsRoutes')

app.use('/tutor', TutorRoutes)
app.use('/kid', KidRoutes)
app.use('/memory', MemoryMetricsRoutes)

app.listen(5000)