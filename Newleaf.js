let leaf = [];
let vein = [];
let numveins = 6;
let time = 0;

function setup() {
  createCanvas(600, 400);

  // Find the starting position of each vein
  for (let k = 0; k < numveins; k++) {
    vein[k] = random(-10,10);
  }
}
function draw() {
  background(120,130,190);

  // Draw the main vein

      push();
      translate(cloudx[k], cloudy[k]); 
      for (let i = 0; i < 40; i++) { 
        cloud[i].move();
        cloud[i].show();
      }
      pop();     

}
