class Bud{
  // Making a bud of size budlength at (x,y) & opening it
  constructor(x, y, angle, budlength, budwidth){
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y)
    this.by = 400;
    this.angle = angle
    this.finlen =  budlength;
    this.blen = 4
    this.bwid = 2
    this.finwid = budwidth; 
    this.bx = 0;
    this.opening = false

    this.r = 10

  }

  update(pos, angle) {
    this.x = pos.x
    this.y = pos.y
    this.pos = pos
    this.angle = angle
  }

  grow() {
    // let bwid = this.blen * 0.5;
    if (this.blen > 8 || this.r > 20) {
      this.opening = true 
      return
    }
    // if (this.r > 20) {
    //   this.opening = true 
    //   return
    // }

    // if (this.by > 100 && this.blen < 8) {
    //   this.by -= .25;
    // }
    // if (this.blen < 8 && this.by < 250) {
      this.blen += .3; 
      this.bwid += .06
      this.r += 0.1
    // }
  }

  show() {
  // Draw bud
    stroke(30, 240, 10);
    strokeWeight(3);
    fill(30, 240, 10)
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
    // console.log(this.opening, this.bx)
    // if(abs(this.bx) > 10) return
    if (this.angle > 180) return 
    this.angle += 10
    if (this.blen <= this.finlen+0.5 && this.blen > -this.finlen*0.5) {
      this.blen -= .2; 
      if (this.blen > 0) {
        this.bx += .15 
      } else {
        this.bx -= .15       
      }
    }
  }
}