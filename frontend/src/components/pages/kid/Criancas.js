import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import RoundImg from '../../layout/RoundImg';
import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';
import styles from './Criancas.module.css';
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa';


function Criancas(){
  const [kids, setKids] = useState([])
  const [tutors, setTutors] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    async function fetchKidsAndTutors() {
      try {
        const res = await api.get('/kid/criancas', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        })
        const kidsData = res.data.kids
        setKids(kidsData)
      
        const tutorMap = {}
        for (const kid of kidsData) {
          if (kid.tutor && !tutorMap[kid.tutor]) {
            console.log('Buscando tutor para:', kid.name, '-> ID:', kid.tutor)
      
            const tutorRes = await api.get(`/tutor/${kid.tutor}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
              }
            })
                // Ajuste aqui conforme a estrutura real do retorno:
            tutorMap[kid.tutor] = tutorRes.data.name || tutorRes.data.tutor?.name || 'Nome não encontrado'
          }
        }
      
        setTutors(tutorMap)
      
      }catch (err) {
        console.error('Erro ao buscar dados:', err)
        setFlashMessage('Erro ao carregar dados das crianças.', 'error')
      }
    }
      
    fetchKidsAndTutors()
  }, [token])  

  async function removeKid(id) {
    let msgType = 'success'
    const data = await api.delete(`/kid/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    }).then((response) => {
      const updatedKid = kids.filter((kid) => kid._id !== id)
      setKids(updatedKid)
      return response.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })
    setFlashMessage(data.message, msgType)
  }

    return(
      <section >
        <div className={styles.kidlist_header}>
          <h1>Crianças</h1>
          <Link to="/kid/cad">Cadastrar Criança</Link>
        </div>
        <div className={styles.cardGrid}> 
          {kids.length > 0 && kids.map((kid) => (
            <div key={kid._id} className={styles.kidlist_row}>
              <div className={styles.cardLeft}>
                <RoundImg
                  src={`${process.env.REACT_APP_API}/images/kid/${kid.image}`}
                  alt={kid.name}
                  width="px75"
                />
              </div>
              <div className={styles.cardInfo}>
                <span className='bold'>{kid.name}</span>
                <span>{kid.age} anos</span>
                <span><strong>Tutor:</strong> {tutors[kid.tutor]}</span>
              </div>
              <div className={styles.cardActions}>
                <button onClick={() => {removeKid(kid._id)}}><FaTrashAlt color="red" size={18} /></button>
                <Link to={`/kid/edit/${kid._id}`}><FaEdit color="#333" size={18} /></Link>
                <Link to={`/${kid._id}`}><FaEye color="#333" size={18} /></Link>
              </div>
            </div>
          ))
          }
          {kids.length === 0 && <p>Não há nanhuma criança cadastrada</p>}
        </div>
      </section>
    )
}

export default Criancas