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
    // Set the final stem length for all leaves
    this.leafstemlen = 50
    this.growing = true
    // Create a new seedpod
    this.seedpod = new SeedPod(this.pos.x, this.pos.y, this.dir, this.angle, this.plant)
    // Create a new leaf, based on the characteristics of the parent plant
    this.leaf = new Leaf(
      this.pos.x + cos(this.angle*this.dir) * this.len, 
      this.pos.y + sin(this.angle*this.dir) * this.len, 
      this.angle*this.dir,
      abs(this.plant.genes.geneLeafLength)*1 + random(-22, 22),
      abs(this.plant.genes.geneLeafWidth)*1 + random(-8, 8),
      this.plant
    )
    // Create a new bud
    this.bud = new Bud(this.pos.x, this.pos.y, this.angle*this.dir, 8, 4)
    this.budIsOpening = true
    this.flower = new Flower(this.pos.x, this.pos.y, this.angle*this.dir)

    // randomness 
    // this.lenr = random(0, )
    this.growthRate = 0.2
    this.distR = random(20, 60)
    this.maxAngleR = random(40, 60)
    this.angleR = random(40, 60)
    this.heightR = random(0, 5)
  }
  
  // The stem keeps growing until it reaches finalstemlength
  // This will make the final stem lengths shorter towards the top of the plant
  // But leaves will all have the same final stem length (this.leafstemlen)
  grow() {
    let finalstemlength = this.pos.y*.15
    if (this.numstem <= 4) {
      this.numstem += 1
      finalstemlength = this.leafstemlen
    }
    this.len += (this.len < finalstemlength) ? 10*this.growthRate : 0.0
    this.angle += (abs(this.angle) < this.maxAngleR) ? 1*this.growthRate : 0.0
    if(abs(this.pos0.y-this.pos.y) < this.distR) {
      
      this.pos.y -= this.growthRate * this.heightR
      if(this.pos.y < (height - this.plant.currHeight + 5)) {
        this.pos.y = height - this.plant.currHeight + 5
      }
    } else {

      this.growing = false
    }

    // update position of seedpod on the stalk
    let dx  = cos((90-this.angle)) * this.dir*this.len
    let dy = sin((90-this.angle)) * -1*this.len
    let pos = createVector(
      this.pos.x + dx,
      this.pos.y + dy
    )
    let angle = this.angle*this.dir
    this.seedpod.update(pos, angle)

    // update position of leaf
    this.leaf.update(pos, angle)
    this.leaf.grow()

    // angle = angle + 30 * this.dir
    // update bud
    this.bud.update(pos, angle)
    
    // update position of flower
    this.flower.update(pos, angle)
    
  }
  
  show() {
    // Draw the stem
    stroke(30, 240, 10);
    strokeWeight(4);
    fill(50, 220, 20)
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle*this.dir)
    line(0, 0, 0, -this.len)
    pop()
    
  }

  showBud() {
    this.bud.show()
  }

  showFlower() {
      this.flower.show()    
  }
   
  showSeedPod() {
    this.seedpod.show()
  }

  showPod() {
    if(this.growing == false) {
      

      if(this.bud.opening == true) {
        // this.seedpod.grow()
        // this.seedpod.show()
        this.flower.grow()
        this.flower.show()
        // Make the petals wither away after the seeds have reached maximum diameter ????

        // ???? I commented out seedpod.grow because it was not doing anything
        // this.seedpod.grow()
        this.seedpod.show()
        this.bud.open()
        
      } else {
        this.bud.grow()
      }

      this.bud.show()
    } 
    else {
      this.bud.show()
    }
    // if(this.budIsOpening == true) {
    //   this.bud.open()
    //   this.bud.show()
    // }
    
  }

  // Confusion ?????
  showLeaf() {
    this.leaf.show()
  }

  oldShowLeaf() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle*this.dir)
    translate(0, -this.len)
    scale(1, 1)
    // circle(0, 0, 10)
    // circle(0, -this.length, 10)
    stroke(30, 240, 10);
    strokeWeight(2);
    fill(50, 220, 20)
    bezier(
      0, 0, 
      30, -15,
      30, -15,
      0, -this.len
    )
    bezier(
      0, 0, 
      -30, -15,
      -30, -15,
      0, -this.len
    )
    pop()
  
  }
  
  // delete ????
  oldShowSeedPod() {
    let startp = createVector(0, -this.len*1/4)
    let endp = createVector(
      0, -this.len
    )
    let n = 5
    let m = map(this.pos.y, 0, height, 
                2, 10)
    strokeWeight(2)
    beginShape()
    curveVertex(0, 0)
    // curveVertex(0, 0)
    for(let i = 0; i < n; i++) {
      
      let t = i/n
      let p = p5.Vector.lerp(startp, endp, t)
      let mid = p5.Vector.lerp(startp, endp, t-(1/n*0.5))
      let tan = p.copy()
      tan.setMag(m)
      tan.rotate(-90)
      let p3 = mid.copy().add(tan)
      tan.setMag(m*0.5)
      let p4 = p.copy().add(tan)
      // push()
      // translate(p3.x, p3.y)
      // circle(0, 0, 10)
      // pop()
      curveVertex(p3.x, p3.y)
      curveVertex(p4.x, p4.y)
      
    }
    // curveVertex(0, -this.len)
    for(let i = 0; i < n; i++) {
      let t = i/n
      let p = p5.Vector.lerp(endp, startp, t)
      let mid = p5.Vector.lerp(endp, startp, t+(1/n*0.5))
      let tan = p.copy()
      tan.setMag(m)
      tan.rotate(90)
      let p3 = mid.copy().add(tan)
      tan.setMag(m*0.5)
      let p4 = p.copy().add(tan)
      
      //  push()
      // translate(p3.x, p3.y)
      // circle(0, 0, 10)
      // pop()
      curveVertex(p4.x, p4.y)
      curveVertex(p3.x, p3.y)
      
      
    }
    
    // curveVertex(0, 0)
    // curveVertex(0, 0)
    endShape(CLOSE)
  }
}