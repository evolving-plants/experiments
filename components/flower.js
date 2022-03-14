class Flower{
  // Making a flower at pos(x,y), growing & opening it
  constructor(pos, angle){
    this.pos = pos
    this.angle = angle
    this.lincrement = 10;
    this.wincrement = 10;
    this.dropping = false
    // Adjust the direction and speed of petal dropping here
    this.dropVector = createVector(random(0, 20), random(0, 20))
  }

  update(pos, angle) {
    if(this.dropping == false) {
      this.pos = pos
      this.angle = angle
    } else {
      // The petals dry up
      this.wincrement -= this.wincrement < 0.3 ? 0.0 : 0.5;
      this.drop()
    }
  }

  grow() {
    // Grow flower
    if(this.lincrement < 50) {
      this.lincrement += 1;
      this.wincrement += 1;      
    } 
  }

  showBack() {
    // Draw back flower petals
    stroke(250, 200, 0);
    strokeWeight(2);
    fill(250, 230, 0)
    let linc = this.lincrement;
    let winc = this.wincrement;
    push()    
      translate(this.pos.x, this.pos.y)
      rotate(this.angle)
      scale(0.3);
    // unfolding flower:
    // Second petal
      beginShape();
        vertex(0, 0);
        bezierVertex( 5+winc*.3,  0-linc*.05,  -3+winc*.05,-25-linc*.2,    -1+winc*.4,-20-linc*1);
        bezierVertex(-5+winc*.8,-20-linc*1.8,  -5+winc*2.7, -3-linc*.7,  -20+winc*2.2,4-linc*2.6); 
        bezierVertex(-0+winc*.7,   -5-linc*4,   -6+winc*.1,-20-linc*1.1,   -5+winc*.1,-10-linc*1.4);
        bezierVertex(-2-winc*.3, -3-linc* .1,           -1, 0,                      0,  0);
      endShape();
     // Fourth petal
      beginShape();
        vertex(0, 0);
        bezierVertex(-5-winc*.3,  0-linc*.05,  3-winc*.05,-25-linc*.2,    1-winc*.4,-20-linc*1);
        bezierVertex( 5-winc*.8,-20-linc*1.8,  5-winc*2.7, -3-linc*.7,  20-winc*2.2, 4-linc*2.6);
        bezierVertex( 0-winc*.7, -5-linc*4,     6-winc*.1,-20-linc*1.1,   5-winc*.1,-10-linc*1.4);
        bezierVertex( 2+winc*.3, -3-linc* .1,           1, 0,                     0,  0);
      endShape();
    pop()
    if(this.lincrement > 45 && this.dropping == false){
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.3);
        rotate(-10);
        this.showStamen(-190);
      pop()
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.3);
        rotate(-18);
        this.showStamen(-170);
      pop();
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.3);
        rotate(-26);
        this.showStamen(-120);
      pop();
    }
  }

  showFront() {
    // Draw front flower petals
    stroke(250, 200, 0);
    strokeWeight(2);
    fill(250, 230, 0)
    let linc = this.lincrement;
    let winc = this.wincrement;
    push()    
      translate(this.pos.x, this.pos.y)
      rotate(this.angle)
      scale(0.3);
    // unfolding flower:
    // First petal
      beginShape();
        vertex(0, 0);
        bezierVertex(  5+winc*.3,  0-linc*.05, -1+winc*.05,-25-linc*.2,    -1+winc*.5,-20-linc*.8);
        bezierVertex( -1+winc*.5,-20-linc* .8,  -1+winc*.3, -1+linc*.5,  -20+winc*2.2, -3-linc*.3);
        bezierVertex(-15+winc* 3, -5-linc*1.1,     -5+winc,-30-linc*1.2,   -5+winc*.5,-10-linc*1.5);
        bezierVertex( -2-winc*.3, -3-linc* .1,          -1, 0,                      0,  0);
      endShape();
    // Third petal
      beginShape();
        vertex(0, 0);
        bezierVertex(-5-winc*.3,  0-linc*.05,  1-winc*.05,-25-linc*.2,    1-winc*.5,-20-linc*.8);
        bezierVertex( 1-winc*.5,-20-linc* .8,   1-winc*.3, -1+linc*.5,  20-winc*2.2, -3-linc*.3);
        bezierVertex(15-winc* 3, -5-linc*1.1,     5-winc,-30-linc*1.2,    5-winc*.5,-10-linc*1.5);
        bezierVertex( 2+winc*.3, -3-linc* .1,          1, 0,                      0,  0);
      endShape();
    pop()
    if(this.lincrement > 45 && this.dropping == false){
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.3);
        rotate(10);
        this.showStamen(190);
      pop()
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.3);
        rotate(18);
        this.showStamen(170);
      pop();
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.3);
        rotate(26);
        this.showStamen(120);
      pop();
    }
  }

  // Drop the flower petals to the ground or off the canvas
  drop() {
    if(this.pos.y < height+10) {
      // The following adds a little flutter to the dropping petals
      this.pos.y += random(0,10)
      this.pos.x += random(-5,10)
      this.pos.add(this.dropVector)
    }  
  }
  showStamen(stalen) {
    // Draw a stamen in the flower beginning at (0,0) of length abs(stalen)
    // If stalen < 0, rotate the anther counterclockwise
    this.stalen = stalen
    let yd = abs(this.stalen)
    stroke(210, 140, 10)
    strokeWeight(3)
    noFill()
    bezier(0,0, this.stalen*.1,0, -this.stalen*.2,-yd*.8,  0, -yd)
    // Draw anther
    fill(250, 200, 0)
         push()
          translate(0, -yd)
          rotate(120 * this.stalen/yd)
          ellipse(0+random(-3,3), 0+random(-3,3), 36, 14)
         pop()
      // }
    pop()
  }
}