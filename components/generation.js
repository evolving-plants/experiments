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
    this.plants.forEach(plant => {
      if (plant.selected == true)
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
      let dist = Math.abs(a.pos.x - newPlant.pos.x) - Math.abs(b.pos.x - newPlant.pos.x)
      return dist
    })
    let seed = droppedSeeds[0]
    let plant = seed.plant
    newPlant.pos = seed.pos
    this.setGenes(plant, newPlant)
  }

  setGenes(oldPlant, newPlant) {
    let avgLength = 0, avgWidth = 0
    oldPlant.stems.forEach(stem => {
      if(stem.leaf != null) {
        avgLength += stem.leaf.finLength
        avgWidth += stem.leaf.finWidth
      }
    })
    avgLength /= oldPlant.stems.length
    avgWidth /= oldPlant.stems.length
    newPlant.genes.geneLeafLength = avgLength
    newPlant.genes.geneLeafWidth = avgWidth
  }


}