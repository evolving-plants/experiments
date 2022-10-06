class NightSky {
  constructor(x,y){
    this.pos = createVector(x, y)
    this.stars = []
    // Define the position and radius of each star
    for (let i = 0; i < 100; i++) {
      this.sx = (random(-10,width+30))
      this.sy = (random(-30,height*.5))
      this.size = random(5,100)
      this.stars[i] = new Star(this.sx, this.sy, this.size)
      this.angle = 0
    }
  }   
  turn() {
    this.angle += (this.angle <= 20) ? .1:0
  }  
  
  begin() {
    this.angle = 0
  }
    
  show() {
    fill (255)
    push ()
      rotate(this.angle)
      for(let star of this.stars) {
        star.show() 
     }  
    pop ()
  } 
}