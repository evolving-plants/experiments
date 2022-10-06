
let globalTime = 0

const gen0 = new Generation(4) 
// let circles = [] // This is not needed ???????

let newSeasonButton

let timeSlider 
let slider

function setup() {
  createCanvas(window.innerWidth-220, window.innerHeight)
  angleMode(DEGREES)

   hills = new Hills()
   back = new Back()

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

} 


function draw() {
  background(120,160,230)

  gen0.setSpeed(timeSlider.value())

  if (timeSlider.value() == 0) {
    back.transition()
    back.draw()
  } else {
  // Draw the hills in a static daytime colour 
  fill(100,190,200)  
  noStroke()
  hills.draw()
  }
 
  gen0.grow()
  gen0.draw()

  // circles.forEach(c => {
  //   fill(255, 120, 250)
  //   stroke(255, 0, 0) 
  //   circle(c.x, c.y, 2000) 
  // })
  
}


function mousePressed() {
   
  // Allow any number of plants to be selected
  // Select plant i if the mouse is pressed near plant i
  for(let i = 0; i < gen0.plants.length; i++) {
    let p = gen0.plants[i]
    let leftLimit = p.pos.x - width / (gen0.plants.length * 4)
    let rightLimit = p.pos.x + width / (gen0.plants.length * 4)
    if(mouseX > leftLimit && mouseX < rightLimit && 
      mouseY > 10 && mouseY < height-10)
    {
      // draw circle as soon as plant is selected, but selection is possible only if plant has reached its final height

      let currPlant = p.toggleSelect()
      if(currPlant.selected) {
        displayPlantInfo(`plant-${i}`, currPlant.genes)
        // gen0.selectedPlants.push(currPlant)      
      } 
      else {
        hidePlantInfo(`plant-${i}`)
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