class Stem extends Growable {
  // Makes a stem for a leaf (petiole) if hasLeaf is true;
  // makes a stem for a bud that becomes a flower & seedpod, if hasLeaf is false; 
  // and also directs the creation of a new leaf or bud 
  // The initial position of the stem on the stalk is this.pos0
  // // The position of the stem on the stalk goes up as the stalk stretches, until a maximum of thresh*.3 from pos0
  // The end of the stem is at the vector end[]. 
  // The stems of leaves (petioles) will all have final lengths of leafstemlen
  // The angle between stem and stalk is this.angle, 
  // // which begins at 0 and ends at this.maxAngleR 
  constructor(x, y, dir, plant, hasLeaf) {
    super(100)
      this.plant = plant 
      this.hasLeaf = hasLeaf
      // Create vectors for the initial and present position of each stem on the stalk:
      this.pos0 = createVector(x, y)
      this.pos = createVector(x, y)
      this.posEnd = createVector(x,y)
      // Start growing the stem from a length of 0
      this.len = 0 
      // Whether the stem is on the right or left is determined by this.dir
      this.dir = dir 
       // Start growing the stem from an angle of 0.1 
      this.angle = 0.1
      // Set the final length of leaf stems here
      this.leafstemlen = 50
      
      // randomness of the stem growth rates, angles, & heightRate on a plant
      // this.lenr = random(0, )
      // The following is not used ????????????
      this.growthRate = 0.10
      // the position of the first leaf stem on the stalk is distR 
      // this.distR will limit the increase of stem on stalk
      // this.distR = 0
      // this.maxStretch = 0
      // The following no longer works - but we do want some randomness of the angle - put it back ?????????
      this.maxAngleR = random(45, 50)
      // this.heightR = random(0, 5)
      this.init()

      this.plantR = 30
      this.plantG = 240
      this.plantB = 10
  
    }
  
    init() {
      // console.log('this.pos0.y', height-this.pos0.y)

      // Decide whether to put a leaf or bud on the stem 
      if (this.hasLeaf == true) {

      // Put a leaf
        this.leaf = new Leaf(
          createVector(
            this.pos.x + cos(this.angle*this.dir) * this.len, 
          this.pos.x + cos(this.angle*this.dir) * this.len, 
            this.pos.x + cos(this.angle*this.dir) * this.len, 
          this.pos.x + cos(this.angle*this.dir) * this.len, 
            this.pos.x + cos(this.angle*this.dir) * this.len, 
            this.pos.y + sin(this.angle*this.dir) * this.len
          ), 
          this.angle*this.dir,
          // this.dir is doing nothing in the above ????????
          // Find the random different sizes of leaves on this plant 
          // leaf length was + random(-6,6) 
          abs(this.plant.genes.leafLength) + random(-10, 10),
          abs(this.plant.genes.leafWid1) + random(-8, 8),
          abs(this.plant.genes.leafWid2) + random(-8, 8),
          abs(this.plant.genes.leafWid3) + random(-8, 8),
          this.plant 
        )
        this.children.push(this.leaf)
        this.plant.allChildren.push(this.leaf)

        // Put a bud
      } else {
        this.bud = new Bud(this.pos.x, this.pos.y, this.angle*this.dir, 8, this.plant) 
        this.children.push(this.bud)
        this.plant.allChildren.push(this.leaf)
      }
    } 
    

    grow() {
    // The stem keeps growing until it reaches final stem length 
    // Leaves will all have the same final stem length (leafstemlen)
    // Buds, flowers, seedpods will have shorter lengths towards the top of the stem
   
    // console.log(this.time)
      if(this.leaf != null) {

        // The leaves start growing as soon as their stems appear:
        this.growChildren()

        if(this.time <= this.timer.bp) {
          // The following sets the final length and angle of the leaf stem
          this.len += this.timer.inc * .6
          // this.angle += (abs(this.angle) < this.maxAngleR) ? 1*this.growthRate : 0.0
          this.angle += this.timer.inc/2
        } 

      } else {
        // The buds start growing as soon as their stems appear:
        this.growChildren()
        if(this.time <= this.timer.bp) {

        // if(this.time > this.timer.bp) {
        // this.growChildren()
        // } 
        // else {

          // this.len += 10*this.growthRate
          this.len += this.timer.inc
          this.angle += this.timer.inc/2
          // this.angle += (abs(this.angle) < this.maxAngleR) ? 1*this.growthRate : 0.0

        }
        
        // if(this.len < 0 + this.pos.y*0.2) {
        // }
      }

      // Increase the position of stem on stalk until maximum ?????????
      if(this.hasLeaf == true) {
        // this.maxStretch = floor(((this.plant.genes.thresh - (this.plant.genes.thresh*.3))/(this.plant.genes.numLeaves-1))*.3)
        this.maxStretch = floor(0)
      } else {
        // this.maxStretch =  floor(((this.plant.genes.plantHeight - this.plant.genes.thresh - (this.plant.genes.thresh*.2)) / this.plant.genes.numPods)/5) 
        this.maxStretch = 0
      } 
    
      // The following stops the stems from climbing the stalk 
      if(abs(this.pos0.y-this.pos.y) < this.maxStretch) {
        this.pos.y -= this.growthRate * 3 
        // // this.pos.y -= this.growthRate * this.heightR 
              // The following causes spitting:!!!!!!
        // if(this.pos.y < (height - this.plant.currHeight + 5)) {
        //   this.pos.y = height - this.plant.currHeight + 5
        // } 
      } else {
        // the stems turn yellow brown
        this.plantR += (this.plantR < 230) ? .15 * this.timer.inc : 0.
        this.plantG -= (this.plantG > 205) ? .08 * this.timer.inc : 0.
        this.plantB += (this.plantB < 135) ? .10 * this.timer.inc : 0.

        // The stems wilt
        this.maxstretch = -90
        // The following line is necessary
        if(abs(this.pos0.y-this.pos.y) < this.maxStretch) {
          this.pos.y -= this.growthRate * 3 
        }
      } 
  
    // Update position of end of stem
      let dx  = cos((90-this.angle)) * this.dir*this.len
      let dy = sin((90-this.angle)) * -1*this.len
      let end = createVector(
        this.pos.x + dx,
        this.pos.y + dy
      )
      let angle = this.angle*this.dir 
  
      this.children.forEach(child => child.update(end, angle))
    } 
    

    draw() {
      // Draw the stem 
      // stroke(30, 240, 10)
      stroke(this.plantR,this.plantG, this.plantB)
      strokeWeight(5);
      fill(this.plantR,this.plantG, this.plantB)
      // fill(50, 220, 20)
      push()
      translate(this.pos.x, this.pos.y)
      rotate(this.angle*this.dir)
      // line(0, 0, 0, -this.len)
      // Change the following to adjust the curvature of the stems
        bezier(0,0, 10*this.dir,0, -16*this.dir,-8,  0, -this.len) 
      pop()

      this.children.forEach(child => child.draw())
    }

  }  