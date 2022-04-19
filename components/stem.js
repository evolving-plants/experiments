class Stem {
// Makes a stem for a leaf (petiole) or a bud that becomes a flower & seedpod
// and also direct the creation of a new leaf 
// The initial position of the stem is at this.pos0
// The stem begins growing when the stalk is at this.pos0 
// The stem position grows with this.pos (as the stalk grows).
// The final stem length depends on its position on the stalk.
// The stems of leaves (petioles) will all have final lengths of leafstemlen
// The angle between stem and stalk is this.angle, 
// which begins at 0 and ends at this.maxAngleR
// The number of leaves on the plant is nleaves - a selection variable
  constructor(x, y, dir, plant, nleaves, droppetals) {
    this.plant = plant
    this.nleaves = nleaves
    // Create vectors for the initial and present position of each stem on the stalk:
    this.pos0 = createVector(x, y)
    this.pos = createVector(x, y)
    // Start growing the stem from a length of 0
    this.len = 0
    // Whether the stem is on the right or left is determined by this.dir 
    this.dir = dir
     // Start growing the stem from an angle of 0.1
    this.angle = 0.1
    // Count the number of stems with numstem
    this.numstem = 0
    // Set the final stem length for all leaves - not working?????
    this.leafstemlen = .5
    this.growing = true
    

    // randomness 
    // this.lenr = random(0, )
    this.growthRate = 0.1
    this.distR = 20
    this.maxAngleR = random(40, 60)
    this.angleR = random(40, 60)
    this.heightR = random(0, 5)

    this.init()
  }

  init() {
    // decide whether to put leaf or bud & seedpod on stem
    // All stems below thresh will have leaves, above will have buds
    if((height-this.pos.y) < this.plant.thresh) {
      this.leaf2 = new Leaf2(
        this.pos.x + cos(this.angle*this.dir) * this.len, 
        this.pos.y + sin(this.angle*this.dir) * this.len, 
        this.angle*this.dir,
        // Find the random different sizes of leaves on this plant
        // leaf length was + random(-6,6)
        abs(this.plant.genes.leafLength) + random(-8, 8),
        abs(this.plant.genes.leafWid1) + random(-8, 8),
        abs(this.plant.genes.leafWid2) + random(-8, 8),
        abs(this.plant.genes.leafWid3) + random(-8, 8),
        // Adjust the above ???????
        this.plant
      )
    } else {
      this.seedpod = new SeedPod(this.pos, this.dir, this.angle, this.plant)
      this.bud = new Bud(this.pos, this.angle*this.dir, 8)
      this.flower = new Flower(this.pos, this.angle*this.dir)
    }
  }
  
  grow() {
  // The stem keeps growing until it reaches finalstemlength
  // This will make the final stem lengths shorter towards the top of the plant
  // But leaves will all have the same final stem length (50)
    // let finalstemlength = this.pos.y*.15
    // if (this.numstem <= 4) {
    //   this.numstem += 1
    //   finalstemlength = this.leafstemlen
    // }
    // this.len += (this.len < finalstemlength) ? 10*this.growthRate : 0.0
    if(this.leaf2 != null) {
      // The final stem length for all leaves is set here
      if(this.len < 50) {
        this.len += 10*this.growthRate
      } else {
        this.growing = false
      }
      // The following is for the stems of buds (was .15))
    } else {
      if(this.len < 80 + this.pos.y*0.1) {
        this.len += 10*this.growthRate
      } else {
        this.growing = false
      }
      
    }
    this.angle += (abs(this.angle) < this.maxAngleR) ? 1*this.growthRate : 0.0
    if(abs(this.pos0.y-this.pos.y) < this.distR) {
      
      this.pos.y -= this.growthRate * this.heightR 
      if(this.pos.y < (height - this.plant.currHeight + 5)) {
        this.pos.y = height - this.plant.currHeight + 5
      } 
    }

    // update position of seedpod on the stalk
    let dx  = cos((90-this.angle)) * this.dir*this.len
    let dy = sin((90-this.angle)) * -1*this.len
    let pos = createVector(
      this.pos.x + dx,
      this.pos.y + dy
    )
    let angle = this.angle*this.dir

    if(this.leaf2 != null) {
      this.leaf2.update(pos, angle)
      this.leaf2.grow()
    } else {
      this.seedpod.update(pos, angle)
      this.bud.update(pos, angle)      
      this.flower.update(pos, angle)

      if(this.bud.opening == true) {
        this.seedpod.grow()
        if(this.seedpod.growing == true) {
          this.flower.grow()
        } else {
          this.flower.dropping = true
        }
        this.bud.open()
      } else {
        this.bud.grow()
      }
    }
  }
  
  show() {
    // Draw the stem
    stroke(30, 240, 10);
    strokeWeight(5);
    fill(50, 220, 20)
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle*this.dir)
    line(0, 0, 0, -this.len)
    pop()

    if(this.leaf2 != null) {
      this.showLeaf2()
    }
    else {
      this.showPod()
    }
  }

  showPod() {
    if(this.bud.opening == true) {
      this.flower.showBack()
    }
    this.seedpod.show()
    this.flower.showFront()
    this.bud.show()
  }

  // Confusion ?????
  showLeaf2() {
    this.leaf2.show()
  }
}