function setupFractal() {
  canvas(400, 400);
  maxStage(8);
}

function drawFractal(stage) {
  let pattern = 'F-G-G';
  let unitLength = 320;
  for(let i = 0; i < stage; ++i) {
    unitLength /= 2;
    pattern = pattern
      .replace(/G/g, 'GG')
      .replace(/F/g, 'F-G+F+G-F');
  }
  
  noFill();
  stroke(255);
  strokeWeight(1);
  const DEG_120 = PI/3*2;
  let x = width/2;
  let y = 40;
  let d = HALF_PI + PI/6;
  
  beginShape();
  vertex(x, y);
  for(let i = 0; i < pattern.length; ++i) {
    const c = pattern.charAt(i);
    switch(c) {
      case 'F':
      case 'G': {
        x += cos(d) * unitLength;
        y += sin(d) * unitLength;
        vertex(x, y);
        break;
      }
      case '+': {
        d += DEG_120;
        break;
      }
      case '-': {
        d -= DEG_120;
        break;
      }
    }
  }
  endShape(CLOSE);
}
