class Plant {
  // Makes plant: draws the stalk, calls stem
  // Drops seeds
  // Generation tells plant what to do
  constructor(x, y) {
      // Create vector for the initial position on the stalk
    this.pos = createVector(x, y)
      // Define the maximum height of the plant, relative to the canvas height
      // This could become a selection variable instead
    this.currHeight = 20
      // Create the stems array for making new stems
    this.stems = []
    this.selected = false
    this.growing = true
    this.numstem = 0
    this.nleaves = 3

    this.heightR = random(10, 20)
    this.growthRate = 0.08
    this.inserting = false
    this.timer = 0
    this.beat = 20

    this.genes = {
      // Set the initial leaf sizes for each plant 
      leafLength: random(180, 260),
      leafWid1: random(-50, 50),
      leafWid2: random(30, 90), 
      leafWid3: random(30, 90), 
      // Set the initial (ave) internode distance for each plant - was (80,120)
      interNodeDist: floor(random(50, 130)),
      // Set the average number of leaves for each plant 
      numLeaves: floor(random(3, 6)) // was (2,4)
    } 

  }

  init() {
    this.thresh = this.genes.interNodeDist * this.genes.numLeaves
    this.maxHeight = this.thresh + 120        // was this.thresh + 200
    // Create the stems using stem class
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
       // Draw the stems
       for(let i = 0; i < this.stems.length; i++) {
        let b = this.stems[i] 
        b.show()
      }

    // Draw the stalk
    stroke(30, 240, 10);
    strokeWeight(9);
    fill(50, 220, 20)
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y-this.currHeight)
    let cx = this.pos.x
    let cy = this.pos.y-this.currHeight

    // Draw a little bud at the top of the growing stalk
    strokeWeight(2)
    fill(30, 240, 10)
    bezier(cx,cy, cx+7,cy-5, cx+8,cy-12, cx,cy-20 )
    bezier(cx,cy, cx-7,cy-5, cx-8,cy-12, cx,cy-20 )
  
  }

  grow() {
    // if(this.growing == true) {
      this.stems.forEach(stem => stem.grow())
    // }
    
    if(this.currHeight > this.maxHeight) {
      this.growing = false
      return
    }

    // growth of plant
    this.currHeight += this.heightR*this.growthRate
    this.timer += 1
    
    if((this.currHeight) < this.thresh) {
      this.inserting = (this.timer % this.genes.interNodeDist == 0)
      if(this.inserting == true) {
        // console.log('hello')
        let last = this.stems[this.stems.length-1]
        let dir = (this.stems.length % 2 == 0) ? -1 : 1
        let ny = last.pos.y - this.genes.interNodeDist
        this.stems.push(new Stem(this.pos.x, ny, dir, this))
      }
    } else {
      // this.inserting = (this.timer % this.beat == 0 && this.beat != 0)
      // changed from /2 to /3
      this.inserting = (this.timer % floor(this.genes.interNodeDist/3) == 0)
      if(this.inserting == true) {
        // console.log('pods')
        let last = this.stems[this.stems.length-1]
        let dir = (this.stems.length % 2 == 0) ? -1 : 1
        let ny = (height - this.currHeight) 
        this.stems.push(new Stem(this.pos.x, ny, dir, this))
        // this.beat -= 
      }
    }
 
  }

  select() {
    if(this.growing == true) return
    this.selected = true
    return this
  }

  // Dropping seeds after the plant is selected
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