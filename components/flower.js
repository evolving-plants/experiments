class Flower{
  // Making a flower at (x,y), growing & opening it
  constructor(x, y, angle){
    this.x = x;
    this.y = y;
    this.angle = angle
    this.lincrement = 10;
    this.wincrement = 10;
  }

  update(pos, angle) {
    this.x = pos.x
    this.y = pos.y
    this.angle = angle
  }

  grow() {
    // Grow flower
    if(this.lincrement < 50) {
      this.lincrement += 1;
      this.wincrement += 1;      
    }
  }

  show() {
    // Draw flower
    stroke(250, 200, 0);
    strokeWeight(2);
    fill(250, 230, 0)
    let linc = this.lincrement;
    let winc = this.wincrement;
    push()    
    translate(this.x, this.y)
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
      // Second petal
      beginShape();
        vertex(0, 0);
        bezierVertex( 5+winc*.3,  0-linc*.05,  -3+winc*.05,-25-linc*.2,    -1+winc*.4,-20-linc*1);
        bezierVertex(-5+winc*.8,-20-linc*1.8,  -5+winc*2.7, -3-linc*.7,  -20+winc*2.2,4-linc*2.6); 
        bezierVertex(-0+winc*.7,   -5-linc*4,   -6+winc*.1,-20-linc*1.1,   -5+winc*.1,-10-linc*1.4);
        bezierVertex(-2-winc*.3, -3-linc* .1,           -1, 0,                      0,  0);
      endShape();
        // Third petal
      beginShape();
        vertex(0, 0);
        bezierVertex(-5-winc*.3,  0-linc*.05,  1-winc*.05,-25-linc*.2,    1-winc*.5,-20-linc*.8);
        bezierVertex( 1-winc*.5,-20-linc* .8,   1-winc*.3, -1+linc*.5,  20-winc*2.2, -3-linc*.3);
        bezierVertex(15-winc* 3, -5-linc*1.1,     5-winc,-30-linc*1.2,    5-winc*.5,-10-linc*1.5);
        bezierVertex( 2+winc*.3, -3-linc* .1,          1, 0,                      0,  0);
      endShape();
    // Fourth petal
      beginShape();
        vertex(0, 0);
        bezierVertex(-5-winc*.3,  0-linc*.05,  3-winc*.05,-25-linc*.2,    1-winc*.4,-20-linc*1);
        bezierVertex( 5-winc*.8,-20-linc*1.8,  5-winc*2.7, -3-linc*.7,  20-winc*2.2, 4-linc*2.6);
        bezierVertex( 0-winc*.7, -5-linc*4,     6-winc*.1,-20-linc*1.1,   5-winc*.1,-10-linc*1.4);
        bezierVertex( 2+winc*.3, -3-linc* .1,           1, 0,                     0,  0);
      endShape();
    pop();
  }
}