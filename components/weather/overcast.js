class Overcast {
  // Make a cloudysky that consists of 300 droplets
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.droplets = [];
    // Define the position and radius of each droplet
    for (let i = 0; i < 300; i++) {
      this.x = random(-700,-50);
      this.y = random(-20,180);
      this.r = random(200,300)
      this.disp = random(10,100)
      this.stay = false
      this.droplets[i] = new Droplet(this.x, this.y, this.r, 620, 200);
    }
  }
  // The huge cloud moves in and stops moving when it hits the edge
  move() {
    if (this.stay == false || clearing == true) {
    this.pos.x += .5
    }
    // When overcast clouds reach the edge of the sky, 
    // they stop moving and lightning is signaled,
    // except when it is clearing up
    if (this.pos.x > 630 && clearing == false) {
      this.stay = true
      lightnin = true
      overcome = false
    } 
  }
  show() {
    push();
      translate(this.pos.x, this.pos.y); 
      for(let i = 0; i < this.droplets.length; i++) {
        this.droplets[i].jiggle()
        this.droplets[i].show()
      }
    pop();     
  }
} 