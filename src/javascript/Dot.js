class Dot {
  constructor({ canvasContext, dotSize = 10, fieldSize }) {
    this.dotSize = dotSize;
    this.canvasContext = canvasContext;
    this.fieldSize = fieldSize;
    this.coords = null;
  }

  init() {
    this.setRandomPosition();
  }

  rand(min, max) {
    const k = Math.floor(Math.random() * (max - min) + min);
    return (Math.round(k / this.dotSize) * this.dotSize);
  }

  setRandomPosition() {
    this.coords = [this.rand(0, this.fieldSize * 10), this.rand(0, this.fieldSize * 10)]
  }

  render() {
    this.canvasContext.fillStyle = "red";
    this.canvasContext.fillRect(...this.coords, this.dotSize, this.dotSize);
  }
}

export default Dot;