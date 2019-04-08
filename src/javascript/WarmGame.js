// import Warm from './Warm';

class WarmGame {
  constructor(canvas, size = 50, initialDirection = 1, dot = null, initialBody = [{ x: 0, y: 0 }], speed = 200) {
    this.canvas = document.getElementById(canvas);
    this.size = size;
    this.direction = initialDirection;
    this.dot = dot;
    this.warmBody = initialBody;
    this.dotSize = 10;
    this.dotSizepeed = speed;
    this.canvasContext = null;
    this.score = 0;

    // this.warm = new Warm();
  }

  setEatenDotCoordinates() {
    this.dot = [this.rand(0, this.size * 10), this.rand(0, this.size * 10)];
  }

  rand(min, max) {
    const k = Math.floor(Math.random() * (max - min) + min);
    return (Math.round(k / this.dotSize) * this.dotSize);
  }

  init() {
    this.canvasContext = this.canvas.getContext('2d');
    this.canvas.width = this.size * 10;
    this.canvas.height = this.size * 10;
    this.setEatenDotCoordinates();
    this.onkeydown()
    this.start()
  }

  start() {
    console.log('Game started');
    setInterval(() => {
      if (this.dot[0] + this.dotSize >= this.canvas.width || this.dot[1] + this.dotSize >= this.canvas.height) {
        this.setEatenDotCoordinates();
      }

      // Create dot on canvas that should be eaten
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasContext.fillStyle = "red";
      // this.warm.init();
      this.canvasContext.fillRect(...this.dot, this.dotSize, this.dotSize);
      this.canvasContext.fillStyle = "#000000";

      this.warmBody.forEach((el, i) => {
        if (el.x == this.warmBody[this.warmBody.length - 1].x && el.y == this.warmBody[this.warmBody.length - 1].y && i < this.warmBody.length - 1) {
          this.gameover();
        }
      });

      const m = this.warmBody[0];
      const f = { x: m.x, y: m.y };
      const l = this.warmBody[this.warmBody.length - 1];

      if (this.direction == 1) {
        f.x = l.x + this.dotSize, f.y = Math.round(l.y / this.dotSize) * this.dotSize; //Если направление вправо, то тогда сохраняем Y, но меняем X на + s
      }
      if (this.direction == 2) {
        f.y = l.y + this.dotSize, f.x = Math.round(l.x / this.dotSize) * this.dotSize; // Если направление вниз, то сохраняем X, но меняем Y на + s
      }
      if (this.direction == 3) {
        f.x = l.x - this.dotSize, f.y = Math.round(l.y / this.dotSize) * this.dotSize; //Если направление влево, то сохраняем Y, но меняем X на -s
      }
      if (this.direction == 4) {
        f.y = l.y - this.dotSize, f.x = Math.round(l.x / this.dotSize) * this.dotSize; //Если направление вверх, то сохраняем X, Но меняем Y на -ss
      }

      this.warmBody.push(f); //Добавляем хвост после головы с новыми координатами
      this.warmBody.splice(0, 1); //Удаляем хвост

      this.warmBody.forEach((pob) => {
        if (this.direction == 1 && pob.x > Math.round(this.canvas.width / this.dotSize) * this.dotSize) {
          this.gameover();
        }
        if (this.direction == 2 && pob.y > Math.round(this.canvas.height / this.dotSize) * this.dotSize) {
          this.gameover();
        }
        if (this.direction == 3 && pob.x < 0) {
          this.gameover();
        }
        if (this.direction == 4 && pob.y < 0) {
          this.gameover();
        }

        if (pob.x == this.dot[0] && pob.y == this.dot[1]) {
          this.setEatenDotCoordinates();
          this.warmBody.unshift({ x: f.x - this.dotSize, y: l.y })
          this.score = this.score + 1;
          this.renderScore(this.score)
        }

        this.canvasContext.fillRect(pob.x, pob.y, this.dotSize, this.dotSize);
      });

    }, this.dotSizepeed);
  }

  resetWormBody() {
    this.warmBody.splice(0, this.warmBody.length - 1);
    this.warmBody = [{ x: 0, y: 0 }];
  }

  resetGame() {
    this.direction = 1;
    this.score = 0;
    this.renderScore();
  }

  gameover() {
    this.resetWormBody()
    this.resetGame()
  }

  renderScore(score) {
    document.getElementById('score').textContent = score
  }

  onkeydown() {
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