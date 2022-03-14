let cloud = [];
let rain = [];
let cloudx = [];
let cloudy = [];
let cloudysky = [];
let lightning = [];
let lightx = 200;
let lighty = 00;
let lightw = 10;
let numclouds = 6;
let changeR = 120;
let changeG = 130;
let changeB = 190;

function setup() {
  createCanvas(600, 400);

  // Find the starting position of each cloud
  for (let k = 0; k < numclouds; k++) {
    cloudx[k] = random(-600,10);
    cloudy[k] = random(0,height-200);
  }
  // Define each cloud
  for (let i = 0; i < 40; i++) {
    let x = random(-40,+60);
    let y = random(-20,20);
    let r = random(10, 100);
    cloud[i] = new Cloudy(x, y, r);
  }
  // Define rain
    for(let i = 0; i < 300; i++) {
    rain[i] = new Rain();
  }
  // Define a cloudy sky
  for (let i = 0; i < 500; i++) {
    let x = random(width);
    let y = random(-20, 150);
    let r = random(10, 120);
    cloudysky[i] = new Cloudy(x, y, r);
  }
  // Define a bolt of lightning
  for (let i = 0; i < 10; i++) {
    lightx += 10 * random(-1,1);
    lightw = random (1,10);
  lightning[i] = new Lightning(lightx, lighty, lightw); 
  }
}

function draw() {
  background(120,130,190);
  let m = millis();
  // Scattered clouds
  if(m < 5000) {
    for (let k = 0; k < numclouds; k++) {
      push();
      translate(cloudx[k], cloudy[k]); 
      for (let i = 0; i < 40; i++) { 
        cloud[i].move();
        cloud[i].show();
      }
      pop();     
    }
  } else {
    // Getting stormy
    if(m > 6000) {
      // background changes
      changeR -= .2;
      changeG -= .3;
      changeB -= .5;
      background(changeR, changeG, changeB);
    
      for (let k = 0; k < numclouds; k++) {
        push();
        translate(cloudx[k], cloudy[k]-100); 
        for (let i = 0; i < 80; i++) { 
          cloudysky[i].move();
          cloudysky[i].show(); 
        }
        pop(); 
      }    
    }
  } 
  if(m > 8500) {
    background(160,165,180);
  }
    // Lightning
  if(m > 7800 && m < 8500) {
    background(0);
  }
  if(m > 8000 && m < 8500) {
    for(let bolt of lightning) {
      bolt.make();
    }     
  }
  // Dense clouds
  if(m > 8000) {
    for(let ice of cloudysky) {
      ice.stay();
      ice.show();
    }
  }
  // Rain
  if(m > 8500) {
    for(let drop of rain) {
      drop.show();
      drop.move();
    }
  }
}

class Cloudy {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  move() {
   this.x += .5 * random(-1.2, 2.6);
    // this.x += .5 * random(-1.2, 1.6);
    this.y += random(-.3, .3); 
    if (this.x > width+600) {
      return;
    }
  }
  stay() {
    this.x += 0.05 * random(-1, 1);
    this.y += random(-1, 1.01); 
    if (this.x > width) {
      this.x = 0;
    }
  }
  show() {
    fill(255,20);
    noStroke();
    ellipse(this.x, this.y, this.r);
  }
}

class Rain {
  constructor() {
    this.x = random(0, width);
    this.y = random(50, height)
    // Change const to adjust speed of rainfall
    // between .1 and 3 works best
    this.const = 2;
  }
  show() {
    stroke(255,255,255,100);
    strokeWeight(1);
    line(this.x + random(-2,2), this.y - 3*random(2,5), this.x, this.y); 
    stroke(255);
    fill(100);
    circle(this.x, this.y, 2.2)
  }
  move() {
    this.speed = this.const * random(5, 20);
    this.y = this.y + this.speed;  
    if (this.y > height) {
      this.y = random(0, -height);
    }
}
}

class Lightning {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }
  make() {
    background(0);
    stroke(255);
    noFill();
    strokeWeight(this.w);
    beginShape();
      for(let i = 0; i< 100; i++) {
        if (this.y >= 0 && this.y <= height+100) {
          this.x += 20 * random(-1.01,1.01);
          this.y += 30 * random(.01,1.01);
           vertex(this.x, this.y); 
        }
      }     
     endShape();
  }
}
