import Snake from './Snake';
import Dot from './Dot';

class SnakeGame {
  constructor({ canvas, fieldSize = 50, initialDirection = 1, initialBody = [{ x: 0, y: 0 }], speed = 200 }) {
    this.canvas = document.getElementById(canvas);
    this.fieldSize = fieldSize;
    this.direction = initialDirection;
    this.dotSize = 10;
    this.initialSpeed = speed;
    this.speed = speed;
    this.canvasContext = this.canvas.getContext('2d');
    this.score = 0;
    this.intervalChange = () => { };

    this.dot = new Dot({ canvasContext: this.canvasContext, fieldSize: this.fieldSize });
    this.snake = new Snake({ canvasContext: this.canvasContext, initialBody: initialBody });
  }

  init() {
    this.setCanvasSize();
    this.dot.init();
    this.snake.init();
    this.onkeydownEventStart()
    this.startGame();
  }

  startGame() {
    this.intervalChange = setInterval(() => {
      this.renderGame();
    }, this.speed);
  }

  renderGame() {
    // Clear game field
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set dot coordinates randomly inside canvas
    if (this.dot.coords[0] + this.dotSize >= this.canvas.width || this.dot.coords[1] + this.dotSize >= this.canvas.height) this.dot.setRandomPosition();

    // Draw red dot...
    this.dot.render();

    if (this.snake.isSelfMeet()) {
      this.gameover();
    }

    // Rerender snake depending of direction
    if (this.direction === 1) this.snake.moveRight();
    if (this.direction === 2) this.snake.moveBottom();
    if (this.direction === 3) this.snake.moveLeft();
    if (this.direction === 4) this.snake.moveTop();

    // If snake faced woth game field border need to reset game
    if (!this.snake.isInsideGameField(this.direction, this.canvas)) {
      this.gameover();
    }

    this.snake.snakeBody.forEach((pob) => {
      if (pob.x === this.dot.coords[0] && pob.y === this.dot.coords[1]) {
        this.dot.setRandomPosition();
        this.snake.addNewDot();
        this.score = this.score + 1;
        this.renderScore();

        this.speed = this.speed - 2;
        clearInterval(this.intervalChange)
        this.intervalChange = setInterval(() => {
          this.renderGame();
        }, this.speed);
      }
      this.snake.renderSnakeDot(pob);
    });
  }

  resetGame() {
    clearInterval(this.intervalChange)
    this.intervalChange = setInterval(() => {
      this.renderGame();
    }, this.initialSpeed);
    this.snake.resetBody();
    this.dot.setRandomPosition();
    this.direction = 1;
    this.score = 0;
    this.speed = this.initialSpeed;
  }

  gameover() {
    this.resetGame()
    this.renderScore();
  }

  renderScore() {
    document.getElementById('score').textContent = this.score
  }

  setCanvasSize() {
    this.canvas.width = this.fieldSize * 10;
    this.canvas.height = this.fieldSize * 10;
  }

  onkeydownEventStart() {
    onkeydown = (e) => {
      var k = e.keyCode;
      if ([38, 39, 40, 37].indexOf(k) >= 0) e.preventDefault();
      if (k == 39 && this.direction != 3) this.direction = 1; // Rigth
      if (k == 40 && this.direction != 4) this.direction = 2; // Bottom
      if (k == 37 && this.direction != 1) this.direction = 3; // Left
      if (k == 38 && this.direction != 2) this.direction = 4; // Up
    };
  }
}

export default SnakeGame;