class NightSky {
  constructor(x,y){
    this.pos = createVector(x, y)
    this.stars = []
    // Define the position and radius of each star
    for (let i = 0; i < 120; i++) {
      this.sx = (random(-20,width+20))
      this.sy = (random(-20,height*.6))
      this.size = random(5,100)
      this.stars[i] = new Star(this.sx, this.sy, this.size)
    }
  }                              
    
  show() {
    for(let i = 0; i < this.stars.length; i++) {
      this.stars[i].show()
    }  
  }
}