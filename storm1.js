let clouds = [];
let rain = [];
let cloudysky
let lightning = [];
let lightx = 200;
let lighty = 00;
let lightw = 10;
let numclouds = 30;
let changeR = 140;
let changeG = 150;
let changeB = 230;
let moreclouds = false
let overcome = false
let lightnin = false
let raining = false
let clearing = false
let lessrain = false

function setup() {
  createCanvas(600, 400);

  // Define the starting position of each cloud
  for (let i = 0; i < numclouds; i++) {
    let x = random(-900,-100);
    let y = random(-60,160);
    clouds[i] = new Cloud(x, y);
  }
  
  // Define rain
    for(let i = 0; i < 300; i++) {
    rain[i] = new Rain();
  }
  
  // Define a cloudy sky
  cloudysky = new Overcast(x, y, clearing, lightnin, overcome)
  
  // Define a bolt of lightning
  for (let i = 0; i < 10; i++) {
    lightx += 10 * random(-8,8);
    lightw = random (1,10);
  lightning[i] = new Lightning(lightx, lighty, lightw); 
  }
}

function draw() {

  // Set background changes
    //Getting stormy
  if(overcome == true && raining == false) {
    changeR -= .04;
    changeG -= .04;
    changeB -= .07;
  }
    // Grey sky while raining
  if(raining == true) {
    changeR = 160;
    changeG = 165;
    changeB = 180;
  }
    // Sky clearing up
  if (clearing == true) {
    if (changeR > 141) {
    changeR -= .04;
    changeG -= .04;
    changeB += .08;
    }
  }
    background(changeR, changeG, changeB);
  
  // Lightning
  if(raining == false && lightnin == true && clearing == false) {
    for(let bolt of lightning) {
      bolt.make();
    }     
  }
  
    // Move overcast clouds in or out
  if(overcome == true || clearing == true) {
    cloudysky.move() 
    cloudysky.show()
  } else {
  // Display overcast clouds whenever it is raining
  if (raining == true)
    cloudysky.show()
  }
  
  // Rain
  if (raining == true) {
    // // Rain signals overcast clouds to stop moving
    // overcome = false
    if (lessrain == false) {
      for(let drop of rain) {
        drop.show();
        drop.move();
      } 
    } else {
      for(let i = 0; i < 50; i++) {
        rain[i].show();
        rain[i].move();
      }
    }
  }
  // Add more clouds
  if(moreclouds == true) {
    for (let i = 6; i < numclouds; i++) { 
      clouds[i].show();
      clouds[i].move();
    }
  }

  // Scattered clouds will appear throughout
  for (let i = 0; i < 6; i++) { 
    clouds[i].show();
    clouds[i].move();
  }
    // The following is for clouds to reappear after clearing up
  if (changeR > 140 && changeB > 214) {
    clearing = false
    lightnin = false
    for (let i = 10; i < 14; i++) { 
      clouds[i].show();
      clouds[i].move();
    }
  }
}