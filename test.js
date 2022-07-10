let part


function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  angleMode(DEGREES)

  // part = new Bud(
  //   width/2,
  //   height/2,
  //   0, 
  //   10,
  //   null
  // )

  // part = new SeedPod(
  //   width/2,
  //   height/2,
  //   1,
  //   0, 
  //   null
  // )


  part = new Stem(
    width/2,
    height/2,
    1,
    null,
    true
  )
}

function draw() {
  // time = millis()/1000.0

  part.setSpeed(2)
  part.timer.count()
  background(220)


  part.grow()
  part.draw()
}
