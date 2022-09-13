
let globalTime = 0

// Change nPlants here to set the number of plants in the population

const gen0 = new Generation(3) 
let circles = [] 

let newSeasonButton
let timeSlider 

let slider

let back = new Back()

function setup() {
  createCanvas(window.innerWidth-220, window.innerHeight)
  angleMode(DEGREES)

  newSeasonButton = createButton('new season')

  newSeasonButton.position(width-160, 10)
  newSeasonButton.mousePressed(() => {
    gen0.newSeason()
    
    // display new season info
    document.querySelector('#selection-info').innerHTML = ''
    
    // gen0.children.forEach((child, index) => displayPlantInfo(`plant-${index}`, child.genes))

  })

  timeSlider = createSlider(0, 10, 2)
  timeSlider.position(90, 10)

  gen0.init()
  // back.init() 
       // Define sky
       sky = new NightSky()
} 


function draw() {
  background(110,130,240)
  gen0.setSpeed(timeSlider.value())

  // if(frameCount % 100 == 0) { 
  // back.draw()
  // } 
  // else {
  //   background(110,130,240)
  //   background(0)
  //   stroke('black') 
  //   sky.show() 

  //   fill(0)
  //   bezier(0, height,   -800, height-700,   width+550, height-200,   width, height)
  // }

  // randomSeed(10)
  strokeWeight(1);
  fill(10, 240, 10)
  // text("("+mouseX+", "+mouseY+", )", mouseX, mouseY);

  gen0.grow()
  gen0.draw()
  circles.forEach(c => {
    fill(255, 0, 0)
    stroke(255, 0, 0) 
    circle(c.x, c.y, 20) 


  })
  
}


function mousePressed() {
    // Do not allow selection if DROP SEEDS has already been pressed
    // if (seeddroppressed == false) {

  // Allow any number of plants to be selected
  // Select plant i if the mouse is pressed near plant i
  for(let i = 0; i < gen0.plants.length; i++) {
    let p = gen0.plants[i]
    let leftLimit = p.pos.x - width / (gen0.plants.length * 4)
    let rightLimit = p.pos.x + width / (gen0.plants.length * 4)
    if(mouseX > leftLimit && mouseX < rightLimit && 
      mouseY > 10 && mouseY < height-10)
    {
      // as soon as plant is selected ???? or when new season is pressed????
    // or only if the seedpods are all fully developed   ??

      let currPlant = p.select()
      if(currPlant) {
        displayPlantInfo(`plant-${i}`, currPlant.genes)
        gen0.selectedPlants.push(currPlant)      
      }
    } 
  }
}

function displayPlantInfo(name, genes) { 
  let infoSection = document.querySelector('#selection-info')

  let plantInfoSection = document.createElement('main')
  plantInfoSection.classList.add('plant-info')
  let plantName = document.createElement('h2')
  plantName.innerText = name
  let collapseButton = document.createElement('button') 
  collapseButton.innerText = '-'
  let infoDiv = document.createElement('div')
  infoDiv.id = `plant-${name}`
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