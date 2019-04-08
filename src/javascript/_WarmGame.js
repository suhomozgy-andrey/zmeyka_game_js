import Warm from './Warm';
import Dot from './Dot';

class WarmGame {
  constructor({ canvas, fieldSize = 50, initialDirection = 1, initialBody = [{ x: 0, y: 0 }], speed = 200 }) {
    this.canvas = document.getElementById(canvas);
    this.fieldSize = fieldSize;
    this.direction = initialDirection;
    this.warmBody = initialBody;
    this.dotSize = 10;
    this.initialSpeed = speed;
    this.speed = speed;
    this.canvasContext = this.canvas.getContext('2d');
    this.score = 0;
    this.intervalChange = () => { };

    this.dot = new Dot({ canvasContext: this.canvasContext, fieldSize: this.fieldSize });
    this.warm = new Warm({ canvasContext: this.canvasContext });
  }

  init() {
    this.setCanvasSize();
    this.dot.init();
    this.warm.init();
    this.onkeydownEventStart()
    this.startGame();
  }

  startGame() {
    this.intervalChange = setInterval(() => {
      this.renderGame();
    }, this.speed);
  }

  renderGame() {
    // Clear game field...
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set dot coordinates randomly inside canvas...
    if (this.dot.coords[0] + this.dotSize >= this.canvas.width || this.dot.coords[1] + this.dotSize >= this.canvas.height) this.dot.setRandomPosition();

    // Draw red dot...
    this.dot.render();

    if (this.warm.isSelfMeet()) this.gameover();

    // Пересчитываем положение змейки
    if (this.direction === 1) this.warm.moveRight();
    if (this.direction === 2) this.warm.moveBottom();
    if (this.direction === 3) this.warm.moveLeft();
    if (this.direction === 4) this.warm.moveTop();

    if (!this.warm.isInsideGameField(this.direction, this.canvas)) this.gameover();

    this.warm.warmBody.forEach((pob) => {
      if (pob.x === this.dot.coords[0] && pob.y === this.dot.coords[1]) {
        this.dot.setRandomPosition();
        this.warm.addNewPart();
        this.score = this.score + 1;
        this.renderScore();

        this.speed = this.speed - 2;
        clearInterval(this.intervalChange)
        this.intervalChange = setInterval(() => {
          this.renderGame();
        }, this.speed);
      }
      this.warm.renderWarmDot(pob);
    });
  }

  resetGame() {
    clearInterval(this.intervalChange)
    this.intervalChange = setInterval(() => {
      this.renderGame();
    }, this.initialSpeed);
    this.warm.resetBody();
    this.dot.setRandomPosition();
    this.direction = 1;
    this.score = 0;
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
      if (k == 39 && this.direction != 3) this.direction = 1; //Вправо
      if (k == 40 && this.direction != 4) this.direction = 2; //Вниз
      if (k == 37 && this.direction != 1) this.direction = 3; //Влево
      if (k == 38 && this.direction != 2) this.direction = 4; //Вверх
    };
  }
}

export default WarmGame;