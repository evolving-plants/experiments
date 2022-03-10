class Stem {
  constructor(x, y, dir, plant) {
    this.plant = plant
    this.pos0 = createVector(x, y)
    this.pos = createVector(x, y)
    this.len = 0
    this.dir = dir
    this.angle = 10
    this.growing = true
    

    // randomness 
    // this.lenr = random(0, )
    this.growthRate = 0.2
    this.distR = 20
    this.maxAngleR = random(40, 60)
    this.angleR = random(40, 60)
    this.heightR = random(0, 5)

    this.init()
  }

  init() {
    if((height-this.pos.y) < this.plant.thresh) {
      this.leaf = new Leaf(
        this.pos.x + cos(this.angle*this.dir) * this.len, 
        this.pos.y + sin(this.angle*this.dir) * this.len, 
        this.angle*this.dir,
        abs(this.plant.genes.geneLeafLength) + random(-8, 8),
        abs(this.plant.genes.geneLeafWidth) + random(-20, 20),
        this.plant
      )
    } else {
      this.seedpod = new SeedPod(this.pos.x, this.pos.y, this.dir, this.angle, this.plant)
      this.bud = new Bud(this.pos.x, this.pos.y, this.angle*this.dir, 8, 4)
      this.flower = new Flower(this.pos.x, this.pos.y, this.angle*this.dir)
    }
  }
  
  grow() {
    if(this.leaf != null) {
      if(this.len < 100) {
        this.len += 10*this.growthRate
      } else {
        this.growing = false
      }
      
    } else {
      if(this.len < this.pos.y*0.15) {
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

    let dx  = cos((90-this.angle)) * this.dir*this.len
    let dy = sin((90-this.angle)) * -1*this.len
    let pos = createVector(
      this.pos.x + dx,
      this.pos.y + dy
    )
    let angle = this.angle*this.dir

    if(this.leaf != null) {
      this.leaf.update(pos, angle)
      this.leaf.grow()
    } else {
      this.seedpod.update(pos, angle)
      this.bud.update(pos, angle)      
      this.flower.update(pos, angle)

      if(this.growing == false || this.bud.opening == true) {
        this.seedpod.grow()
        if(this.seedpod.growing == true) {
          this.flower.grow()
        }
        this.bud.open()
      } else {
        this.bud.grow()
      }
      
    }
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

    if(this.leaf != null) {
      this.showLeaf()
    }
    else {
      this.showPod()
    }
    
  }

  showPod() {
    if(this.bud.opening == true) {
      this.seedpod.show()
      if(this.seedpod.growing == true) {
        this.flower.show()
      }
    }
    this.bud.show()
    
    
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