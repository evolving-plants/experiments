// Change nPlants here to set the number of plants in the population
const gen0 = new Generation(4) 
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
    // Check to make sure all the seeds have fallen to the ground ????


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
    // but only if the seedpods are all fully developed   ?????

      let currPlant = p.select()
      gen0.selectedPlants.push(currPlant)      
    }
  }
}