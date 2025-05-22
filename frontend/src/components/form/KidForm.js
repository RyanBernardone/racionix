import { useState } from "react";
import formStyles from './Form.module.css';
import Input from "./Input";
import RoundImg from '../layout/RoundImg';
import styles from '../pages/user/Profile.module.css';
//import SelectKid from "./Select";

function KidForm({handleSubmit, kidData, btnText}){
    const [kid, setKid] = useState(kidData || {})
    const [preview, setPreview] = useState()

    function onFileChange(e){
        setPreview(e.target.files[0])
        setKid({...kid, [e.target.name]: e.target.files[0]})
    }

    function handleChange(e){
        setKid({...kid, [e.target.name]: e.target.value})
    }

    function submit(e){
        e.preventDefault()
        handleSubmit(kid)
    }

    return <form onSubmit={submit} className={formStyles.form_container}>
        <div className={styles.profile_header}>
            {(kid.image || preview) && (
                <RoundImg src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/kid/${kid.image}`} alt={kid.name}/>
            )}
        </div>
        <Input
            text="Foto da Criança"
            type="file"
            name="image"
            handleOnChange={onFileChange}
        />
        <Input
            text="Nome da Criança"
            type="text"
            name="name"
            placeholder="Insira nome aqui"
            handleOnChange={handleChange}
            value={kid.name || ''}
        />
        <Input
            text="Idade da Criança"
            type="text"
            name="age"
            placeholder="Insira idade aqui"
            handleOnChange={handleChange}
            value={kid.age || ''}
        />
        <input type="submit" value={btnText} />
    </form>
}

export default KidForm