/**
 * Base fractal visualization core, including a slider to change stage and a check box to enable animating fractals
 */

let ONE_THIRD_PI;
let ONE_SIXTH_PI;
let SQRT_3;

let stageDisplay;
let stageSlider;
let animateEnable;

let _maxStage;

let _overriddenCanvas = false;

function setup() {  
  frameRate(1 /* Default animate rate = 1 */);
  noLoop();

  ONE_THIRD_PI = PI/3;
  ONE_SIXTH_PI = PI/6;
  SQRT_3 = sqrt(3);

  // Incase the user didn't create a setupFractal function, we don't want to create a ReferenceError on undefined
  (setupFractal || (() => {}))();

  if(!_overriddenCanvas) {
    createCanvas(400, 400);
    setupInputs();
  }
}

function setupInputs() {
  stageSlider = createSlider(0, 6 /* Default max stage */, 4, 1);
  stageSlider.input(() => {
    stageDisplay.innerHTML = stageSlider.value();
    redraw();
  });
  stageDisplay = document.createElement('span');
  stageDisplay.id = 'stage';
  stageDisplay.classList.add('stage-display');
  stageDisplay.innerHTML = stageSlider.value();
  document.body.appendChild(stageDisplay);
  
  animateEnable = createCheckbox('Animation', false);
  animateEnable.changed(b => {
    if(b) {
      loop();
    } else {
      noLoop();
    }
  });
}

function draw() {
  if(animateEnable.checked()) {
    const next = stageSlider.value() + 1;
    stageSlider.value(next > _maxStage ? 0 : next);
    stageDisplay.innerHTML = stageSlider.value();
  }
  
  (drawFractal || (v => {}))(stageSlider.value());
}

/**
 * Maximum fractle stage the generator have
 */
function maxStage(m) {
  _maxStage = m;
  stageSlider.elt.max = m;
}

/**
 * Number of animation frames the generator should go through per second
 */
function animateRate(n=0) {
  frameRate(1/n);
}

function setCanvasSize(w, h) {
  _overriddenCanvas = true;
  createCanvas(w, h);
  setupInputs();
}
