class Hills {

  draw() {
     beginShape()
     vertex(0, height)
     bezierVertex(0,height,   0,height*.5,   0,height*.5)
     bezierVertex(width*.3,height*.7,  width*.8,height*.6,  width,height*.55)
     bezierVertex(width,height*.6,   width,height,   width,height)
   endShape() 
  }
}