class Plant extends Growable {
  // Makes plant: draws the stalk, calls stem for leaves and for buds/flowers/seedpods
  // Drops seeds
  // Also draws the red selection circle
 
  constructor(x, y) {
    super()
      // Create vector for the initial position on the stalk
    this.pos = createVector(x, y)
      // Count the height of the growing plant with this.currHeight
    this.currHeight = 0
      // Create the stems array for making new stems 
    this.stems = []
    this.selected = false
    this.growing = true
    this.interLeafDist = 0
    this.interPodDist = 0
    // the rate of stalk growth is set by growthRate (& heightR to randomise) 
    this.heightR = random(15,25)
    this.growthRate = 0.07   
    this.inserting = false
    // timer is used to figure out where to add a stem to the stalk
    this.leafTimer = 0
    this.podTimer = 0
    // If isLeaf is true, a leaf will be put on the stem, otherwise a bud/flower/seed  
    this.isLeaf = true

    this.genes = {
      // Set the initial genes for each plant at the start of the simulation 
      // The plant height should be at least 100 more than thresh 
      plantHeight: floor(random(500,600)),
      // Initial leaf dimensions
      leafLength: random(180, 260),
      leafWid1: random(-50, 50), // random(a-10, a+10)
      leafWid2: random(50, 70), 
      leafWid3: random(50, 70),
      // Set the number of leaves for each plant
      numLeaves: floor(random(3, 6)), // was (2,4) 
      // Set the threshold height (below thresh will be leaves, above will be seedpods)
      thresh: floor(random (100, 300)),
      numPods: floor(random (2,6)),
      numSeeds: floor(random (5,7)),
      seediam: random (8,12) 
    }    
  } 

  init() {
    this.plantHeight = this.genes.plantHeight
    this.thresh = this.genes.thresh
    this.numLeaves = this.genes.numLeaves
    this.numPods = this.genes.numPods
    this.numSeeds = this.genes.numSeeds
    // this.seediam = this.genes.seediam
    // ?????? to do or not to do ?????????

    // Create the first stem on the stalk
    const stem = new Stem(this.pos.x, this.pos.y, -1, this, this.isLeaf)
    this.stems.push(stem)
    this.children.push(stem)


    
    

    // arr of time points 
    // leaves - 0 ~ this.thresh 
    this.leafPositions = [0]
    this.leafPositionsIndex = 1

    let sum = 0
    for(let i = 0; i < this.numLeaves-1; i++) {
      const r = Math.random()
      sum += r
      this.leafPositions.push(sum)
    }
    this.leafPositions = this.leafPositions.map(value => Math.floor((value / sum) * this.thresh))
    // this.leafPositions.sort((a, b) => a - b);


    this.podPositions = []
    this.podPositionsIndex = 0
    sum = 0
    for(let i = 0; i < this.numPods; i++) {
      const r = Math.random()
      sum += r
      this.podPositions.push(sum)
    }
    this.podPositions = this.podPositions.map(value => Math.floor(value / sum * (this.plantHeight-this.thresh))+this.thresh)
    // this.podPositions.sort((a, b) => a - b)

    console.log(this.thresh)
    console.log(this.plantHeight-this.thresh)

    console.log("Leaf positions: ", this.leafPositions)
    console.log("Pod positions: ", this.podPositions)
    

  }

  draw() {
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
        b.draw()
      }

    // // Draw the stalk
    stroke(30, 240, 10);
    strokeWeight(11) // was 9
    // fill(50, 220, 20)
    noFill()
    // line(this.pos.x, this.pos.y, this.pos.x, noise(this.pos.y-this.currHeight)) 
    bezier(this.pos.x, this.pos.y,   this.pos.x*1.01, this.pos.y*.98,   this.pos.x*.99, this.pos.y-this.currHeight*0.8,    this.pos.x, this.pos.y-this.currHeight) 
   
    // Draw a little bud at the top of the growing stalk  
    let cx = this.pos.x
    let cy = this.pos.y - this.currHeight
    strokeWeight(2)
    fill(30, 240, 10)
    bezier(cx,cy, cx+7,cy-5, cx+8,cy-12, cx,cy-20 )
    bezier(cx,cy, cx-7,cy-5, cx-8,cy-12, cx,cy-20 )
  }

  grow() {
    this.growMe()

    if (this.time <= this.plantHeight) {
      // this.currHeight += this.heightR*this.growthRate * this.timer.inc 
      this.currHeight += 1 * this.timer.inc 

      if(
        this.leafPositionsIndex < this.leafPositions.length && 
        this.time % this.leafPositions[this.leafPositionsIndex] == 0) {
        
        const dir = Math.random() < 0.5 ? 1 : -1
        let leaf = new Stem(this.pos.x, height-this.currHeight, dir, this, true)

        this.stems.push(leaf)
        this.children.push(leaf)

        this.leafPositionsIndex += 1
      } 

      if(
        this.podPositionsIndex < this.podPositions.length && 
        this.time % this.podPositions[this.podPositionsIndex] == 0) {

        const dir = Math.random() < 0.5 ? 1 : -1
        let pod = new Stem(this.pos.x, height-this.currHeight, dir, this, false)

        this.stems.push(pod)
        this.children.push(pod)

        this.podPositionsIndex += 1

      }
    }

    // Make the stems grow in length and angle
    this.growChildren()
    this.stems.forEach(stem => stem.grow())

    


    // Set internode distance for leaf stems (below the threshold) 
    // The number of nodes between leaves is numLeaves-1 
    // Add one extra node at the top of buds for stretching
    // Add a spacer of (this.thresh*.3) between leaves and pods, just under thresh
    this.interLeafDist = floor((this.thresh) / (this.numLeaves+1))
    // Set internode distance for bud/flower/seedpod stems (above the threshold) 
    this.interPodDist = floor((this.plantHeight - this.thresh) / this.numPods)

    
  }
  // for(let countSt = 1; countSt<this.numLeaves+this.numPods; countSt++) {
  //   if (this.stems.length < this.numLeaves + this.numPods) {
  //     // Add a stem for each leaf or bud/flower/seedpod 
  //     console.log('countSt',  countSt)
  //     let ny = height - this.pos0[countSt]
  //     console.log('ny', ny)
  //     console.log('currHeight, countSt, pos0[countSt]', this.currHeight, countSt, this.pos0[countSt])
  //     if (this.currHeight > this.pos0[countSt]) {
  //       if (countSt > this.numLeaves) {
  //         this.isLeaf = false
  //     }
  //     let dir = (this.stems.length % 2 == 0) ? -1 : 1
  //       this.stems.push(new Stem(this.pos.x, ny, dir, this, this.isLeaf)) 
  //       console.log('STEMIES', this.stems)
  //     }
  //   }
  // }

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

// Add a leaf stem at the correct position on the stalk, until numleaves have been added 
    // 
// if (this.stems.length < this.numLeaves) {
  // // if(this.currHeight < this.thresh) { // doesn't work.
  //   // If timer is a multiple of interLeafDist (an integer) then this.inserting will be true, so a leaf stem should be added. 
  //   this.inserting = (this.interLeafDist % this.leafTimer == 0)
  //   if(this.inserting == true) {
  //       // console.log('plantHeight, currHeight', this.plantHeight, this.currHeight)
  //       // console.log('NUMLEAVES, leafTIMER, ILD, thresh', this.numLeaves, this.leafTimer, this.interLeafDist, this.thresh)
  //       // console.log('numPods, IPD ', this.numPods, this.interPodDist)
  //     let last = this.stems[this.stems.length-1]
  //     let dir = (this.stems.length % 2 == 0) ? -1 : 1 
  //     // ny is the position of the stem on the stalk 
  //     let ny = last.pos.y - this.interLeafDist
  //     const stem = new Stem(this.pos.x, ny, dir, this, this.isLeaf)
  //     this.stems.push(stem)
  //     this.children.push(stem) 
  //       // console.log('ny =', ny)
  //       // console.log("leaf this.stems", this.stems)
  //       // console.log("LEAFTIMER ", this.leafTimer)
  //     // The above adds a new stem to the end of the stem array
  //   }

  // } else {
  //   // Adding stems (of buds,seedpods) above the threshold 
  //   if((this.currHeight) >= this.thresh && this.stems.length < (this.numLeaves + this.numPods)) {
  //   this.isLeaf = false
  //   this.inserting = (this.podTimer % this.interPodDist == 0)
  //   if(this.inserting == true) {
  //     // console.log("PODTIMER ", this.podTimer)
  //     let last = this.stems[this.stems.length-1]
  //     let dir = (this.stems.length % 2 == 0) ? -1 : 1
  //     let ny = last.pos.y - (this.interPodDist)
  //     if (this.stems.length == this.numLeaves) {
  //       ny = height - this.thresh
  //     }
  //     // Start growing below to allow for increasing bud stem positionon the stalk
  //     // ny = ny - this.interPodDist
  //     const stem = new Stem(this.pos.x, ny, dir, this, this.isLeaf)
  //     this.stems.push(stem)
  //     this.children.push(stem) 
  //     // console.log("BUDS this.stems ", this.stems)
  //   }
  //   }
  // }