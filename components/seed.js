class Seed {
  constructor(x, y) {
    this.pos0 = createVector(x, y)
    this.pos = createVector(x, y)
    this.r = 5
    this.dropping = false

    this.dropVector = createVector(
      random(-5, 5),
      random(0, 10)  
    )
  }

  update(pos) {
    if(this.dropping == true) {
      this.drop()
      return
    }
    this.pos = pos
    
  }

  show() {
    push()
    translate(this.pos.x, this.pos.y)
    // stroke(30, 240, 10);
    // strokeWeight(2);
    // fill(50, 220, 20)
    // ellipse(0, 0, this.r*4, this.r*8)
    stroke(210, 140, 10)
    strokeWeight(2)
    fill(250, 220, 20)
    circle(0, 0, this.r*2)
    pop()
  }

  drop() {
    
    if(this.pos.y < height) {
      this.pos.add(this.dropVector)
    }
    
    
  }
}