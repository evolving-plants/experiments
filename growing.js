let h = 20
let n = 2
let prevh = h
let stems 
let back = new Background()

function preload() {
  back.load()
}


function setup() {
  createCanvas(800, 800)
  angleMode(DEGREES)
  stems = [
    new Stem(width/2, height, -1)
  ]
}


function draw() {
  background(85,110,200)
  randomSeed(2)
  let t = millis()/1000
  if(h < height*2/3) {
    h += t * 0.01
    if(frameCount % 200 == 0) {
      let last = stems[stems.length-1]
      let dir = (stems.length % 2 == 0) ? -1 : 1
      stems.push(new Stem(
        width/2, 
        last.pos.y-10,
        dir
      ))
    }
  } 
  
  
  
  line(width/2, height, width/2, height-h)
  
  for(let i = 0; i < stems.length; i++) {
    let b = stems[i]
    b.grow()
    b.show()
  }
}