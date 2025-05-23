import styles from './Profile.module.css';
import formStyles from '../../form/Form.module.css';
import { useEffect, useState } from 'react';
import api from '../../../utils/api';

import Input from '../../form/Input';

import useFlashMessage from '../../../hooks/useFlashMessage';
import RoundImg from '../../layout/RoundImg';

function Profile() {
    const [user, setUser] = useState(false)
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get('/tutor/checktutor', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e){
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let msgType = 'success'
        const formData = new FormData()

        await Object.keys(user).forEach((key) => formData.append(key, user[key]))

        const data = await api.patch(`/tutor/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType='error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

    }

    return(
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundImg src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/tutor/${user.image}`} alt={user.name}/>
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu Nome"
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />
                <Input
                    text="Sua Idade"
                    type="text"
                    name="age"
                    placeholder="Digite a sua idade"
                    handleOnChange={handleChange}
                    value={user.age || ''}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmar Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="EDITAR" />
            </form>
        </section>
    );
}

export default Profile