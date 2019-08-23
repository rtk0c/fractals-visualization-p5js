class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  offset(x, y) {
    const p = this.copy();
    p.x += x;
    p.y += y;
    return p;
  }

  move(a, d) {
    const p = this.copy();
    p.x += cos(a) * d;
    p.y += sin(a) * d;
    return p;
  }

  rotate(cx, cy, rad) {
    const p = this.copy();
    const s = sin(rad);
    const c = cos(rad);

    // translate point back to origin:
    p.x -= cx;
    p.y -= cy;

    // rotate point
    const xnew = p.x * c - p.y * s;
    const ynew = p.x * s + p.y * c;

    // translate point back:
    p.x = xnew + cx;
    p.y = ynew + cy;
    return p;
  }

  mirrorMut(p1, p2) {
    const c = bisect(p1, p2);
    this.reflectMut(c);
  }

  mirror(p1, p2) {
    const c = bisect(p1, p2);
    return this.reflect(c);
  }

  reflectMut(c) {
    this.x = 2*c.x - this.x;
    this.y = 2*c.y - this.y;
  }

  reflect(c) {
    const p = this.copy();
    p.x = 2*c.x - this.x;
    p.y = 2*c.y - this.y;
    return p;
  }

  copy() {
    return new Point(this.x, this.y);
  }
}

function section(p1, p2, l, m) {
  return new Point((l*p2.x + m*p1.x) / (l + m),
                   (l*p2.y + m*p1.y) / (l + m));
}

function bisect(p1, p2) {
  return new Point((p1.x + p2.x)/2,
                   (p1.y + p2.y)/2);
}

function trisect(p1, p2) {
  const tp1 = section(p1, p2, 1, 2);
  const tp2 = section(p1, p2, 2, 1);
  return [tp1, tp2];
}
