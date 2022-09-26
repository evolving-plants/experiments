class Back { 
  constructor() {
    this.startColor = 255;
    this.speedAnimate = 1
    this.whiten = 0
    this.gradual = 0
  }
  

  draw() {
    background(120,130,190)
    this.gradual += (this.gradual < 150) ? 2:0 
    if(this.startColor > height*.7 + 255 || this.startColor < 255) {
      this.speedAnimate *= -1;
    }
    this.startColor += this.speedAnimate;
    noStroke()
    let gap = 0;
    let numRectangles = 10;
    let rectHeight = height*.7 / numRectangles;
    for (let x = 0; x < height*.7; x += gap + rectHeight) {
      let red = this.startColor - x*.5

      if (red < 1) {
        background(110,130,240,this.gradual)
        this.whiten += (this.whiten < 255) ? 2:0
        fill(this.whiten)
        sky.show() 
  
      } else { 
      let green = 60;
      fill(red, green, 80);
      rect(0, x, width, rectHeight)
      background(90,100,220,40)
      }
    }
    background(0,0,0,50-this.gradual)

    fill(100-this.gradual*.5,190-this.gradual,200-this.gradual*.6)
  // fill(120-this.gradual*.5,150-this.gradual,40+this.gradual*.3)
    noStroke() 

    hills.draw()
  } 
   
}