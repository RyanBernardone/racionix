import classNames from "classnames";
import { useEffect, useMemo } from "react"; // ⬅️ ADICIONADO
import { resultados } from '../../../constants/resultados';
import { useJogoDaMemoria } from '../../../hooks/useJogoDaMemoria';
import { useNavigate } from 'react-router-dom'
import api from "../../../utils/api";

export const Resultado = () => {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/criancas')
  }

  const {
    cartas,
    idsDosParesEncontrados,
    quantidadeDeCartasViradas,
    iniciarJogo,
    encerrarJogo,
    duracaoEmSegundos
  } = useJogoDaMemoria();

  const aberto = useMemo(
    () => cartas.length > 0 && cartas.length === idsDosParesEncontrados.length * 2,
    [idsDosParesEncontrados.length]
  );

  //Chama encerrarJogo assim que aba de resultado abrir
  useEffect(() => {
    if (aberto) {
      encerrarJogo();
    }
  }, [aberto]);

  const taxaDeAcertos = (cartas.length / quantidadeDeCartasViradas ?? 1) * 100;

  const resultado = useMemo(
    () => resultados.find(({ min }) => min < taxaDeAcertos),
    [aberto]
  );

  const cn = classNames("resultado", {
    "resultado--aberto": aberto,
  });

  const jogadasTotais = quantidadeDeCartasViradas / 2;
  const jogadasErradas = Math.max(jogadasTotais - 6, 0); // garante que não fique negativo

  const handleSalvarEMostrarResultados = async () => {
  const kidId = localStorage.getItem('kidId');

  if (!kidId) {
    alert('Criança não selecionada.');
    return;
  }

  try {
    await api.post('/memory/memory-metrics', {
      kid: kidId,
      totalAttempts: jogadasTotais,
      correctMatches: 6,
      wrongMatches: jogadasErradas,
      durationInSeconds: duracaoEmSegundos
    });

    localStorage.removeItem('kidId');
    navigate('/criancas');
  } catch (error) {
    console.error('Erro ao salvar as métricas:', error);
    alert('Erro ao salvar as métricas. Tente novamente.');
  }
};

  return (
    <div className={cn}>
      <div className="resultado__box">
        <p>Seu nível de memória é:</p>
        <h1>{resultado?.titulo}</h1>
        <img
          src={resultado?.imagem}
          height={150}
          alt="Imagem de nível de memória"
        />
        <p>
          <strong>Taxa de acertos:</strong> {taxaDeAcertos.toFixed(0)}%
        </p>
        <p><strong>Jogadas totais:</strong> {jogadasTotais}</p>
        <p><strong>Jogadas erradas:</strong> {jogadasErradas}</p>
        
        {/*Exibição discreta da duração */}
        {duracaoEmSegundos !== null && (
          <p>
            <strong>Duração da partida:</strong> {duracaoEmSegundos} segundos
          </p>
        )}

        <button className="button" onClick={handleSalvarEMostrarResultados}>
          SALVAR E SAIR
        </button>

        <p>
          <small>
            * Essa análise é ilustrativa e não possui base científica.
          </small>
        </p>
      </div>
    </div>
  );
};
