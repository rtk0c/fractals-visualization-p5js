let triangles = [];

function setupFractal() {
  setCanvasSize(400, 400);
  maxStage(8);
}

function populate(limit) {
  const p = new Point(width/2, 40);
  triangles.push(Triangle.equilateral(p, HALF_PI, 320));
  
  for(let i = 0; i < limit; ++i) {
    const prev = triangles;
    triangles = [];
    for(const t of prev) {
      const v1v2m = bisect(t.v1, t.v2);
      const v1v3m = bisect(t.v1, t.v3);
      const v2v3m = bisect(t.v2, t.v3);
  
        triangles.push(new Triangle(t.v1, v1v2m, v1v3m));
        triangles.push(new Triangle(v1v2m, t.v2, v2v3m));
        triangles.push(new Triangle(v1v3m, t.v3, v2v3m));
    }
  }
}

function drawFractal(stage) {
  background(0);
  
  triangles.length = 0;
  populate(stage);
  for(const t of triangles) {
    t.render();
  }
}
