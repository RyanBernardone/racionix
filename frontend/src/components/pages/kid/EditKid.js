import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './AddCrianca.module.css'
import KidForm from "../../form/KidForm";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { useNavigate } from "react-router-dom";

function EditKid() {
    const [kid, setKid] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/kid/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) =>{
            setKid(response.data.kid)
        })
    }, [token, id])

    async function updateKid(kid){
        let msgType = 'success'
        const formData = new FormData()
        await Object.keys(kid).forEach((key) => formData.append(key, kid[key]))
        const data = await api.patch(`kid/edit/${kid._id}`, formData, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
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
        <section>
            <div className={styles.addk_header}>
                <h1>Editando: {kid.name}</h1>
                <p>Os dados serão salvos ao fim da ação!</p>
            </div>
            {kid.name && (
                <KidForm handleSubmit={updateKid} btnText="Atualizar" kidData={kid}/>
            )}
        </section>
    )
}

export default EditKid