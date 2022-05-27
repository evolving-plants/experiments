class Leaf2 {
  constructor(x, y, angle, finLength, fWid1, fWid2, fWid3, plant) {
    this.plant
    this.pos = createVector(x, y)
    this.angle = angle
    this.length = 10
    this.wid1 = fWid1/10
    this.wid2 = fWid2/15
    this.wid3 = fWid3/20
    this.finLength = finLength
    this.finWid1 = fWid1
    this.finWid2 = fWid2
    this.finWid3 = fWid3
    this.growthRate = 15
    this.numveins = 7
    this.rib1 = 2
    this.rib2 = 4
    this.rib3 = 6 
  }

  update(pos, angle) {
    this.pos = pos
    this.angle = angle 
  }

  grow() {
    // Adjust the growth rate of the leaves here 
    this.length += (this.length < this.finLength) ? this.growthRate*.03 : 0.
    this.wid1 += (this.wid1 < this.finWid1)  ? this.growthRate*.035 : 0.
    this.wid2 += (this.wid2 < this.finWid2)  ? this.growthRate*.032 : 0.
    this.wid3 += (this.wid3 < this.finWid3)  ? this.growthRate*.030 : 0.
  }

  show() {
    stroke(30, 240, 10);
    strokeWeight(2);
    fill(50, 200, 20)
  // The first vein will be at sepx*2
    let sepx = this.length / (this.numveins+2)
    let sep = (this.wid2) / this.rib2
  // the above works with rib2 - but should it be numveins????
  // Top of leaf
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle - 90)
    beginShape()
      vertex(0, 0)
      let x1 = sepx
      let y1 = -this.wid1/(this.rib1+1)
      let xs = 0
      let ys = 0
      let sepy = 0

      for (let i = 0; i < this.numveins; i++) {
        x1 += sepx
        if (i < this.rib1) {
          sepy = this.wid1/(this.rib1+1)
          y1 -= sepy
        }
        if (i >= this.rib1 && i < this.rib2) {
          sepy = (this.wid2-this.wid1)/(this.rib2+1-this.rib1)
          y1 -= sepy 
        }
        if (i >= this.rib2 && i < this.rib3) { 
          sepy = (this.wid2-this.wid3)/(this.rib3+1-this.rib2)
          y1 += sepy 
        }
        if (i >= this.rib3) { 
          sepy = (this.wid3-this.wid2/2.0)/(this.numveins+1-this.rib3)
          y1 += sepy
          
        }
        if (y1 >= 0) {
          y1 = 0
          bezierVertex(x1-sepx/4, y1-sep,  x1-sep, y1-sep,  x1, y1)
        } else {
          bezierVertex(x1-sepx+sep*.3, y1+sep*.8,  x1-sep*.5, y1-sep*.8,  x1, y1)
        }
      }
      bezierVertex(x1+sepx/2, -sep, this.length, y1,  this.length, 0);
    endShape();
  pop()
  
  // Bottom of leaf
  push()
  translate(this.pos.x, this.pos.y)
  rotate(this.angle - 90)
    beginShape();
      vertex(0, 0);
      x1 = 0
      y1 = -this.wid1/(this.rib1+1)
      xs = 0
      ys = 0
      for (let i = 0; i < this.numveins; i++) {
        x1 += sepx
        if (i < this.rib1) {
          sepy = this.wid1/(this.rib1+1)
          y1 -= sepy
        }
        if (i >= this.rib1 && i < this.rib2) {
          sepy = (this.wid2-this.wid1)/(this.rib2+1-this.rib1)
          y1 -= sepy 
        }
        if (i >= this.rib2 && i < this.rib3) {
          sepy = (this.wid2-this.wid3)/(this.rib3+1-this.rib2)
          y1 += sepy 
        }
        if (i >= this.rib3) {
          sepy = (this.wid3-this.wid2/2.0)/(this.numveins+1-this.rib3) 
          y1 += sepy
        }
        if (y1 >= 0) { 
          y1 = 0
          bezierVertex(x1-sepx/4, -y1+sep,  x1-sep, -y1+sep,  x1, -y1)
        } else {
          bezierVertex(x1-sepx+sep*.3, -y1-sep*.8,  x1-sep*.5, -y1+sep*.8,  x1, -y1) 
        }    
      }
      bezierVertex(x1+2*sepx/2-sepx, sep, this.length+sepx/2, -y1,  this.length, 0);
    endShape();
  pop()

  push()
  translate(this.pos.x, this.pos.y)
  rotate(this.angle - 90)
  
  // Draw main rib
    noStroke();
    fill(90, 250, 10)
    let lc = this.length
    let wc = this.wid2
    bezier( -sepx/2, 0,  lc*.3, wc*.1,  lc*.3,-wc*.25,   lc, 0)
    bezier( -sepx/2, 0,  lc*.2, wc*.3,  lc*.7,-wc*.2,   lc, 0)
    
  // Draw the veins
      x1 = sepx
      y1 = -this.wid1/(this.rib1+1)
      xs = 0
      ys = 0
      for (let i = 0; i < this.numveins; i++) {
        x1 += sepx
        if (i < this.rib1) {
          sepy = this.wid1/(this.rib1+1)
          y1 -= sepy
        }
        if (i >= this.rib1 && i < this.rib2) {
          sepy = (this.wid2-this.wid1)/(this.rib2+1-this.rib1)
          y1 -= sepy 
        }
        if (i >= this.rib2 && i < this.rib3) {
          sepy = (this.wid2-this.wid3)/(this.rib3+1-this.rib2)
          y1 += sepy 
        }
        if (i >= this.rib3) {
          sepy = (this.wid3-this.wid2/2.0)/(this.numveins+1-this.rib3)
          y1 += sepy
        }
        if (y1 | 0) { 
          bezier(x1-1.5*sepx, 0,   x1-sepx*.8,0,  x1-sepx*.1, y1,   x1, y1)  
          bezier(x1-1.5*sepx, 0,   x1-sepx,0,  x1-sepx, -y1,   x1-sepx, -y1)  
        }
      }
  pop()
}
whither() {
  // Make the leaf dry up and whither away 
  this.length -= (this.length > this.finLength*0.6) ? this.growthRate*.05 : 0.
  this.wid1 -= (this.wid1 > this.finWid1*0.9)  ? this.growthRate*.040 : 0.
  this.wid2 -= (this.wid2 > this.finWid2*0.8)  ? this.growthRate*.032 : 0.
  this.wid3 -= (this.wid3 > this.finWid3*0.8)  ? this.growthRate*.030 : 0.
}
}