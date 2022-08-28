
let globalTime = 0

// Change nPlants here to set the number of plants in the population
const gen0 = new Generation(3) 
let circles = [] 

let newSeasonButton

let slider

let back = new Back()

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  angleMode(DEGREES)

  newSeasonButton = createButton('new season')
  newSeasonButton.mousePressed(() => gen0.newSeason()) 

  slider = createSlider(1, 50, 5);
  slider.position(10, 30);
  slider.style('width', '80px');

  gen0.init() 
  // back.init() 
       // Define sky
       sky = new NightSky()
} 

function draw() { 
  back.draw()

  // Set the speed here
  fill(255,0,0)
  let val = slider.value()
  gen0.setSpeed(val)

  textSize(28)
  fill(255,0,0)
  text(' TIME', 10, 30)

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
      gen0.selectedPlants.push(currPlant)      
    } 
  }
}