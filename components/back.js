class Back { 
  constructor() {
    this.startColor = 120;
    this.speedAnimate = 1
    this.night = false
    this.gradual = 120
    this.time = 12
    this.skyR = 120
    this.hillR = 120
    this.hillG = 120
    this.hillB = 120
  }
  
  transition() {
  // The daytime sky colour: (120,160,230) 
  // The daytime hills colour: (100,190,200) 
  // this.night controls whether there will be a sunrise or sunset
  // this.time increases from 0 and 12, and is then reset back to 0
  // Dusk begins when this.time reaches 5 if this.night = false
  // Dawn begins when this.time reaches 5 if this.night = true

    this.time += 0.1 
    if (this.time > 5 && this.night == false) {
      this.skyR += (this.skyR < 255) ? 4.5:0
    }
    if (this.time > 5 && this.night == true) {
      this.skyR -= (this.skyR > 120) ? 4.5:0
    }
    if (this.time >= 12) {
      this.night = !this.night
      this.time = 0
    }
    console.log ('NIGHT?', this.night, 'this.skyR', this.skyR)
  }
  // this.skyR = this.gradual
  // if (this.night == false) {
  //   this.gradual += (this.gradual < 255) ? 1:0 
  //   if (this.gradual > 5) {
  //     this.skyR = 120
  //   }
  //   if (this.gradual >= 255 && this.night == false) {
  //     this.night = true
  //   }
  //   } else {
  //   this.gradual -= (this.gradual > 0) ? 1:0  
  //   if (this.gradual < 220) {
  //     this.skyR = 255
  //   }
  //   if (this.gradual <= 0 && this.night == true) {
  //     this.night = false 
  //     }  
  //   }
  // }

  draw() {
    // The daytime sky colour: (120,160,230) 
    background(120,160,230)
    // background(120,130,190)
   
    // background(this.skyR,160,230)

    if(this.startColor > height*.7 + 255 || this.startColor< 255) {
      this.speedAnimate *= -1;
    }
    this.startColor += this.speedAnimate;
    noStroke()
    let gap = 0;
    let numRectangles = 20;
    let rectHeight = height*.7 / numRectangles;
    for (let x = 0; x < height*.7; x += gap + rectHeight) {
      let red = this.startColor + x*.5

      if (red < 1) {
        // background(110,130,240,this.gradual)
        // this.night += (this.night < 255) ? 2:0
        // fill(this.night)
        sky.show() 
  
      } else { 
      let green = 60;
      fill(red, this.skyR, 180+this.skyR);
      rect(0, x, width, rectHeight)
      // background(90,100,220,40)
      }
    }
    // background(0,0,0,50-this.gradual)

    // Make the hills get darker at dusk and lighter at dawn
    // The daytime hills colour: (100,190,200) 
    fill(124 -this.skyR*.2,250-this.skyR*.5,248-this.skyR*.4)
    noStroke() 

    hills.draw()
  } 
   
}