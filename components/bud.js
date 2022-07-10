class Bud extends Growable {
  // Making a bud at (x,y) with given angle from the stem & opening it
  // The initial (tiny) bud length and width is 4 and 2  
  // The bud grows to final length budlength 
  // The bud width is half of the bud length

  constructor(x, y, angle, budlength, plant){
    super()
    this.pos = createVector(x, y)
    this.angle = angle
    this.length = budlength
    this.plant
    // The bud opens by incrementing bx & blen, moving the tip in a semicircle
    // When this.bx = 0, the bud does not open
    this.bx = 0;

    this.seedpod = new SeedPod(
      this.pos.x,
      this.pos.y, 
      this.angle < 0 ? -1 : 1,
      abs(this.angle),
      this.plant,
      this.pos
    )
    this.flower = new Flower(
      this.pos.x, 
      this.pos.y,
      this.angle
    )
    this.children.push(this.seedpod, this.flower)
  }

// The bud is at the end of the stem, at the same angle as the stem
// The position is updated as the stem grows
  update(pos, angle) {
    this.pos = pos
    this.angle = angle

    this.seedpod.update(pos, angle)
    this.flower.update(pos, angle)
  }

  grow() {
    this.growMe()
    // Check if the bud has reached its final length so it will then open
    
    if(this.time > 150) {
      this.growChildren()
    } 
    else if (this.time > 90) {
      this.blen = sin(this.time*1.5 - 90/4) * this.length
      this.open()
    } else {
      this.blen = this.length/2 + sin(this.time) * this.length/2; 
      
    }

    if(this.time == 150) {
      console.log("bud growing ends: params")
      console.log(this.blen) // -3.8268343236508966 
      console.log(this.bx) // 4.5
    }

    this.seedpod.grow()
    this.flower.grow() 
  }

  draw() {

    if(this.time > 90) {
      this.flower.drawBack()
      this.seedpod.draw()
      this.flower.drawFront()

    }

    
    // Draw bud
    stroke(30, 240, 10);
    fill(30, 240, 10);
    strokeWeight(1);
    push()    
      translate(this.pos.x, this.pos.y)
      rotate(this.angle)
      let wid = this.blen;
      bezier(0, 0,   -wid+1.2, -10,  -wid*2, -20,    this.bx*5, -this.blen*5.5)
      bezier(0, 0,    wid+1.2, -10,   wid*2, -20,   -this.bx*5, -this.blen*5.5)
    pop()

  }

  open() {
    // The bud opens so that the flower 
    // The tip y coordinate decreases from +finlength to -finlength,
    // The tip x coordinate increases until crossing the x-axis, then decreases
    
    if (this.blen > 0) {
      this.bx += .15 * this.timer.inc 
    } else {
      this.bx -= .15 * this.timer.inc 
    } 
    
  }
}