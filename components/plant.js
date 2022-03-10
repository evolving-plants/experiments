class Plant {
  // Makes plant: draws the stalk, calls stem
  // Drops seeds
  // Generation tells plant what to do
  constructor(x, y) {
      // Create vector for the initial position of each  on the stalk
    this.pos = createVector(x, y)
      // Define the maximum height of the plant, relative to the canvas height
      // This could become a selection variable instead
    this.maxHeight = random(height*1/2, height*4/5)
    this.currHeight = 20
      // Create the s array for making new stem 
    this.stems = []
    this.selected = false
    this.growing = true
    this.numstem = 0
    this.nleaves = 3

    this.heightR = random(10, 20)
    this.growthRate = 0.08
    this.inserting = false
    this.timer = 0
    this.beat = 150
    // interStemDist is not used anywhere ???? delete ????
    // this.interStemDist = random(100, 150)

    this.genes = {
      geneLeafLength: random(10, 20),
      geneLeafWidth: random(5, 10), 
      interNodeDist: 50, 
      numLeaves: 5
    }
    
    this.thresh = this.genes.interNodeDist * this.genes.numLeaves
  }

  init() {
    // this.genes[geneLeafLength] = geneLeafLength
    // this.genes[geneLeafWidth] = geneLeafWidth
    // ??? I do not understand the use of push here ???
    this.stems.push(new Stem(this.pos.x, this.pos.y, -1, this, this.nleaves))
  }

  show() {
    // Draw a circle to show that the plant is selected
    if(this.selected) {
      stroke('red')
      strokeWeight(3)
      noFill()
      circle(this.pos.x, height-this.currHeight, 200)
    }
    // Draw the stalk
    stroke(30, 240, 10);
    strokeWeight(8);
    fill(50, 220, 20)
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y-this.currHeight)
  
    // ??? I wish I understood the reason for the existence of b .....???
    for(let i = 0; i < this.stems.length; i++) {
      let b = this.stems[i]
      b.show()
    }

  }

  grow() {
    // if(this.growing == true) {
      this.stems.forEach(stem => stem.grow())
    // }
    
    if(this.currHeight > this.maxHeight) {
      this.growing = false
      return
    }

    // growth
    // Not sure if this is the best way to do this because we want internode distance to be a selection variable ????
    this.currHeight += this.heightR*this.growthRate
    this.timer += 1
    this.beat = (this.beat - 0.5) < 40 ? this.beat : this.beat - 0.5
    if((height-this.pos.y) < this.thresh) {
      this.inserting = (this.timer % this.genes.interNodeDist == 0)
      if(this.inserting == true) {
        let last = this.stems[this.stems.length-1]
        let dir = (this.stems.length % 2 == 0) ? -1 : 1
        let ny = last.pos.y - this.genes.interNodeDist
        this.stems.push(new Stem(this.pos.x, ny, dir, this))
      }
    } else {
      this.inserting = (floor(this.timer) % floor(this.beat) == 0)
      if(this.inserting == true) {
        let last = this.stems[this.stems.length-1]
        let dir = (this.stems.length % 2 == 0) ? -1 : 1
        let ny = (height - this.currHeight) 
        this.stems.push(new Stem(this.pos.x, ny, dir, this))
      }
    }
 
  }

  select() {
    if(this.growing == true) return
    this.selected = true
    return this
  }

  dropSeeds() {
    this.stems.forEach(stem => {
      if(stem.seedpod != null) {
        let seeds = stem.seedpod.seeds
        seeds.forEach(seed => {
          seed.dropping = true
          if(seed.dropVector != null) return
          seed.dropVector = p5.Vector.sub(seed.dropPoint, seed.pos).normalize().mult(10)
        })
      }
    })
  }

}