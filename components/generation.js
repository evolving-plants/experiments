class Generation {
  // Makes population of plants - tells plant to drop seeds
  constructor(nPlants = 3) {
    this.nPlants = nPlants
    this.plants = []
    this.selectedPlants = []
    
  }

  init() {
    // Sets the initial position of each plant on the ground
    let sep = width / (this.nPlants * 2)
    for(let i = 0; i < this.nPlants; i++) {
      let xpos = sep * (((i+1)*2)-1)
      xpos = xpos + random(-sep/2, sep/2)
      // let xpos = (width*(i+1)/this.nPlants - width/6) + random(-20, 20)
      let newPlant = new Plant(xpos, height)
      newPlant.init()
      this.plants.push(newPlant) 
    }
  }

  grow() {
    // Directs the growing and dropping of seeds of each plant
    for(let i = 0; i < this.plants.length; i++) {
      let p = this.plants[i]
      p.grow()
      if(p.selected == true) {
        p.dropSeeds()
      }
      p.show()
    }
  }
  

  newSeason() {
    let droppedSeeds = []
    let selectedPlants = this.plants.filter(plant => plant.selected == true)
    if(selectedPlants.length == 0) selectedPlants = this.plants
    selectedPlants.forEach(plant => {
      plant.stems.forEach(stem => {
        if(stem.seedpod != null) {
          stem.seedpod.seeds.forEach(seed => droppedSeeds.push(seed))
        }
      })
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
      this.setPositionNewPlant(droppedSeeds, newPlant)
    })

    this.plants = this.newSeasonPlants
    this.plants.forEach(plant => plant.init())

  }

  setPositionNewPlant(droppedSeeds, newPlant) {
    // This is being used instead of the above ????
    droppedSeeds.sort((a, b) => {
      let dist = Math.abs(a.dropPoint.x - newPlant.pos.x) - Math.abs(b.dropPoint.x - newPlant.pos.x)
      return dist
    })
    let seed = droppedSeeds[0]
    let plant = seed.plant
    newPlant.pos = seed.dropPoint
    this.setGenes(plant, newPlant)
  }

  setGenes(oldPlant, newPlant) {
    // console.log(newPlant.genes)

    // making new leaf length and width genes
    let avgLeafLength = 0, avgLeafWid1 = 0, avgLeafWid2 = 0, avgLeafWid3 = 0
    oldPlant.stems.forEach(stem => {
      if(stem.leaf2 != null) {
        avgLeafLength += stem.leaf2.finLength
        // avgLeafWidth += stem.leaf.finWidth
        avgLeafWid1 += stem.leaf2.finWid1
        avgLeafWid2 += stem.leaf2.finWid2
        avgLeafWid3 += stem.leaf2.finWid3
      }
    })
    // Adjust differences between leaves on different plants from the same parent
    const numLeaves = oldPlant.stems.filter(stem => stem.leaf2 != null).length
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
    // The above adjusts relations between wid2 and wid3 ??????

    // making new internodedist genes (for both leaves and buds)
    let newInterNodeDist = oldPlant.genes.interNodeDist + random(-7, 7)
    newInterNodeDist = floor(newInterNodeDist)
    
    // making new numLeaves genes
    let newNumLeaves = oldPlant.genes.numLeaves + floor(random(-1, 2))
    if(newNumLeaves < 1) newNumLeaves = 1 
    
    // the following was changed from 4/5 to 3/5, but the expected did not happen ?????
    if(newInterNodeDist*newNumLeaves > height*4/5) {
      newNumLeaves -= 1
    }

    newPlant.genes = {
      leafLength: abs(avgLeafLength), 
      leafWid1: abs(avgLeafWid1),
      leafWid2: abs(avgLeafWid2),
      leafWid3: abs(avgLeafWid3),
      interNodeDist: abs(newInterNodeDist), 
      numLeaves: abs(newNumLeaves)
    }
    // console.log(newPlant.genes)
  }


}