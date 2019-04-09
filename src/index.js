import SnakeGame from './javascript/SnakeGame';
import 'normalize.css';
import './styles/style.scss';

const snake_game = new SnakeGame({ canvas: 'zmeika', fieldSize: 50, speed: 200 });
snake_game.init()