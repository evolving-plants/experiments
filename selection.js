// Simulates evolution of plants in the mustard family
// Shows evolution by natural selection if users do not select plants
// Users can select which plants will give seeds for the next generation, and thereby breed plants which different characteristics.
// made by Anushka Trivedi, Karen Haydock, and Neeti Sivakumar

let globalTime = 0
// to stop showing growth of plants, change showGrowth to false, and make changes in Growable
// The reason we cannot have both growth and no growth in one version (with selection of new seasons), is that things have to be initialised differently in a number of places
let showGrowth = true

// To reinstall a new season button, comment out all references to newSeasonSwitch and uncomment all references to the newSeasonButton
// newSeasonSwitch calls for a new season when switched to true
let newSeasonSwitch = false

// If death is false, the plants are all living
// If death is true, the unselected plants die
let death = false

// When stormy is true, a storm and flood occur - stormy is made true at random times in leaf.js
stormy = false

// When bulldozer is true, a bulldozer destroys most of the crop
bulldozer = false
// excavTime is used to find out when each plant on the left dies (one at a time)
excavTime = 0

// gen0 has to be defined before setup
//Change the following to set the number of plants in the field.
const gen0 = new Generation(5) 

// Uncomment the following to have a new season button (also uncomment section in setup)
// let newSeasonButton

let timeSlider 
// let slider
let generationCounter = 1



function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  angleMode(DEGREES)

  // Set the groundLevel
  let groundLevel = height * .75

  stones = []
  for (let i = 0; i < 50; i++) {
    let rock = new Stone(random(0,width), random(height*.9,height), 10, 30)
    // let rock = new Stone(random(0,width), random(height-100,height), 10, 30)
    this.stones.push(rock)
  }
  for (let i = 0; i < 200; i++) {
    let pebble = new Stone (random(0,width), random(groundLevel,height*.9), 1.5, 30)
    this.stones.push(pebble)
  }

   hills = new Hills()
   back = new Back()
   storm = new Storm()

  // Define destruction
  destroy = new Destroy()

  // Uncomment the following section to get new season button
  // newSeasonButton = createButton('new season')
  // newSeasonButton.position(width/2, 10) 
  // newSeasonButton.mousePressed(() => {

  //   gen0.newSeason()

  //   if (death) death = false
    
  //   // print: display new season info with the following line
  //   document.querySelector('#selection-info').innerHTML = ''
  //   // keep the following commented out
  //   // gen0.children.forEach((child, index) => displayPlantInfo(`plant-${index}`, child.genes))

  // })

  timeSlider = createSlider(0, 10, 2,1)
  timeSlider.position(90, 15) 
  timeSlider.style('width', '180px')

  gen0.init() 

} 


function draw() {

  if (!bulldozer) {
    background(120,160,230)  
  }

   // Draw the hills in a static daytime colour 
   colorMode(RGB)
   fill(190,100,80,40)  
   noStroke()
   // hills.move()
   hills.draw()
   
   // The ground
   groundLevel = height *.75
   fill(210,160,110,180)
   rect (0,groundLevel,width,height)
   for (let stone of stones) {
    stone.draw()
  }

  // Read the value of the time slider and call gen to set the speed
  gen0.setSpeed(timeSlider.value())

  // If the time slider is at 0, time goes too slowly to see plant growth,
  // and the background becomes animated. 
  // Day/Night occurs, except 
  // it will remain daytime when a storm occurs or when a bulldozer comes.
  
  if (timeSlider.value() == 0) {

    if (!stormy && !bulldozer) {
     // Day/Night occurs if timeSlider = 0 and there is no storm or bulldozer:
     colorMode(HSB)
     back.transition()
     back.draw() 

    }

    // Check for the occasional storm (behind plants)
    if (stormy) {
      storm.move()
      storm.draw()
    }
    
     // Draw (fully grown) plants
     gen0.grown()
     gen0.draw()

      // Check for the bulldozer (in front of plants)
    if (bulldozer) { 
      destroy.draw()
    }
 
    // Kill half the plants if a storm or bulldozer comes
    // Only selected plants will survive - the rest will be knocked over
    if (stormy || bulldozer) {

      // Select all plants before the calamity strikes
      if (!death) {
        death = true
        for(let i = 0; i < gen0.plants.length; i++) {
          gen0.plants[i].selected = true 
        }
      }
      if (bulldozer) {
        // When death is true, the plants on the left will be deselected, one by one,
        // and deselected plants will be made to die in plant.grown
        excavTime += 1
        for (let i = 0; i < floor(.9*(gen0.plants.length)); i++) {
          if (excavTime > (i+1)*70 &&  gen0.plants[i].selected) {
          gen0.plants[i].toggleSelect()
            excavTime = 0
          }
        }
      }


    }

   
  } else {
  // If the time slider is > 0, plant growth is shown

  if (newSeasonSwitch) {
    // Reset so that only one storm or bulldozer occurs at a time
    stormy = false
    storm.reset()
    bulldozer = false
    destroy.reset()
    death = false
    gen0.newSeason()
    generationCounter += 1
    console.log ("Generation", generationCounter)
    if (newSeasonSwitch) newSeasonSwitch = false
  }
  gen0.grow()
  gen0.draw()
  }
}


function mousePressed() {
   
  // Allow any number of plants to be selected
  // Select plant i if the mouse is pressed near plant i  
  // Deselect if pressed after it is already selected
  for(let i = 0; i < gen0.plants.length; i++) {
    let p = gen0.plants[i]
    let leftLimit = p.pos.x - width / (gen0.plants.length * 4)
    let rightLimit = p.pos.x + width / (gen0.plants.length * 4)
    if(mouseX > leftLimit && mouseX < rightLimit && 
      mouseY > 10 && mouseY < height-20 && mouseY > 50)
    {
      // Draw circle as soon as plant is selected,
      // but selection is possible only if plant has reached its final height (see toggleSelect)

      let currPlant = p.toggleSelect()
      if(currPlant.selected) { 
        // displayPlantInfo(`plant-${i}`, currPlant.genes)
        gen0.selectedPlants.push(currPlant)   
      } 
      else {
        // hidePlantInfo(`plant-${i}`)
      } 
    } 
  }
}

function displayPlantInfo(name, genes) { 
  let infoSection = document.querySelector('#selection-info')

  let plantInfoSection = document.createElement('main')
  plantInfoSection.id = `plant-${name}`
  plantInfoSection.classList.add('plant-info')
  let plantName = document.createElement('h2')
  plantName.innerText = name
  let collapseButton = document.createElement('button') 
  collapseButton.innerText = '-'
  let infoDiv = document.createElement('div')
  // infoDiv.id = `plant-${name}`
  collapseButton.onclick = () => {
    infoDiv.classList.toggle('hidden')
    collapseButton.innerText = collapseButton.innerText == '-' ? '+' : '-'
  }

  let infoArray = Object.entries(genes)
  infoArray.forEach(info => {
    let p = document.createElement('p')
    p.innerText = `${info[0]} : ${info[1]}`
    infoDiv.appendChild(p)
  })

  plantInfoSection.appendChild(collapseButton) 
  plantInfoSection.appendChild(plantName)
  plantInfoSection.appendChild(infoDiv)
  infoSection.appendChild(plantInfoSection) 

}

function hidePlantInfo(name) {
  const plantInfoSection = document.querySelector(`#plant-${name}`) 
  plantInfoSection.remove()
}