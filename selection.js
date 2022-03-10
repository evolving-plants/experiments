// 
const gen0 = new Generation(2)
let circles = []

let newSeasonButton
let isDropping = false

let back = new Back()

function preload() {
  back.load()
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  angleMode(DEGREES)

  newSeasonButton = createButton('new season')
  newSeasonButton.mousePressed(() => {
    gen0.newSeason()
  })

  gen0.init()
  back.init()
}

function draw() {
  // back.draw()
  background(85,110,200)
  // randomSeed(10)

  gen0.grow()
  circles.forEach(c => {
    fill(255, 0, 0)
    stroke(255, 0, 0)
    circle(c.x, c.y, 20)


  })
  
}


function mousePressed() {
  for(let i = 0; i < gen0.plants.length; i++) {
    let p = gen0.plants[i]
    let leftLimit = p.pos.x - 200
    let rightLimit = p.pos.x + 200
    if(mouseX > leftLimit && mouseX < rightLimit && 
      mouseY > 10 && mouseY < height-10) 
    {
      // as soon as plant is selected
      let currPlant = p.select()
      gen0.selectedPlants.push(currPlant)      
    }
  }
}