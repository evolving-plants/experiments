class Cloud {
  // Make a cloud at pos.x, pos.y that consists of 40 droplets
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.droplets = [];
    // Define the position and radius of each droplet
    for (let i = 0; i < 40; i++) {
      this.x = random(-120,0);
      this.y = random(0,60);
      this.r = random(60,140)
      this.disp = random(20,100)
      this.timer = 0
      this.droplets[i] = new Droplet(this.x, this.y, this.r, 170, 100);
    }
  }
  // The clouds move in & re-enter from left after leaving at right
  // They keep changing shape due to the jiggling and displacement
  move() {
    this.pos.x += .5
    if (this.pos.x > 760) {
      this.timer ++
      
      // It's time to become cloudier
      if (this.timer == 1) {
        moreclouds = true 
      }
      // It's time to become overcast
      if (this.timer == 2) {
        overcome = true 
      }
      // Decrease the rain
      if (this.timer == 4) {
        lessrain = true
      }
      // Its time to stop raining and stop being overcast
      // and have less clouds
      if (this.timer == 5) {
        moreclouds = false 
        clearing = true
        raining = false
      }
      // There is some displacement when the cloud re-enters
      if (clearing == false) {
        this.pos.x = this.pos.x - 750 - this.disp
        this.pos.y = this.pos.y + 100
        if (this.pos.y > 150) {
          this.pos.y = this.pos.y - 150
        }
      // Maybe the following is not needed? 
        if (this.pos.y < -20) {
          console.log(this.pos.y)
          this.pos.y = this.pos.y + 100
        }
      } else {
        return
      }
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