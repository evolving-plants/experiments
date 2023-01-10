class Seed extends Growable {
  // Makes a seed at the given position determined in seedpod
  // Makes the seed grow to a max of seediam
  // Draws a seedpod
  // Drops the seed
  constructor(x, y, plant, seediam) {
    super()
    this.seediam = seediam
    this.plant = plant
    // The position of a seed is pos (in pod or dropping)
    //The seed position in the seedpod is podPos (after seed dropped)

    this.pos = createVector(x, y)

    // The seed diameter is incremented by this.r
    this.r = 0.01

    this.plantR = 30
    this.plantG = 240
    this.plantB = 10

    // Create the random points just above the ground to drop the seeds to
    this.dropPoint = createVector(
      random(0, width),
      height-10
    )
  }

  update(pos) {
    this.pos = pos

  }

  grow() {

    if(this.time > 550) {
      this.growChildren()

      if(this.plant.selected === true) {
        this.dropVector = p5.Vector.sub(this.dropPoint, this.pos).normalize().mult(10) 
        this.drop()
      }

    } 
    else {
      // Increase the seed diameter until it reaches the maximum (this.seediam)
      this.r += (this.r < this.seediam) ? 0.01 * this.timer.inc : 0.0
          
      // Turn pale yellow at end of growth
      if(this.r > this.seediam*.9) {
        this.plantR += (this.plantR < 245) ? 2 :0
        this.plantG += (this.plantG < 240) ? 1 :0
        this.plantB -= (this.plantB > 190) ? 3 :0
      }
    }


    if(this.time == 550) {
      console.log("seed growing end: params")
      console.log(this.r) // 5.009999999999938
    }
    
  }

  draw() {
    // Draw a seed
    push()
    translate(this.pos.x, this.pos.y)
    stroke(210, 140, 10)
    strokeWeight(2)
    fill(250, 220, 20)
    circle(0, 0, this.r)
    pop()
  }

  // Drop the seeds to the point just above the ground
  drop() {
    if(this.pos.y < height-10) {
      this.pos.add(this.dropVector)
    }
  }
}