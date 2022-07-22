class SeedPod extends Growable {
  // Makes the seedpod, calls seed to add the seeds
  // Sets the distances between the seeds in the seedpod and the curvature of the seedpod
  constructor(x, y, dir, angle, plant, posEnd) {
    super()
    this.plant = plant
    this.seeds = []
    this.pos = createVector(x, y)
    this.posEnd = posEnd
    this.dir = dir
    this.angle = this.dir * angle
      // Define the number of seeds in a seedpod (this.nSeeds)
    this.nSeeds = 7
    // this.nSeeds = this.plant.genes.numSeeds + floor(random(-1.4,1.4))
    // Check ????? - every pod on same plant should have numSeeds +- 1 seeds
    if (this.nSeeds < 3) {this.nSeeds = 3}
    if (this.nSeeds > 14) {this.nSeeds = 14}
      // Define the initial separation distance between seeds
    this.seedSeparation = .001
    // this.seediam = this.plant.genes.seediam + random(-1,1)
    this.seediam = 5
    this.scale = createVector(0.5, 0.3)
    this.growing = true  // NOTE: needs to be false

    for(let i = 0; i < this.nSeeds; i++) {
      const seed = new Seed(0, 0, this.plant,this.seediam)
      this.seeds.push(seed)
      this.children.push(seed)
    }
    this.updateSeedPositions()
  }
  update(pos, angle, posEnd) {
    // Positions the seedpod at the end of the stem  
    this.pos = pos
    // this.posEnd = posEnd
    this.angle = angle
  }

  grow() {  
    this.growChildren()

    if(this.time > 550){  // 550
    }
    else {
      // makes separation between seeds increase
      this.seedSeparation += (this.seedSeparation < this.seediam*3.8) ? 0.06 * this.timer.inc : 0.0
      // this.nSeeds += (floor(this.seedSeparation) % 35 == 0) ? 1 : 0
      this.updateSeedPositions()

    }

    if(this.time == 550) {
      console.log("seedpod growind end: params")
      console.log(this.seedSeparation) // 19.02099999999998
    }



    // if(this.growing == true) {
    //   this.scale.x += 0.001
    //   this.scale.y += 0.001
    // }
    // if (this.scale.x >= 1.0 || this.scale.y >= 1.0) {
    //   this.growing = false
    // }
  }

  draw() {
    // Shows the seedpod with seeds 
    this.seeds.forEach((seed, i) => {
      seed.drawPod()
    })
    this.seeds.forEach((seed, i) => {
      seed.draw()
    })
  }

  updateSeedPositions() {
    // The curvature of the seedpod is determined here
    let sx = 0
    let sy = 0
    let sep = this.seedSeparation
    for(let i = 0; i < this.nSeeds; i++) {
      let seed = this.seeds[i]
      sx = sx + sep * 1/(i+2) * this.dir
      sy = sy - sep *(0.5 - 1/(i+2)) 
      let pos = createVector(sx, sy)
      pos = p5.Vector.add(this.pos, pos)

      pos.y -= 10
      pos.x -= 5 * this.dir
      //The above repositions the pod on the end of the stem

      // Create a vector for the position of the pod end:
      let posEnd = createVector(sx, sy)
      
      seed.update(pos, posEnd)
      // seed.grow()
    } 
  }
}