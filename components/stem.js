class Stem {
  constructor(x, y, dir, plant) {
    this.plant = plant
    this.pos0 = createVector(x, y)
    this.pos = createVector(x, y)
    this.len = 0
    this.dir = dir
    this.angle = 10
    this.growing = true
    this.seedpod = new SeedPod(this.pos.x, this.pos.y, this.dir, this.angle, this.plant)
    this.leaf = new Leaf(
      this.pos.x + cos(this.angle*this.dir) * this.len, 
      this.pos.y + sin(this.angle*this.dir) * this.len, 
      this.angle*this.dir,
      abs(this.plant.genes.geneLeafLength)*3 + random(-8, 8),
      abs(this.plant.genes.geneLeafWidth)*3 + random(-20, 20),
      this.plant
    )
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
  
  grow() {
    this.len += (this.len < this.pos.y*0.15) ? 10*this.growthRate : 0.0
    this.angle += (abs(this.angle) < this.maxAngleR) ? 1*this.growthRate : 0.0
    if(abs(this.pos0.y-this.pos.y) < this.distR) {
      
      this.pos.y -= this.growthRate * this.heightR
      if(this.pos.y < (height - this.plant.currHeight + 5)) {
        this.pos.y = height - this.plant.currHeight + 5
      }
    } else {

      this.growing = false
    }

    
   

    // update seedpod
    let dx  = cos((90-this.angle)) * this.dir*this.len
    let dy = sin((90-this.angle)) * -1*this.len
    let pos = createVector(
      this.pos.x + dx,
      this.pos.y + dy
    )
    let angle = this.angle*this.dir
    this.seedpod.update(pos, angle)

    // update leaf
    this.leaf.update(pos, angle)
    this.leaf.grow()

    // angle = angle + 30 * this.dir
    // update bud
    this.bud.update(pos, angle)
    
    // update flower
    this.flower.update(pos, angle)
    
  }
  
  show() {

    stroke(30, 240, 10);
    strokeWeight(2);
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
        this.seedpod.grow()
        this.seedpod.show()
        this.flower.grow()
        this.flower.show()
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