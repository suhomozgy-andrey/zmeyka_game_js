class Snake {
  constructor({ canvasContext, initialBody = [{ x: 0, y: 0 }], dotSize = 10 }) {
    this.snakeBody = initialBody;
    this.dotSize = dotSize;
    this.canvasContext = canvasContext;
  }

  init() {
    this.renderSnakeDot(this.snakeBody[0]);
  }

  renderSnakeDot(pob) {
    this.canvasContext.fillStyle = "#000000";
    this.canvasContext.fillRect(pob.x, pob.y, this.dotSize, this.dotSize);
  }

  moveRight() {
    const m = this.snakeBody[0];
    const f = { x: m.x, y: m.y };
    const l = this.snakeBody[this.snakeBody.length - 1];
    f.x = l.x + this.dotSize, f.y = Math.round(l.y / this.dotSize) * this.dotSize;
    this.refresh(f)
  }
  moveLeft() {
    const m = this.snakeBody[0];
    const f = { x: m.x, y: m.y };
    const l = this.snakeBody[this.snakeBody.length - 1];
    f.x = l.x - this.dotSize, f.y = Math.round(l.y / this.dotSize) * this.dotSize;
    this.refresh(f)
  }
  moveTop() {
    const m = this.snakeBody[0];
    const f = { x: m.x, y: m.y };
    const l = this.snakeBody[this.snakeBody.length - 1];
    f.y = l.y - this.dotSize, f.x = Math.round(l.x / this.dotSize) * this.dotSize;
    this.refresh(f)
  }
  moveBottom() {
    const m = this.snakeBody[0];
    const f = { x: m.x, y: m.y };
    const l = this.snakeBody[this.snakeBody.length - 1];
    f.y = l.y + this.dotSize, f.x = Math.round(l.x / this.dotSize) * this.dotSize;
    this.refresh(f)
  }

  refresh(f) {
    this.snakeBody.push(f);
    this.snakeBody.splice(0, 1);
  }

  addNewDot() {
    const f = { x: this.snakeBody[0].x, y: this.snakeBody[0].y };
    const l = this.snakeBody[this.snakeBody.length - 1];
    this.snakeBody.unshift({ x: f.x - this.dotSize, y: l.y });
  }

  isSelfMeet() {
    // var t0 = performance.now();
    let hasMeet = false;
    const lastIndex = this.snakeBody.length - 1;
    const lastWarmDot = this.snakeBody[lastIndex]

    this.snakeBody.forEach((element, i) => {
      if (
        element.x === lastWarmDot.x &&
        element.y === lastWarmDot.y &&
        i < lastIndex &&
        lastIndex > 4
      ) {
        hasMeet = true;
      }
    });
    // var t1 = performance.now();
    return hasMeet;
  }

  isInsideGameField(direction, canvas) {
    const f = this.snakeBody[this.snakeBody.length - 1];
    // console.log(f, direction, canvas);
    if (direction === 1 && f.x > Math.round(canvas.width / this.dotSize) * this.dotSize) {
      return false;
    }
    if (direction === 2 && f.y > Math.round(canvas.height / this.dotSize) * this.dotSize) {
      return false;
    }
    if (direction === 3 && f.x < 0) {
      return false;
    }
    if (direction === 4 && f.y < 0) {
      return false;
    }
    return true;
  }

  resetBody() {
    this.snakeBody.splice(0, this.snakeBody.length - 1);
    this.snakeBody = [{ x: 0, y: 0 }];
  }
}

export default Snake;