import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Context } from '../../context/UserContext';
import { useContext } from 'react';

function Navbar(){
    const location = useLocation();
    const {authenticated, logout} = useContext(Context)
    const esconderNavbar = location.pathname.startsWith('/jogo-da-memoria');

    if (esconderNavbar) return null;

    return(
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {authenticated ? (
                    <>
                    <li><Link to="/games">Jogos</Link></li>
                    <li><Link to="/perfil">Perfil</Link></li>
                    <li><Link to="/criancas">Crianças</Link></li>
                    <li onClick={logout}>Sair</li>
                    </>
                ) :(
                    <>
                    <li><Link to="/login">Login</Link></li>
                    </>)
                }  
            </ul>
        </nav>
    );
}

export default Navbar