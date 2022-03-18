class Generation {
  // Makes population of plants - tells plant to drop seeds
  constructor(nPlants = 3) {
    this.nPlants = nPlants
    this.plants = []
    this.selectedPlants = []
    
  }

  init() {
    // Sets the initial position of each plant on the ground
    for(let i = 0; i < this.nPlants; i++) {
      let xpos = (width*(i+1)/this.nPlants - width/6) + random(-20, 20)
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
    for(let i = 0; i < this.nPlants; i++) {
      let xpos = (width*(i+1)/this.nPlants - width/6) + random(-20, 20)
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

    // making new leaf length width genes
    let avgLeafLength = 0, avgLeafWidth = 0
    oldPlant.stems.forEach(stem => {
      if(stem.leaf != null) {
        avgLeafLength += stem.leaf.finLength
        avgLeafWidth += stem.leaf.finWidth
      }
    })
    const numLeaves = oldPlant.stems.filter(stem => stem.leaf != null).length
    avgLeafLength /= numLeaves
    avgLeafWidth /= numLeaves
    avgLeafLength += random(-28, 28)
    avgLeafWidth += random(-22, 22)

    // making new internodedist genes
    let newInterNodeDist = oldPlant.genes.interNodeDist + random(-10, 10)
    newInterNodeDist = floor(newInterNodeDist)
    
    // making new numLeaves genes
    let newNumLeaves = oldPlant.genes.numLeaves + floor(random(-1, 2))
    if(newNumLeaves < 1) newNumLeaves = 1
    
    if(newInterNodeDist*newNumLeaves > height*4/5) {
      newNumLeaves -= 1
    }

    newPlant.genes = {
      leafLength: abs(avgLeafLength), 
      leafWidth: abs(avgLeafWidth),
      interNodeDist: abs(newInterNodeDist), 
      numLeaves: abs(newNumLeaves)
    }
    // console.log(newPlant.genes)
  }


}