import { useContext } from "react";
import { LogicaJogoDaMemoriaContext } from '../context/LogicaJogoDaMemoria';

export const useJogoDaMemoria = () => {
  const contexto = useContext(LogicaJogoDaMemoriaContext);
  return contexto;
};