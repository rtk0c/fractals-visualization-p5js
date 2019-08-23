class Triangle {
  static equilateral(c, facing, len) {
    const v1 = c;
    const v2 = c.move(facing - ONE_SIXTH_PI, len);
    const v3 = c.move(facing + ONE_SIXTH_PI, len);
    return new Triangle(v1, v2, v3);
  }

  static equilateral2P(v1, v2, d) {
    const x1 = v1.x;
    const y1 = v1.y;
    const x2 = v2.x;
    const y2 = v2.y;
    const v3 = new Point((x1 + x2 + SQRT_3*(y1 - y2)) / 2,
                         (y1 + y2 + SQRT_3*(x2 - x1)) / 2);
    return new Triangle(v1, v2, v3);
  }

  constructor(v1, v2, v3) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
  }

  get edges() {
    if(!this._edges) {
      this._edges = [
        new Line(this.v1, this.v2),
        new Line(this.v1, this.v3),
        new Line(this.v2, this.v3),
      ];
    }
    return this._edges;
  }

  render() {
    noStroke();
    fill(255);
    triangle(this.v1.x, this.v1.y,
             this.v2.x, this.v2.y,
             this.v3.x, this.v3.y);
  }

  isInside(pt) {
    const d1 = Triangle.sign(pt, this.v1, this.v1);
    const d2 = Triangle.sign(pt, this.v2, this.v3);
    const d3 = Triangle.sign(pt, this.v3, this.v1);
    const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(hasNeg && hasPos);
  }

  static sign(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)
  }
}
