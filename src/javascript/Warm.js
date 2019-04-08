class Warm {
  constructor({ canvasContext, initialBody = [{ x: 0, y: 0 }], dotSize = 10 }) {
    this.warmBody = initialBody;
    this.dotSize = dotSize;
    this.canvasContext = canvasContext;
  }

  init() {
    this.renderWarmDot(this.warmBody[0]);
  }

  renderWarmDot(pob) {
    this.canvasContext.fillStyle = "#000000";
    this.canvasContext.fillRect(pob.x, pob.y, this.dotSize, this.dotSize);
  }

  moveRight() {
    const m = this.warmBody[0];
    const f = { x: m.x, y: m.y };
    const l = this.warmBody[this.warmBody.length - 1];
    f.x = l.x + this.dotSize, f.y = Math.round(l.y / this.dotSize) * this.dotSize;
    this.refresh(f)
  }
  moveLeft() {
    const m = this.warmBody[0];
    const f = { x: m.x, y: m.y };
    const l = this.warmBody[this.warmBody.length - 1];
    f.x = l.x - this.dotSize, f.y = Math.round(l.y / this.dotSize) * this.dotSize;
    this.refresh(f)
  }
  moveTop() {
    const m = this.warmBody[0];
    const f = { x: m.x, y: m.y };
    const l = this.warmBody[this.warmBody.length - 1];
    f.y = l.y - this.dotSize, f.x = Math.round(l.x / this.dotSize) * this.dotSize;
    this.refresh(f)
  }
  moveBottom() {
    const m = this.warmBody[0];
    const f = { x: m.x, y: m.y };
    const l = this.warmBody[this.warmBody.length - 1];
    f.y = l.y + this.dotSize, f.x = Math.round(l.x / this.dotSize) * this.dotSize;
    this.refresh(f)
  }

  refresh(f) {
    this.warmBody.push(f);
    this.warmBody.splice(0, 1);
  }

  addNewPart() {
    const f = { x: this.warmBody[0].x, y: this.warmBody[0].y };
    const l = this.warmBody[this.warmBody.length - 1];
    this.warmBody.unshift({ x: f.x - this.dotSize, y: l.y });
  }

  isSelfMeet() {
    let hasMeet = false;
    this.warmBody.forEach((element, i) => {
      if (
        element.x == this.warmBody[this.warmBody.length - 1].x &&
        element.y == this.warmBody[this.warmBody.length - 1].y &&
        i < this.warmBody.length - 1 &&
        this.warmBody.length > 3
      ) {
        hasMeet = true;
      }
    });
    return hasMeet;
  }

  isInsideGameField(direction, canvas) {
    const f = this.warmBody[this.warmBody.length - 1];
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
    this.warmBody.splice(0, this.warmBody.length - 1);
    this.warmBody = [{ x: 0, y: 0 }];
  }
}

export default Warm;