import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.home_container}>
      <div className={styles.content_box}>
        <h1>Seja Bem-Vindo ao Racionix!</h1>
        <p>Acompanhe de perto o desenvolvimento dos aspectos cognitivos de seus filhos ou pacientes, por meio de métricas geradas enquanto os pequeninos se divertem com os nossos jogos digitais!</p>
      </div>
    </div>
  )
}

export default Home
