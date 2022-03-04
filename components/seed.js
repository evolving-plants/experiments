class Seed {
  constructor(x, y, plant) {
    this.plant = plant
    this.pos0 = createVector(x, y)
    this.pos = createVector(x, y)
    this.podPos = createVector(x, y)
    this.r = 0.25
    this.dropping = false

    // this.dropVector = createVector(
    //   random(-5, 5),
    //   random(0, 10)  
    // )
    this.dropPoint = createVector(
      random(0, width),
      height
    )
  }

  update(pos) {
    if(this.dropping == true) {
      this.drop()
      this.podPos = pos
      return
    }
    this.pos = pos
    this.podPos = pos


    this.r += (this.r < 5) ? 0.03 : 0.0
    
  }

  show() {
    push()
    translate(this.pos.x, this.pos.y)
    stroke(210, 140, 10)
    strokeWeight(2)
    fill(250, 220, 20)
    circle(0, 0, this.r*2)
    pop()

    
  }

  showPod() {
    push()
    translate(this.podPos.x, this.podPos.y)
    stroke(30, 240, 10);
    strokeWeight(2);
    fill(50, 220, 20)
    ellipse(0, 0, this.r*3.5, this.r*3.5)
    pop()
  }

  drop() {
    if(this.pos.y < height) {
      this.pos.add(this.dropVector)
    }
  }
}