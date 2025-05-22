import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/UserContext';
import { useNavigate} from 'react-router-dom';
import api from '../../../utils/api';
import useFlashMessage from '../../../hooks/useFlashMessage';
import Input from '../../form/Input';
import styles from './AddCrianca.module.css';
import KidForm from '../../form/KidForm';

function AddCrianca(){
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerKid(kid) {
        let msgType = 'success'
        const formData = new FormData
        await Object.keys(kid).forEach((key) => formData.append(key, kid[key]))
        const data = await api.post('/kid/register', formData, {
            Authorization: `Beare ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data',
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType='error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        navigate('/criancas')
    }
    return(
        <section className={styles.addk_header}>
            <div>
                <h1>Registre sua criança</h1>
                <p>Ela poderá jogar e gerar métricas para serem analisadas</p>
            </div>
            <KidForm handleSubmit={registerKid} btnText="Cadastrar Criança"/>
        </section>
    )
}

export default AddCrianca
