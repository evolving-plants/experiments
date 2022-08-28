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
    let selectedPlants = this.plants.filter(plant => plant.selected === true)
    if(selectedPlants.length == 0) selectedPlants = this.plants
    selectedPlants.forEach(plant => {
      let seeds = plant.allChildren.filter(child => child instanceof Seed)
      this.droppedSeeds.push(...seeds)
    })

    // make new season
    this.newSeasonPlants = []
    // Define plant positions in the new season
        // This is not being used ?????
        let sep = width / (this.nPlants * 2)
    for(let i = 0; i < this.nPlants; i++) {
      let xpos = sep * (((i+1)*2)-1)
      xpos = xpos + random(-sep/2, sep/2)
      // let xpos = (width*(i+1)/this.nPlants - width/6) + random(-20, 20)
      let newPlant = new Plant(xpos, height)
      this.newSeasonPlants.push(newPlant) 
    }

    this.newSeasonPlants.forEach(newPlant => {
      this.setPositionNewPlant(this.droppedSeeds, newPlant)
    })

    this.plants = this.newSeasonPlants
    this.children = this.newSeasonPlants
   

  }

  setPositionNewPlant(droppedSeeds, newPlant) {
    // This is being used instead of the above ????
    droppedSeeds.sort((a, b) => {
      let dist = Math.abs(a.dropPoint.x - newPlant.pos.x) - Math.abs(b.dropPoint.x - newPlant.pos.x)
      return dist
    })
    let seed = droppedSeeds[0]
    let plant = seed.plant
    newPlant.pos = createVector(seed.dropPoint.x, height)
    this.setGenes(plant, newPlant)
  }

  setGenes(oldPlant, newPlant) {
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
    avgLeafLength += random(-40, 40) // originally 29
    avgLeafWid1 += random(-26, 26)   // rest originally 23
    avgLeafWid2 += random(-26, 26)
    avgLeafWid3 += random(-26, 26)
    if (avgLeafWid3 > avgLeafWid2*1.2) { avgLeafWid3 = avgLeafWid3*.9 }
    if (avgLeafWid3 < avgLeafWid2*1.2) { avgLeafWid3 = avgLeafWid3*1.1 }
    // The above adjusts relations between wid2 and wid3 to prevent overly strange shapes

     // Make new plant height genes
     let newPlantHeight = oldPlant.genes.plantHeight + floor(random(-30, 30))
     // Don't let the plant be too tall - this is not working ?????????
     if (newPlantHeight < 100) { 
      newPlantHeight = 100 
    }

     // making new numLeaves genes
     let newNumLeaves = oldPlant.genes.numLeaves + floor(random(-3, 3))
     if(newNumLeaves < 2) { newNumLeaves = 2 }
     if(newNumLeaves > 16) { newNumLeaves = 16 }

    // if(newInterNodeDist*newNumLeaves > height*4/5) {
    //   newNumLeaves -= 1 
    // }

    // Make new threshold for each plant
    let newThresh = floor(oldPlant.genes.thresh + random(-8, 8))
    if (newThresh < 40) {
      newThresh = 40
    }
     // Make new number of seedpods for each plant
     let newPods = oldPlant.genes.numPods + floor(random(-3, 3))
     if (newPods < 2) {
       newPods = 2
     }
     if (newPods > 10) {
       newPods = 10
     }

      // Make new number of seeds in each pod for each plant
      let newSeeds = oldPlant.genes.numSeeds + floor(random(-1.3, 1.3))
      if (newSeeds < 3) {
        newSeeds = 3
      }
      if (newSeeds > 14) {
        newSeeds = 14
      }
       // Make new seed diameter for each plant
       let newSeediam = oldPlant.genes.seediam + random(-2, 2)
       if (newSeediam < 5) {
         newSeediam = 5
       }
       if (newSeediam > 18) {
         newSeediam = 18
       }
    // Set new internode distances (for leaves below threshold) based on thresh and numleaves
    // let newInterNodeDist = oldPlant.genes.interNodeDist + random(-7, 7)
    // let newInterNodeDist = oldPlant.genes.thresh / newNumLeaves + random(-7, 7) 
    // newInterNodeDist = floor(newInterNodeDist)
    
    newPlant.genes = {
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
    // console.log(newPlant.genes) 
  }


}