class Bud{
  // Making a bud of final length budlength at (x,y) & opening it
  // The initial bud length and width is 4 and 2
  // ???? If bud length and width eventually will not be defined here - why pass them as variables ????
  constructor(x, y, angle, budlength, budwidth){
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y)
    this.by = 400;
    this.angle = angle
    this.finlen =  budlength;
    this.blen = 4
    this.bwid = 2
    // this.finwid = budwidth;  // delete ????
    this.bx = 0;
    this.opening = false

    this.r = 10

  }
// The bud is at the end of the stem, at the same angle as the stem
  update(pos, angle) {
    this.x = pos.x
    this.y = pos.y
    this.pos = pos
    this.angle = angle
  }

  grow() {
    // Check if the bud has reached its final length so it will then open
    if (this.blen > this.finlen && this.by > this.blen) {
      this.opening = true 
      return
    }
    // Make the bud grow at the speeds defined here
      this.blen += .03; 
      this.bwid += .006
  }

  show() {
  // Draw bud
    stroke(30, 240, 10);
    fill(30, 240, 10);
    strokeWeight(1);

    push()    
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)
    let wid = this.blen;
    bezier(0, 0,  wid+1.2, -10,  wid*2, -20, -this.bx*5, -wid*5.5)
    bezier(0, 0, -wid+1.2, -10, -wid*2, -20,  this.bx*5, -wid*5.5)
    // stroke('pink')
    // circle(wid, -10, 10)
    // circle(b)
    // rect(0, 0, this.r*2, this.r*2)
    pop()
  }

  open() {
    // The bud opens so that the flower का ते जोसाने एकदम येते वर
    // The tip y coordinate decreases from +finlength to -finlength, while
    // the tip x coordinate increases until it crosses the x-axis, then decreases
    // I don't know what the following line is for, so I commented it out ????
    // if(abs(this.bx) > 10) return
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