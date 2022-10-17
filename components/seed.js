class Seed extends Growable {
  // Makes a seed at the position determined in seedpod
  // Makes the seed grow to a max of seediam
  // Drops selected seeds (after they are fully grown)
  constructor(x, y, plant, seediam) {
    super()
    this.seediam = seediam // dont really need
    this.plant = plant
    // The position of a seed is pos (in pod or dropping)

    this.pos = createVector(x, y)

    // The seed diameter is incremented by this.r
    this.r = 0.01

    // Initially, the seed coat is green (130,210,20)
    this.seedR = 130
    this.seedG = 210
    this.seedB = 20

    // Create the random points just above the ground to drop the seeds to
    this.dropPoint = createVector(
      random(0, width),
      height-250
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
          
      // Seed coat turns dark brown (150,100,20) at end of growth
      if(this.r > this.seediam*.4) {
        this.seedR += (this.seedR < 150) ? 2* this.timer.inc  :0
        this.seedG -= (this.seedG > 100) ? 2* this.timer.inc  :0
        // this.seedB -= (this.seedB > 10) ? 2* this.timer.inc  :0
      }
    }

    // if(this.time == 550) {
    //   console.log("seed growing end: params")
    //   console.log(this.r) // 5.009999999999938 
    // }
    
  }

  draw() {
    // Draw a seed
    push()
    translate(this.pos.x, this.pos.y)
    stroke(this.seedR, this.seedG, this.seedB)
    strokeWeight(1)
    fill(250, 220, 20)
    circle(0, 0, this.r)
    pop()
  }

  // Drop the seeds to the point just above the ground
  drop() {
    if(this.pos.y < height-250) {
      this.pos.add(this.dropVector)
    }
  }
}