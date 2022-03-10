class SeedPod {
  // Makes the seedpod, calls seed to add the seeds
  // Sets the distances between the seeds in the seedpod and the curvature of the seedpod
  constructor(x, y, dir, angle, plant) {
    this.plant = plant
    this.seeds = []
    this.pos = createVector(x, y)
    this.dir = dir
    this.angle = this.dir * angle
      // Define the number of seeds in a seedpod (this.nSeeds)
    this.nSeeds = 7
      // Define the initial separation distance between seeds
    this.seedSeparation = .001
      // this.scale = createVector(0.5, 0.3)   // delete????

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
    this.seedSeparation += (this.seedSeparation < 40) ? 0.06 : 0.0
    // this.nSeeds += (floor(this.seedSeparation) % 35 == 0) ? 1 : 0
    this.updateSeedPositions()
  }

  // grow() {
// ???? This doesn't seem to be doing anything - so I commented it out
    // this.scale.x += (this.scale.x < 1.0) ? 0.001 : 0.0
    // this.scale.y += (this.scale.y < 1.0) ? 0.001 : 0.0
  // }

  show() {
    // Shows the seedpod with seeds 
    // ??? Why does showPod have to be in seed???
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