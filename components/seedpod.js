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


    this.plantR = 30
    this.plantG = 240
    this.plantB = 10

    for(let i = 0; i < this.nSeeds; i++) {
      const seed = new Seed(0, 0, this.plant,this.seediam)
      this.seeds.push(seed)
      this.children.push(seed)
      this.plant.allChildren.push(seed)
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

      this.plantR += (this.plantR < 230) ? .3 * this.timer.inc : 0.
      this.plantG -= (this.plantG > 205) ? .1 * this.timer.inc : 0.
      this.plantB += (this.plantB < 135) ? .1 * this.timer.inc : 0. 
    

    }

    if(this.time == 550) {
      console.log("seedpod growind end: params")
      console.log(this.seedSeparation) // 19.02099999999998
    }

  }

  draw() {
    // Shows the seedpod with seeds 
    let sx = 0
    let sy = 0
    let sep = this.seedSeparation
    for(let i = 0; i < this.nSeeds; i++) {
      let seed = this.seeds[i]
      sx = sx + sep * 1/(i+2) * this.dir
      sy = sy - sep *(0.5 - 1/(i+2)) 
      let posFromBase = createVector(sx, sy)
      posFromBase = p5.Vector.add(this.pos, posFromBase)

      posFromBase.y -= 10
      posFromBase.x -= 5 * this.dir
      //The above repositions the pod on the end of the stem

      // Create a vector for the position of the pod end:
      let posEnd = createVector(sx, sy)
      
      this.drawPod(posFromBase, posEnd)
      
    } 

    this.seeds.forEach((seed, i) => {
      seed.draw()
    })
  }

  drawPod(pos, posEnd) {
    // Draw a seedpod
    push()
    translate(pos.x, pos.y)
    stroke(this.plantR, this.plantG, this.plantB)
    strokeWeight(3)
    fill(this.plantR, this.plantG, this.plantB)
    circle(0, 0, 5*2.2)

    //Show the end of the seedpod
    let nx = .2*posEnd.x
    let ny = posEnd.y
    strokeWeight(5);
      bezier(0,0,  nx*1.2,ny*.05, nx*.5,ny*.5,  nx,ny)
      bezier(0,0, -nx*1.2,ny*.05, -nx*.05,ny*.5,  nx,ny)
    pop()
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
      let posFromBase = createVector(sx, sy)
      posFromBase = p5.Vector.add(this.pos, posFromBase)

      posFromBase.y -= 10
      posFromBase.x -= 5 * this.dir
      //The above repositions the pod on the end of the stem

      // Create a vector for the position of the pod end:
      let posEnd = createVector(sx, sy)
      
      
      seed.update(posFromBase, posEnd)
      
    } 
  }
}