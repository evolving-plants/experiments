class Seed {
  // Makes a seed at the given position determined in seedpod
  // Makes the seed grow to a max of seediam
  // Draws a seedpod
  // Drops the seed
  constructor(x, y, plant, seediam) {
    this.seediam = seediam
    this.plant = plant
    // Do we need pos0 here????
    this.pos0 = createVector(x, y)
    this.pos = createVector(x, y)
    this.podPos = createVector(x, y)
    // The seed diameter is incremented by this.r
    this.r = 0.01
    this.dropping = false
    // this.diam = 2

    // Create the random points on the ground to drop the seeds to
    // ????? What is height doing ????
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

    this.r += (this.r < this.seediam) ? 0.01 : 0.0
    
  }

  show() {
    // Draw a seed
    push()
    translate(this.pos.x, this.pos.y)
    stroke(210, 140, 10)
    strokeWeight(2)
    fill(250, 220, 20)
    circle(0, 0, this.r)
    pop()
  }

  showPod() {
    // Draw a seedpod
    push()
    // Why is this not this.pos.x, this.pos.y ????
    translate(this.podPos.x, this.podPos.y)
    stroke(30, 240, 10);
    strokeWeight(2);
    fill(30, 240, 10)
    ellipse(0, 0, this.r*2.5, this.r*2.5)
    pop()
  }

  // Drop the seeds to a point just above the ground
  drop() {
    if(this.pos.y < height-10) {
      this.pos.add(this.dropVector)
    }
  }
}