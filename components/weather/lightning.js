class Lightning {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.timer = 0;
  }
  make() {
    background(0);
    stroke(255);
    noFill();
    beginShape();
    let x = this.x, y = this.y
      for(let i = 0; i< 100; i++) {
        if (this.y >= 0 && this.y <= height+100) {
          x += 20 * random(-1.01,1.01);
          y += 30 * random(.01,1.01);
          strokeWeight(this.w + random(-4,1));
          vertex(x, y); 
        }
      }     
     endShape();
    // lightnin = true
    // After passing 10 times, lightnin will signal that it's time to stop lightning and start raining
      this.timer ++
      if (this.timer == 10) {
      lightnin = false 
      raining = true
      }
  }
}