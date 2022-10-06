class Back { 
  constructor() {
    this.startColour = 120;
    this.speedAnimate = 1
    this.night = true
    this.time = 12
    this.starBright = 0
    this.skyR = 120
    this.angle = 0

    // Define sky
    this.sky = new NightSky()
  }
  
  transition() {
  // The daytime sky colour: (120,160,230) 
  // The daytime hills colour: (100,190,200) 
  // this.time increases from 0 and 12, and is then reset back to 0
  // This.night is true from 12am (midnight) to 12pm (noon)
  // This.night is false from 12pm (noon) to 12am (midnight)
  // Dusk begins when this.time reaches 5 if this.night = false
  // Dawn begins when this.time reaches 5 if this.night = true

  // Make time pass
    this.time += 0.1 

    if (this.time > 5 && this.night == false) {
      // Dusk: skyR (red) increases to 255
      this.skyR += (this.skyR < 255)? 4.5:0
    }
    if (this.time > 5 && this.night == true) {
      // Dawn: skyR (red) changes to daytime sky colour
      this.skyR -= (this.skyR > 120)? 4.5:0
    }


    if (this.time > 8 && this.night == false) {
      // It is dark, so the stars come out
      this.starBright += (this.starBright < 255)? 2:0
    }
    if (this.night == true && this.time > 5) {
      // the stars go out
      this.starBright -= (this.starBright > 0)? 2:0
    }
   
    // Set time back to 0 after 12
    if (this.time >= 12) {
      this.night = !this.night 
      this.time = 0
    }
    console.log ('NIGHT?', this.night, 'this.skyR', this.skyR, "starBright", this.starBright)
  }

  draw() {
    // The daytime sky colour: (120,160,230) 
    background(this.skyR,160,230)

    if(this.time > 5 && this.night == false) {
    // if(this.startColour > height*.7 + 255 || this.startColour> 255) {
      this.speedAnimate *= -1;

    this.startColour += this.speedAnimate;
    noStroke()
    let numRectangles = 10;
    let rectHeight = height*.7 / numRectangles;
    for (let x = 0; x < height*.7; x += rectHeight) {
      let red = this.startColour + x*.1
      fill(red*1.2, this.skyR*.9, 180+this.skyR);
      rect(0, x, width, rectHeight)
    }
  }
  
    // The stars come out
    if ((this.time > 8 && this.night == false) || (this.time < 5 && this.night == true)) { 
      // The sky gets blacker or less black, depending on starBright
      fill (0,0,0,this.starBright*7)
      rect (0,0,width,height)
      stroke(255,255,255,this.starBright)
      this.sky.turn()
      this.sky.show() 
      // rotate the stars back to 0 to begin a new night
      if (this.time <= 9.5 && this.night == false) {
        this.sky.begin()
      }
    }
    
    // Make the hills get darker at dusk and lighter at dawn
    // The daytime hills colour: (100,190,200) 
    fill(124-this.skyR*.2,250-this.skyR*.5,248-this.skyR*.4)
    noStroke() 
    hills.draw()
  } 
}