import classNames from "classnames";
import { useJogoDaMemoria } from '../../../hooks/useJogoDaMemoria';

export const Carta = ({ id, idDoPar, imagem }) => {
  const { virarCarta, idsDasCartasViradas, idsDosParesEncontrados } =
    useJogoDaMemoria();

  const controlarClique = () => {
    virarCarta({ id, idDoPar });
  };

  const encontrada = idsDosParesEncontrados.includes(idDoPar);
  const virada = encontrada || idsDasCartasViradas.includes(id);
  const bloqueado = virada || idsDasCartasViradas.length > 1;

  const cn = classNames("carta", {
    "carta--virada": virada,
    "carta--encontrada": encontrada,
  });

  return (
    <button
      id={id}
      className={cn}
      onClick={controlarClique}
      disabled={bloqueado}
    >
      <div className="carta__conteudo">
        <div className="carta__frente" />
        <div className="carta__costas">
          <img alt={idDoPar} width={300} src={imagem} />
        </div>
      </div>
    </button>
  );
};