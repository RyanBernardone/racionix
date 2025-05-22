import styles from './Games.module.css'
import React from 'react';
import memoriaImg from '../../assets/img/memorygame.jpg'; // ajuste o caminho conforme seu projeto
import { useNavigate } from 'react-router-dom';

const Games = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/jogo-da-memoria')
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>JOGOS</h1>
      <div className={styles.gamesContainer}>
        <div className={styles.gameCard} onClick={handleClick}>
          <img src={memoriaImg} alt="Jogo da Memória" className={styles.gameImage} />
          <div className={styles.gameInfo}>
            <small>Racionix</small>
            <strong>Jogo da Memória</strong>
          </div>
        </div>
        {/* Adicione outros jogos aqui */}
      </div>
    </div>
  );
};

export default Games;
