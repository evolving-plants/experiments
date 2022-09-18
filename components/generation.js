class Generation extends Growable {
  // Makes population of plants - tells plant to drop seeds
  constructor(nPlants = 3) {
    super(0)
    this.nPlants = nPlants
    this.plants = []
    this.selectedPlants = []
    this.droppedSeeds = []
  } 

  init() {
    // Sets the initial position of each plant on the ground 
    let sep = width / (this.nPlants * 2)
    for(let i = 0; i < this.nPlants; i++) {
      let xpos = sep * (((i+1)*2)-1)
      xpos = xpos + random(-sep/2, sep/2)
      // let xpos = (width*(i+1)/this.nPlants - width/6) + random(-20, 20)
      let newPlant = new Plant(xpos, height)
      this.plants.push(newPlant)
      this.children.push(newPlant)
    }
  }

  grow() {
    this.growChildren()

    // Directs the growing and dropping of seeds of each plant
    for(let i = 0; i < this.plants.length; i++) {
      let p = this.plants[i]
      if(p.selected == true) {
        p.dropSeeds()
      }
    }
  }

  draw() {
    this.children.forEach(child => child.draw())
  }
  

  newSeason() {
    // select all plants if no plant is selected
    let selectedPlants = this.plants.filter(plant => plant.selected === true)
    if(selectedPlants.length == 0) selectedPlants = this.plants
  
    selectedPlants.forEach(plant => {
      let seeds = plant.allChildren.filter(child => child instanceof Seed)
      this.droppedSeeds.push(...seeds)
    })

    // make new season
    this.newSeasonPlants = []
  
    let sep = width/(this.nPlants*2)
    for(let i = 0; i < this.nPlants; i++) {
      let xpos = sep * (((i+1) * 2)-1)
      xpos = xpos + random(-sep/2, sep/2)

      let seed = this.selectSeed(this.droppedSeeds, xpos)
      let oldPlant = seed.plant

      let newGenes = this.getGenes(oldPlant)
      let newPlant = new Plant(seed.dropPoint.x, height, newGenes)

      this.newSeasonPlants.push(newPlant)
    }

    this.plants = this.newSeasonPlants
    this.children = this.newSeasonPlants
   

  }

  selectSeed(droppedSeeds, randx) {
    // This is being used instead of the above ????
    droppedSeeds.sort((a, b) => {
      let dist = Math.abs(a.dropPoint.x - randx) - Math.abs(b.dropPoint.x - randx)
      return dist
    })
    let seed = droppedSeeds[0]
    return seed
    
  }

  getGenes(oldPlant) {
    // console.log(newPlant.genes) 

    // making new leaf length and width genes
    // Find average leaf length and widths for each parent plant, 
    // then select each new average (random from a range) for new plant 
    // Note that p5 random(1,1) returns a random number from -1 up to (but not including) 1, so floor(random(-1,1)) will almost always be 0 (but, rarely, -1) 
    let avgLeafLength = 0, avgLeafWid1 = 0, avgLeafWid2 = 0, avgLeafWid3 = 0
    oldPlant.stems.forEach(stem => {
      if(stem.leaf != null) {
        avgLeafLength += stem.leaf.finLength
        avgLeafWid1 += stem.leaf.finWid1
        avgLeafWid2 += stem.leaf.finWid2
        avgLeafWid3 += stem.leaf.finWid3
      }
    })
    const numLeaves = oldPlant.stems.filter(stem => stem.leaf != null).length
    avgLeafLength /= numLeaves
    avgLeafWid1 /= numLeaves
    avgLeafWid2 /= numLeaves
    avgLeafWid3 /= numLeaves
    avgLeafLength += random(-27, 27) // originally 29
    avgLeafWid1 += random(-25, 25)   // rest originally 23
    avgLeafWid2 += random(-25, 25)
    avgLeafWid3 += random(-25, 25)
    if (avgLeafWid3 > avgLeafWid2*1.2) { avgLeafWid3 = avgLeafWid3*.9 }
    if (avgLeafWid3 < avgLeafWid2*1.2) { avgLeafWid3 = avgLeafWid3*1.1 }
    // The above adjusts relations between wid2 and wid3 to prevent overly strange shapes

     // Make new plant height genes
     let newPlantHeight = oldPlant.genes.plantHeight + floor(random(-25, 25))
     // Don't let the plant be too short
     if (newPlantHeight < 100) { 
      newPlantHeight = 100 
    }

     // making new numLeaves genes 
     let newNumLeaves = oldPlant.genes.numLeaves + floor(random(-3, 3))
     if(newNumLeaves < 2) { newNumLeaves = 2 }
     if(newNumLeaves > 16) { newNumLeaves = 16 }

    // Make new threshold for each plant
    let newThresh = floor(oldPlant.genes.thresh + random(-7, 7))
    if (newThresh < 30) {
      newThresh = 30
    }
     // Make new number of seedpods for each plant   
     let newPods = oldPlant.genes.numPods + floor(random(-3, 3))
     if (newPods < 2) {
       newPods = 2
     }
     if (newPods > 12) {
       newPods = 12
     }

      // Make new number of seeds in each pod for each plant 
      let newSeeds = oldPlant.genes.numSeeds + floor(random(-1.2, 1.2))
      if (newSeeds < 3) {
        newSeeds = 3
      }
      if (newSeeds > 14) {
        newSeeds = 14
      }
       // Make new seed diameter for each plant
       let newSeediam = oldPlant.genes.seediam + random(-2, 2)
       if (newSeediam < 1) {
         newSeediam = 1
       }
       if (newSeediam > 12) {
         newSeediam = 12
       }
    
    let newGenes = {
      plantHeight: abs(newPlantHeight),
      leafLength: abs(avgLeafLength), 
      leafWid1: abs(avgLeafWid1),
      leafWid2: abs(avgLeafWid2),
      leafWid3: abs(avgLeafWid3),
      numLeaves: abs(newNumLeaves),
      thresh: newThresh, 
      numPods: newPods,
      numSeeds: newSeeds,
      seediam: newSeediam
    }
    
    return newGenes
  }


}