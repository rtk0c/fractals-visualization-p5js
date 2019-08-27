/**
 * Base fractal visualization core, including a slider to change stage and a check box to enable animating fractals
 */

let stageDisplay;
let stageSlider;
let animateEnable;

let _maxStage;

function setup() {  
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
  
  frameRate(1 /* Default animate rate = 1 */);
  noLoop();
  // Incase the user didn't create a setupFractal function, we don't want to create a ReferenceError on undefined
  (setupFractal || (() => {}))();
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
