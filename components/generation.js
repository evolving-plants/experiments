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
      if(p.growing == true) {
        p.grow()
      }
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
        stem.seedpod.seeds.forEach(seed => droppedSeeds.push(seed))
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

    circles = []
    droppedSeeds.sort((a, b) => {
      let dist1 = Math.abs(a.pos.x - this.newSeasonPlants[0].pos.x) - Math.abs(b.pos.x - this.newSeasonPlants[0].pos.x)
      return dist1
    })
    let seed1 = droppedSeeds[0]
    let plant1 = seed1.plant
    this.newSeasonPlants[0].pos = seed1.pos
    this.setGenes(plant1, this.newSeasonPlants[0])

    droppedSeeds.sort((a, b) => {
      let dist2 = Math.abs(a.pos.x - this.newSeasonPlants[1].pos.x) - Math.abs(b.pos.x - this.newSeasonPlants[1].pos.x) 
      return dist2
    })
    let seed2 = droppedSeeds[0]
    let plant2 = seed2.plant
    this.newSeasonPlants[1].pos = seed2.pos
    this.setGenes(plant2, this.newSeasonPlants[1])
    

    droppedSeeds.sort((a, b) => {
      let dist3 = Math.abs(a.pos.x - this.newSeasonPlants[2].pos.x) - Math.abs(b.pos.x - this.newSeasonPlants[2].pos.x) 
      return dist3
    })
    let seed3 = droppedSeeds[0]
    let plant3 = seed3.plant
    this.newSeasonPlants[2].pos = seed3.pos
    this.setGenes(plant3, this.newSeasonPlants[2])

    this.plants = this.newSeasonPlants
    this.plants.forEach(plant => plant.init())

  }

  // Not understanding ?????
  setGenes(oldPlant, newPlant) {
    let avgLength = 0, avgWidth = 0
    oldPlant.stems.forEach(stem => {
      avgLength += stem.leaf.finLength
      avgWidth += stem.leaf.finWidth
    })
    avgLength /= oldPlant.stems.length
    avgWidth /= oldPlant.stems.length
    newPlant.genes.geneLeafLength = avgLength
    newPlant.genes.geneLeafWidth = avgWidth
  }


}