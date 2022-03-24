class Bud{
  // Making a bud at (x,y) with given angle from the stem & opening it
  // The initial (tiny) bud length and width is 4 and 2  
  // The bud grows to final length budlength 
  // The bud width is half of the bud length

  constructor(pos, angle, budlength){
    this.pos = pos
    // Is the following line needed???? Are the above lines needed????
    this.angle = angle
    this.finlen =  budlength;
    // The bud grows in size by incrementing blen and bwid
    this.blen = 4
    this.bwid = this.blen/2
    // The bud opens by incrementing bx & blen, moving the tip in a semicircle
    // When this.bx = 0, the bud does not open
    this.bx = 0;
    this.by = 400;
    this.opening = false

  }
// The bud is at the end of the stem, at the same angle as the stem
// The position is updated as the stem grows
  update(pos, angle) {
    this.pos = pos
    this.angle = angle
  }

  grow() {
    // Check if the bud has reached its final length so it will then open
    if (this.blen > this.finlen) {
      this.opening = true 
      return
    }
    // Make the bud grow
      this.blen += .03; 
      this.bwid += .006
  }

  show() {
  // Draw bud
  // Why not keep colours in separate functions????
    stroke(30, 240, 10);
    fill(30, 240, 10);
    strokeWeight(1);
    push()    
      translate(this.pos.x, this.pos.y)
      rotate(this.angle)
      let wid = this.blen;
      bezier(0, 0,    wid+1.2, -10,   wid*2, -20,   -this.bx*5, -this.blen*5.5)
      bezier(0, 0,   -wid+1.2, -10,  -wid*2, -20,    this.bx*5, -this.blen*5.5)
    pop()
  }

  open() {
    // The bud opens so that the flower का ते जोसाने एकदम येते वर
    // The tip y coordinate decreases from +finlength to -finlength,
    // The tip x coordinate increases until crossing the x-axis, then decreases
    if (this.blen <= this.finlen+.5 && this.blen > -this.finlen*0.5) {
      this.blen -= .2; 
      if (this.blen > 0) {
        this.bx += .15 
      } else {
        this.bx -= .15       
      }
    }
  }
}