import { useState, useEffect } from 'react'
import api from '../../utils/api'
import styles from './Select.module.css';

function SelectKid({ onSelect }) {
  const [kids, setKids] = useState([])
  const [selectedKid, setSelectedKid] = useState('')

  useEffect(() => {
    async function fetchKids() {
      try {
        const token = JSON.parse(localStorage.getItem('token'))
        const response = await api.get('/kid/criancas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setKids(response.data.kids)
      } catch (err) {
        console.error('Erro ao buscar crianças:', err)
      }
    }

    fetchKids()
  }, [])

  const handleChange = (e) => {
    const kidId = e.target.value
    setSelectedKid(kidId)
    onSelect(kidId) // passa o ID da criança selecionada para o componente pai
  }

  return (
    <div className={styles.form_control}>
      <label htmlFor="kidSelect">Selecione a criança:</label>
      <select id="kidSelect" value={selectedKid} onChange={handleChange}>
        <option value="">-- Escolha uma criança --</option>
        {kids.map((kid) => (
          <option key={kid._id} value={kid._id}>
            {kid.name} ({kid.age} anos)
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectKid
