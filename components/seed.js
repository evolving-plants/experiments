class Seed extends Growable {
  // Makes a seed at the given position determined in seedpod
  // Makes the seed grow to a max of seediam
  // Draws a seedpod
  // Drops the seed
  constructor(x, y, plant, seediam, posEnd) {
    super()
    this.seediam = seediam
    this.plant = plant
    // The position of a seed is pos (in pod or dropping)
    //The seed position in the seedpod is podPos (after seed dropped)
    this.posEnd = createVector(x, y)
    this.pos = createVector(x, y)
    this.podPos = createVector(x, y)
    // The seed diameter is incremented by this.r
    this.r = 0.01
    this.dropping = false
    this.plantR = 30
    this.plantG = 240
    this.plantB = 10

    // Create the random points just above the ground to drop the seeds to
    this.dropPoint = createVector(
      random(0, width),
      height-10
    )
  }

  update(pos, posEnd) {
    if(this.dropping == true) {
      this.drop()
      this.podPos = pos
      this.posEnd = posEnd
      return
    }
    this.pos = pos
    this.podPos = pos
    this.posEnd = posEnd
  }

  grow() {

    if(this.time > 550) {
      this.growChildren()
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

  drawPod() {
    // Draw a seedpod
    push()
    translate(this.podPos.x, this.podPos.y)
    stroke(this.plantR, this.plantG, this.plantB);
    strokeWeight(3);
    fill(this.plantR, this.plantG, this.plantB)
    circle(0, 0, this.r*2.2)

    //Show the end of the seedpod
    let nx = .2*this.posEnd.x
    let ny = this.posEnd.y
    strokeWeight(5);
      bezier(0,0,  nx*1.2,ny*.05, nx*.5,ny*.5,  nx,ny)
      bezier(0,0, -nx*1.2,ny*.05, -nx*.05,ny*.5,  nx,ny)
    pop()
  }

  // Drop the seeds to the point just above the ground
  drop() {
    if(this.pos.y < height-10) {
      this.pos.add(this.dropVector)
    }
  }
}