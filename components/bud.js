class Bud{
  // Making a bud of size budlength at (x,y) & opening it
  constructor(x, y, angle, budlength, budwidth){
    this.x = x;
    this.y = y;
    this.by = 400;
    this.angle = angle
    this.finlen =  budlength;
    this.blen = 4
    this.bwid = 2
    this.finwid = budwidth; 
    this.bx = 0;
    this.opening = false

  }

  update(pos, angle) {
    this.x = pos.x
    this.y = pos.y
    this.angle = angle
  }

  grow() {
    // Grow bud if the bud is almost at the top (250)
    // let bwid = this.blen * 0.5;
    if (this.blen > 8) {
      this.opening = true 
      return
    }

    // if (this.by > 100 && this.blen < 8) {
    //   this.by -= .25;
    // }
    // if (this.blen < 8 && this.by < 250) {
      this.blen += .3; 
      this.bwid += .06
    // }
  }

  show() {
  // Draw bud
    stroke(30, 240, 10);
    strokeWeight(3);
    fill(30, 240, 10)
    push()    
      translate(this.x, this.y)
      rotate(this.angle)
      let wid = this.blen;
      bezier(0, 0,    wid+1.2, -10,   wid*2, -20,   -this.bx*5, -this.blen*5.5)
      bezier(0, 0,   -wid+1.2, -10,  -wid*2, -20,    this.bx*5, -this.blen*5.5)
    pop()
  }

  open() {
    // The bud opens so that the flower का ते जोसाने एकदम येते वर
    if(abs(this.bx) > 10) return
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