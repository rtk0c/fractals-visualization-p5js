let stageSlider;
let fillEnable;
let animateEnable;

function setup() {
  createCanvas(600, 600);

  const redrawEvent = () => redraw();
  stageSlider = createSlider(0, 8, 4, 1);
  stageSlider.input(redrawEvent);
  fillEnable = createCheckbox('Fill', false);
  fillEnable.changed(redrawEvent);
  animateEnable = createCheckbox('Animation', false);
  animateEnable.changed(b => {
    if(b) {
      frameRate(1);
      loop();
    } else {
      noLoop();
    }
  });

  noLoop();
}

function draw() {
  if(animateEnable.checked()) {
    const next = stageSlider.value() + 1;
    stageSlider.value(next > 8 ? 0 : next);
  }

  background(220);

  const limit = stageSlider.value();
  // L: Move & draw one unit length in the current direction
  // +: Rotate clockwise 60 degress
  // -: Rotate counter clockwise 60 degress
  let pattern = 'L--L--L';
  let unitLength = 320;
  for(let i = 0; i < limit; ++i) {
    unitLength /= 3;
    pattern = pattern.replace(/L/g, 'L+L--L+L');
  }

  if(fillEnable.checked()) {
    fill(80);
  } else {
    noFill();
  }
  stroke(0);
  strokeWeight(2);
  let x = width/2;
  let y = 100;
  let d = HALF_PI + PI/6;
  beginShape();
  for(let i = 0; i < pattern.length; ++i) {
    const c = pattern.charAt(i);
    switch(c) {
      case 'L': {
        x += cos(d) * unitLength;
        y += sin(d) * unitLength;
        vertex(x, y);
        break;
      }
      case '+': {
        d += PI/3;
        break;
      }
      case '-': {
        d -= PI/3;
        break;
      }
    }
  }
  endShape(CLOSE);
}
