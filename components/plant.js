class Plant {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.maxHeight = random(height*1/2, height*4/5)
    this.currHeight = 20
    this.stems = []
    this.selected = false
    this.growing = true

    this.heightR = random(10, 20)
    this.growthRate = 0.1
    this.inserting = false
    this.timer = 0
    this.beat = 150
    this.interStemDist = random(100, 150)

    this.genes = {
      geneLeafLength: 0,
      geneLeafWidth: 0
    }

  }

  init() {
    // this.genes[geneLeafLength] = geneLeafLength
    // this.genes[geneLeafWidth] = geneLeafWidth
    this.stems.push(new Stem(this.pos.x, this.pos.y, -1, this))
  }

  show() {
    
    if(this.selected) {
      stroke('red')
      strokeWeight(3)
      noFill()
      circle(this.pos.x, this.maxHeight*0.5, 200)
    }

    stroke(30, 240, 10);
    strokeWeight(4);
    fill(50, 220, 20)
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y-this.currHeight)
  
    for(let i = 0; i < this.stems.length; i++) {
      let b = this.stems[i]
      b.grow()
      b.show()

      if((height-b.pos.y) < (this.maxHeight*1/3)) {
        b.showLeaf()
      }
      else {
        b.showPod()
      }
    }


  }

  grow() {
    
    if(this.currHeight > this.maxHeight) {
      this.growing = false
      return
    }

    // growth
    this.currHeight += this.heightR*this.growthRate
    this.timer += 1
    this.beat = (this.beat - 0.5) < 40 ? this.beat : this.beat - 0.5
    this.inserting = (floor(this.timer) % floor(this.beat) == 0)
    if(this.inserting == true) {
      let last = this.stems[this.stems.length-1]
      let dir = (this.stems.length % 2 == 0) ? -1 : 1
      let ny = (height - this.currHeight) 
      this.stems.push(new Stem(this.pos.x, ny, dir, this))
    }
     
  }

  select() {
    if(this.growing == true) return
    this.selected = true
    return this
  }

  dropSeeds() {
    this.stems.forEach(stem => {
      let seeds = stem.seedpod.seeds
      seeds.forEach(seed => {
        seed.dropping = true
        if(seed.dropVector != null) return
        seed.dropVector = p5.Vector.sub(seed.dropPoint, seed.pos).normalize().mult(10)
      })
    })
  }

}