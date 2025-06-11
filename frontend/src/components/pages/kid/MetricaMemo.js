import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../utils/api'

import styles from './MetricaMemo.module.css'
import MemoryChart from '../charts/MemoryCharts'

function VerMetrica() {
  const { kidId } = useParams()
  const [token] = useState(localStorage.getItem('token') || '')
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get(`/memory/${kidId}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          },
        })
        setMetrics(response.data)
      } catch (err) {
        console.error(err.response?.data || err)
      }
    }

    if (kidId) fetchMetrics()
  }, [kidId, token])

  return (
    <section className={styles.metricsContainer}>
        <h1>Gráficos de Desempenho</h1>
        {metrics.length > 0 && <MemoryChart metrics={metrics} />}
        {metrics.length === 0 && <p>Não há nanhuma métrica para ser vista</p>}
        <hr/>
        <h1>Cards das Métricas</h1>
        <div className={styles.cardGrid}> 
          {metrics.length > 0 && metrics.map((metric) => (
            <div className={styles.kidlist_row}>
              <div className={styles.cardInfo}>
                <span className='bold'>{metric.gameName}</span>
                <span className='bold'>N°: {metric.gameNum}</span>
                <span><strong>Data/hora:</strong> {new Date(metric.createdAt).toLocaleString()}</span>
                <span><strong>Acertos:</strong> {metric.correctMatches}</span>
                <span><strong>Erros:</strong> {metric.wrongMatches}</span>
                <span><strong>Jogadas Totais:</strong> {metric.totalAttempts}</span>
                <span>
                    <strong>Duração:</strong> {Math.floor(metric.durationInSeconds / 60)}:{(metric.durationInSeconds % 60).toString().padStart(2, '0')} min
                </span>
              </div>
            </div>
          ))
          }
          {metrics.length === 0 && <p>Não há nanhuma métrica para ser vista</p>}
        </div>
    </section>
  )
}

export default VerMetrica
