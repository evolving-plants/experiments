class Leaf {
  constructor(x, y, angle, finLength, finWidth, plant) {
    this.plant
    this.pos = createVector(x, y)
    this.angle = angle
    this.length = 10
    this.width = 10
    this.finLength = finLength
    this.finWidth = finWidth
    this.growthRate = 3
  }

  update(pos, angle) {
    this.pos = pos
    this.angle = angle  
  }

  grow() {
    this.length += (this.length < this.finLength) ? this.growthRate*3 : 0.
    this.width += (this.width < this.finWidth)  ? this.growthRate*2 : 0.
  }


  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle)
    stroke(30, 240, 10);
    strokeWeight(3);
    fill(50, 200, 20)

    let lc = this.length;
    let wc = this.width;
    beginShape();
    vertex(0, 0);
    bezierVertex(   0+wc*1, 0-lc*1,   2.5+wc*.1,-2-lc*.5,   2.5+wc*.2,-2-lc*.5);
    bezierVertex(2.5+wc*1,-2-lc*1.4,    3+wc*.1,-4-lc*1.2,     3+wc*.3,-4-lc*1.2);
    
    bezierVertex( 3+wc*1,  -4-lc*1.7,  3+wc*.2,-6.5-lc*1.7,    3+wc*.5, -6.5-lc*1.8);
    bezierVertex( 3+wc*1.,-6.5-lc*2,   2.5+wc*.3,-8.5-lc*2.2,  2.5+wc*.5, -8.5-lc*2.4);
    
    bezierVertex(2.5+wc*.6,-8.5-lc*2.5,   1+wc*.4,-11-lc*2.8,          0,-10-lc*3);
    bezierVertex( -1-wc*.7, -1-lc*2.6,  -2-wc*.4, -7-lc*2.6,   -1-wc*.5, -11-lc*2.3);
    
    bezierVertex( -2-wc*1.2,-9-lc*1.7,    -3-wc*.1,-7-lc*1.6,    -3-wc*.4, -7-lc*1.6);
    bezierVertex( -3-wc*1,-7-lc*1,      -3-wc*.1,-5-lc*1,      -3-wc*.3, -5-lc*1);
    
    bezierVertex(  -3-wc*1, -5-lc*1,  -2.5-wc*.1,-3-lc*.5,   -2.5-wc*.2, -3-lc*.5);
    bezierVertex(-2.5-wc*1, -3-lc*1,             0, 0,                      0,  0);
    endShape();

    // Draw main rib
    fill(30, 250, 10)
    stroke(30, 240, 10);
    bezier( 0, 0,  4+wc*.1, 0,   2,-5-lc*2,   0,-10-lc*3)
    bezier( 0, 0, -4-wc*.1, 0,  -2,-5-lc*2,   0,-10-lc*3)
    
    // Draw 6 veins
    // noFill();
    for (let i = 0;i < 6; i++) {
      // line (0,-lc*.5, wc*.4, -lc*1.1)
      // line (0,-lc*1.2, wc*.4, -lc*1.7)
      // line (0,-lc*1.9, wc*.35, -lc*2.4)
      bezier(0, -4-lc*(i+1)*.3,   wc*.1,-5-lc*(i+1)*.4,  wc*.2,-5-lc*(i+1)*.4,  wc*.4,-5-lc*(i+1)*.45)     
      bezier(0, 2-lc*(i+1)*.3,   -wc*.1, 2-lc*(i+1)*.4,  -wc*.2,2-lc*(i+1)*.4, -wc*.4, 2-lc*(i+1)*.45)      
    }
    pop()
  }
}