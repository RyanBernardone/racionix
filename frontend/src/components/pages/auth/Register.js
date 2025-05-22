import { useContext, useState } from 'react';

import Input from '../../form/Input';
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

import { Context } from '../../../context/UserContext';

function Register() {
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        //enviar para o banco
        register(user)
    }

    return(
        <div className={styles.form_container}>
            <h1>Cadastrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Sua Idade"
                    type="text"
                    name="age"
                    placeholder="Digite a sua idade"
                    handleOnChange={handleChange}
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
                <p>Já possui cadastro? <Link to='/login'>Clique aqui!</Link></p>
                <input type="submit" value="Cadastrar-se" />
            </form>
        </div>
    );
}
export default Register