import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogicaJogoDaMemoriaProvider } from '../../../context/LogicaJogoDaMemoria';
import { useJogoDaMemoria } from '../../../hooks/useJogoDaMemoria';
import { Carta } from './Carta';
import { Placar } from './Placar';
import { Resultado } from './Resultado';
import SelectKid from '../../form/Select'; // ajuste o caminho se necessário
import './MemoryGame.css'

export const JogoDaMemoria = () => {
  return (
    <LogicaJogoDaMemoriaProvider>
      <JogoDaMemoriaConteudo />
    </LogicaJogoDaMemoriaProvider>
  );
};

const JogoDaMemoriaConteudo = () => {
  const { cartas, iniciarJogo } = useJogoDaMemoria();
  const [kidId, setKidId] = useState(localStorage.getItem('kidId') || '');
  const navigate = useNavigate()

  useEffect(() => {
    if (kidId) {
      localStorage.setItem('kidId', kidId); // garante persistência
      iniciarJogo();
    }
  }, [kidId]);

  const handleSair = () => {
    localStorage.removeItem('kidId');
    setKidId('');
    navigate('/criancas');
  };

  if (!kidId) {
    return (
      <div className="jogo-da-memoria__selecao-container">
        <div className="jogo-da-memoria__selecao-box">
          <h2 className="jogo-da-memoria__titulo">Selecione a criança para começar o jogo</h2>
          <SelectKid onSelect={setKidId} />
        </div>
      </div>
    );
  }

  return (
    <div className="jogo-da-memoria">
      <div className="jogo-da-memoria__conteudo">
        <h1>Jogo da Memória</h1>
        <button className="botao-sair" onClick={handleSair}>Sair</button>
        <Placar />
        {cartas?.length === 0 ? (
          <p>Carregando cartas...</p>
        ) : (
          <div className="cartas">
            {cartas.map((props) => (
              <Carta key={props.id} {...props} />
            ))}
          </div>
        )}
      </div>
      <Resultado />
    </div>
  );
};
