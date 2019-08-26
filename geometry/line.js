class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  get bisectionPoint() {
    return bisect(this.p1, this.p2);
  }

  get trisectionPoints() {
    return trisect(this.p1, this.p2);
  }

  get trisect() {
    const [tp1, tp2] = this.trisectionPoints;
    return [
      new Line(this.p1, tp1),
      new Line(tp1, tp2),
      new Line(tp2, this.p2),
    ];
  }

  copy() {
    return new Line(this.p1, this.p2);
  }
}
