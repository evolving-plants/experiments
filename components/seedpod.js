class SeedPod {
  constructor(x, y, dir, angle, plant) {
    this.plant = plant
    this.pos = createVector(x, y)
    this.nSeeds = 7
    this.seeds = []
    this.length = 100
    this.width = this.length*1/3
    this.dir = dir
    this.angle = this.dir * angle
    this.scale = createVector(0.5, 0.3)
    this.seedSeparation = 2

    for(let i = 0; i < this.nSeeds; i++) {
      this.seeds.push(new Seed(0, 0, this.plant))
    }
    this.updateSeedPositions()
    
  }
  update(pos, angle) {
    this.pos = pos
    this.angle = angle
    this.seedSeparation += (this.seedSeparation < 40) ? 0.1 : 0.0
    // this.nSeeds += (floor(this.seedSeparation) % 35 == 0) ? 1 : 0
    this.updateSeedPositions()
  }

  grow() {

    this.scale.x += (this.scale.x < 1.0) ? 0.001 : 0.0
    this.scale.y += (this.scale.y < 1.0) ? 0.001 : 0.0
    
  }

  show() {
    this.seeds.forEach((seed, i) => {
      seed.showPod()
    })
    this.seeds.forEach((seed, i) => {
      seed.show()
    })
  }

  updateSeedPositions() {
    let sx = 0
    let sy = 0
    let sep = this.seedSeparation
    for(let i = 0; i < this.nSeeds; i++) {
      let seed = this.seeds[i]
      if(seed == null) {
        seed = new Seed(0, 0, this.plant)
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


  drawBud() {
    push()
    
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)
    scale(1, 1)
    // circle(0, 0, 10)
    // circle(0, -this.length, 10)
    stroke(30, 240, 10);
    strokeWeight(2);
    fill(50, 220, 20)
    noFill()
    bezier(
      0, 0, 
      30, -15,
      30, -15,
      0, -this.length
    )
    bezier(
      0, 0, 
      -30, -15,
      -30, -15,
      0, -this.length
    )
    pop()
  }

}