export class DrawRect {
  constructor(p5) {
    this.p5 = p5;
    this.recordRectCoordinate = { x1: 0, y1: 0, x2: 0, y2: 0, w: 0, h: 0 };
  }
  update({ x1, y1, x2, y2 }) {
    this.recordRectCoordinate = {
      ...this.recordRectCoordinate,
      x1: x1 || this.recordRectCoordinate.x1,
      y1: y1 || this.recordRectCoordinate.y1,
      x2: x2 || this.recordRectCoordinate.x2,
      y2: y2 || this.recordRectCoordinate.y2,
    };
  }
  display() {
    this.recordRectCoordinate = {
      ...this.recordRectCoordinate,
      x2: this.p5.mouseX,
      y2: this.p5.mouseY,
      w: this.p5.mouseX - this.recordRectCoordinate.x1,
      h: this.p5.mouseY - this.recordRectCoordinate.y1,
    };
    this.p5.noFill();
    this.p5.stroke(255, 0, 0);
    this.p5.rect(
      this.recordRectCoordinate.x1,
      this.recordRectCoordinate.y1,
      this.recordRectCoordinate.w,
      this.recordRectCoordinate.h
    );
  }
  get coordinate() {
    return {
      x1: this.recordRectCoordinate.x1,
      y1: this.recordRectCoordinate.y1,
      x2: this.recordRectCoordinate.x2,
      y2: this.recordRectCoordinate.y2,
    };
  }
}
