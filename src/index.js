import WarmGame from './javascript/WarmGame';
import 'normalize.css';
import './styles/style.scss';

const warm_game = new WarmGame({ canvas: 'zmeika', fieldSize: 50, speed: 200 });
warm_game.init()