class Plant {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.maxHeight = height*2/3
    this.currHeight = 20
    this.stems = [
      new Stem(this.pos.x, this.pos.y, -1)
    ]
    this.selected = false
    this.growing = true

    this.heightR = random(0.1, 0.5)
    this.frameR = floor(random(300, 600))
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
        b.showSeedPod()
      }
    }


  }

  grow() {
    
    if(this.currHeight > this.maxHeight) {
      this.growing = false
      return
    }

    // growth
    this.currHeight += this.heightR
    if(frameCount % this.frameR == 0) {
      let last = this.stems[this.stems.length-1]
      let dir = (this.stems.length % 2 == 0) ? -1 : 1
      this.stems.push(new Stem(
        this.pos.x, 
        (height - this.currHeight),
        dir
      ))
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
      seeds.forEach(seed => seed.drop())
    })
  }

}