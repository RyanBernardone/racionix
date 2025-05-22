import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

function MetricChart({ metrics }) {
  const sorted = [...metrics]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(-8) // últimas 8 métricas

  // Função para calcular o Y máximo arredondado
  const getMaxY = (data, key) => {
    const max = Math.max(...data.map((m) => m[key]))
    return Math.ceil((max + 1) / 5) * 5
  }

  return (
    <div style={{ width: '100%', display: 'grid', gap: '2rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Erros */}
      <div style={{ background: '#fff', padding: '1rem 1.5rem', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '1500px', height: '400px', maxWidth: '1000px'}}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Comparativo de Erros</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="gameNum"
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />
            <YAxis
              domain={[0, getMaxY(sorted, 'wrongMatches')]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="wrongMatches" name="Total de Erros" stroke="#f44336" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Jogadas Totais */}
      <div style={{ background: '#fff', padding: '1rem 1.5rem', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '1500px', height: '400px', maxWidth: '1000px'}}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Comparativo de Jogadas Totais</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="gameNum"
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />
            <YAxis
              domain={[0, getMaxY(sorted, 'totalAttempts')]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="totalAttempts" name="Total de Tentativas" stroke="#2196f3" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Duração */}
      <div style={{ background: '#fff', padding: '1rem 1.5rem', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '1500px', height: '400px', maxWidth: '1000px'}}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Comparativo de Duração</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="gameNum"
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />
            <YAxis
              domain={[0, getMaxY(sorted, 'durationInSeconds')]}
              tickFormatter={(v) => `${v}s`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(v) => `${v}s`} />
            <Legend />
            <Line type="linear" dataKey="durationInSeconds" name="Duração (s)" stroke="#4caf50" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default MetricChart
