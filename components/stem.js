class Stem {
  // Makes a stem for a leaf (petiole) if isLeaf is true;
 // makes a stem for a bud that becomes a flower & seedpod, if isLeaf is false; 
  // and also directs the creation of a new leaf, bud, flower, and seedpod. 
  // The initial position of the stem on the stalk is this.pos0
  // The position of the stem on the stalk goes up as the stalk stretches, until a maximum of thresh*.3 from pos0
  // The end of the stem is at the vector end[]. 
  // The stems of leaves (petioles) will all have final lengths of leafstemlen
  // The angle between stem and stalk is this.angle, 
  // which begins at 0 and ends at this.maxAngleR
  constructor(x, y, dir, plant, isLeaf, droppetals) {
      this.plant = plant
      this.isLeaf = isLeaf
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
      // Set the length of leaf stems here
      this.leafstemlen = 50
      this.growing = true
      
      // randomness of the stem growth rates, angles, &heightRate on a plant
      // this.lenr = random(0, )
      this.growthRate = 0.10
      // the position of the first leaf stem on the stalk is distR 
      // this.distR will limit the increase of stem on stalk
      // this.distR = 0
      // this.maxStretch = 0
      this.maxAngleR = random(45, 50)
      this.heightR = random(0, 5)
      this.init()
    }
  
    init() {
      // console.log('this.pos0.y', height-this.pos0.y)

      // Decide whether to put a leaf or bud/flower/seedpod on the stem 
      if (this.isLeaf == true) {
      // Create a leaf
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
          this.plant 
        ) 
      } else {
        // Create a bud/flower/seedpod
        this.seedpod = new SeedPod(this.pos, this.dir, this.angle, this.plant, this.posEnd)
        this.bud = new Bud(this.pos, this.angle*this.dir, 8)
        this.flower = new Flower(this.pos, this.angle*this.dir)
      }
    }
    
    grow() {
      // circle(this.pos0.x, this.pos0.y, 20)
      // line(10, height - this.plant.genes.thresh, 1000,height - this.plant.genes.thresh)
      // line(10, height - this.plant.genes.plantHeight, 1000,height - this.plant.genes.plantHeight)
    // The stem keeps growing until it reaches final stem length 
    // Leaves will all have the same final stem length(leafstemlen)
    // Buds, flowers, seedpods will have shorter lengths towards the top of the stem
      // let finalstemlength = this.pos.y*.15
      // if (this.numstem <= 4) {
      //   this.numstem += 1
      //   finalstemlength = this.leafstemlen 
      // }
      // this.len += (this.len < finalstemlength) ? 10*this.growthRate : 0.0 

      if(this.leaf2 != null) {
        // The final stem length for all leaves is set here 
        if(this.len < this.leafstemlen) {
          this.len += 10*this.growthRate
        } else {
          this.growing = false 
        }
        // The stem length of buds is increased until a maximum that depends on theheight on the stalk (increase 0 & decrease 0.2 for more uniformity) 
      } else {
        if(this.len < 0 + this.pos.y*0.2) {
          this.len += 10*this.growthRate
        } else {
          this.growing = false
        }
      }

      // Increase the stem angles until maximum 
      if(this.isLeaf == true) {
        this.maxAngleR = 5 + this.pos0.y*.05
      }
      this.angle += (abs(this.angle) < this.maxAngleR) ? 1*this.growthRate : 0.0

      // Increase the position of stem on stalk until maximum 
      if(this.isLeaf == true) {
        this.maxStretch = floor(((this.plant.genes.thresh - (this.plant.genes.thresh*.3))/(this.plant.genes.numLeaves-1))*.3)
      } else {
        this.maxStretch =  floor(((this.plant.genes.plantHeight - this.plant.genes.thresh - (this.plant.genes.thresh*.2)) / this.plant.genes.numPods)/5)
        // this.maxStretch = 0
      } 
    
      if(abs(this.pos0.y-this.pos.y) < this.maxStretch) {
        this.pos.y -= this.growthRate * 3 
        // // this.pos.y -= this.growthRate * this.heightR 
              // The following causes spitting:!!!!!!
        // if(this.pos.y < (height - this.plant.currHeight + 5)) {
        //   this.pos.y = height - this.plant.currHeight + 5
        // } 
      }
  
    // Update position of end of stem
      let dx  = cos((90-this.angle)) * this.dir*this.len
      let dy = sin((90-this.angle)) * -1*this.len
      let end = createVector(
        this.pos.x + dx,
        this.pos.y + dy
      )
      let angle = this.angle*this.dir
  
      // Update leaf
      if(this.leaf2 != null) {
        this.leaf2.update(end, angle)
        this.leaf2.grow()
      } else {
      // Update bud, flower, seedpod
        this.seedpod.update(end, angle)
        this.bud.update(end, angle)      
        this.flower.update(end, angle)
  
        // Direct opening of bud, dropping of flower
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
  
    showLeaf2() {
      this.leaf2.show()
    }
  }  