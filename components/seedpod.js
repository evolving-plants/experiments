class SeedPod {
  // Makes the seedpod, calls seed to add the seeds
  // Sets the distances between the seeds in the seedpod and the curvature of the seedpod
  constructor(pos, dir, angle, plant) {
    this.plant = plant
    this.seeds = []
    this.pos = pos
    this.dir = dir
    this.angle = this.dir * angle
      // Define the number of seeds in a seedpod (this.nSeeds)
    this.nSeeds = 7
      // Define the initial separation distance between seeds
    this.seedSeparation = .001
    this.scale = createVector(0.5, 0.3)
    this.growing = true

    for(let i = 0; i < this.nSeeds; i++) {
      this.seeds.push(new Seed(0, 0, this.plant,10))
    }
    this.updateSeedPositions()
    
  }
  update(pos, angle) {
    // Positions the seedpod at the end of the stem and
    // makes separation between seeds
    this.pos = pos
    this.angle = angle
  }

  grow() {
    this.seedSeparation += (this.seedSeparation < 40) ? 0.06 : 0.0
    // this.nSeeds += (floor(this.seedSeparation) % 35 == 0) ? 1 : 0
    this.updateSeedPositions()

    if(this.growing == true) {
      this.scale.x += 0.001
      this.scale.y += 0.001
    }
    if (this.scale.x >= 1.0 || this.scale.y >= 1.0) {
      this.growing = false
    }
  }

  show() {
    // Shows the seedpod with seeds 
    this.seeds.forEach((seed, i) => {
      seed.showPod()
    })
    this.seeds.forEach((seed, i) => {
      seed.show()
    })
  }

  updateSeedPositions() {
    // The curvature of the seedpod is determined here
    let sx = 0
    let sy = 0
    let sep = this.seedSeparation
    for(let i = 0; i < this.nSeeds; i++) {
      let seed = this.seeds[i]
      if(seed == null) {
        seed = new Seed(0, 0, this.plant, 10)
        this.seeds.push(seed)
      }
      sx = sx + sep * 1/(i+2) * this.dir
      sy = sy - sep *(0.5 - 1/(i+2)) 
      let pos = createVector(sx, sy)
      pos = p5.Vector.add(this.pos, pos)
      pos.y -= 10
      pos.x -= 5 * this.dir
      seed.update(pos)
    }
  }
}