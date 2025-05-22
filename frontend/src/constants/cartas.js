import aquaman from '../assets/img/aquaman.png'
import batman from '../assets/img/batman.png'
import flash from '../assets/img/flash.png'
import lanterna from '../assets/img/lanterna.png'
import superman from '../assets/img/superman.png'
import diana from '../assets/img/diana.png'

const imagens = [
  aquaman,
  batman,
  flash,
  lanterna,
  superman,
  diana,
];

const cartasUnicas = imagens.map((imagem, idDoPar) => ({ imagem, idDoPar }));

export const paresDeCartas = [...cartasUnicas, ...cartasUnicas].map(
  (props, id) => ({ ...props, id })
);