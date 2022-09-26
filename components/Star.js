class Star {
  constructor(x,y,size){
    this.pos = createVector(x, y)
    this.size = size * 0.2
    }     
    
  show() {
    strokeWeight(3)
    // fill(255)
    push()
      translate(this.pos.x, this.pos.y)
      noStroke()
      circle(random(3), random(3), random(4))
      for (let i = 0; i < 9; i++) {
        rotate (40)
        stroke(255,255,255,50)
        let ry = random(-2,2)
         line (8+random(2), 6, 10+this.size*.5, 10+this.size*.5+random(2)) 
         
      }  
      rotate(4)
        for (let i = 0; i < 18; i++) {
          rotate (20)
          stroke(255,255,255,100)
          let ry = random(-2,2) 
          line (10+this.size+random(2), 11+ this.size, 17+this.size, 18+this.size+random(2))
        }
        rotate(8)
        for (let i = 0; i < 54; i++) {
          rotate (10)
          stroke(255,255,255,50)
          let ry = random(-2,2) 
          line (22+this.size+random(2), 21+ this.size, 30+this.size, 31+this.size+random(2))
        }   
      pop ()
    }
  }