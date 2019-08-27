let triangles = [];

function setupFractal() {
  setCanvasSize(600, 600);
  maxStage(8);
}

function populate(limit) {
  let stack = [];
  
  const stage0 = Triangle.equilateral(new Point(width/2, height/6), HALF_PI, 360);
  triangles.push(stage0);
  stage0.edges.forEach(e => stack.push([e, stage0, 0]));
  
  while(stack.length > 0) {
    const [l, parent, d] = stack.pop();
    if(d >= limit) continue;
    
    const t = processLine(l, parent);
    triangles.push(t);
    stack.push([new Line(t.v1, t.v3), t, d + 1]);
    stack.push([new Line(t.v2, t.v3), t, d + 1]);
    const [ln1, ln2, ln3] = l.trisect;
    stack.push([ln1, parent, d + 1]);
    stack.push([ln3, parent, d + 1]);
  }
}

function processLine(ln, parent) {
  const [tp1, tp2] = ln.trisectionPoints;
  const t = Triangle.equilateral2P(tp1, tp2, 0);
  t.parent = parent;
  if(parent.isInside(t.v3)) {
    t.v3.mirrorMut(ln.p1, ln.p2);
  }
  return t;
}

function drawFractal(stage) {
  background(0);
  
  triangles.length = 0;
  populate(stage);
  for(const triangle of triangles) {
    triangle.render();
  }
}
