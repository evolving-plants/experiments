class StormBackground {
  constructor() {
    this.clouds = [];
    this.rain = [];
    this.cloudysky
    this.lightning = [];
    this.lightx = 200;
    this.lighty = 0;
    this.lightw = 10;
    this.numclouds = 10;
    this.changeR = 140;
    this.changeG = 150;
    this.changeB = 230;
    this.moreclouds = false
    this.overcome = false
    this.lightnin = false
    this.raining = false
    this.clearing = false
    this.lessrain = false
  }

  init() {
    // Define the starting position of each cloud
    for (let i = 0; i < this.numclouds; i++) {
      let x = random(-900,-100);
      let y = random(-60,160);
      this.clouds[i] = new Cloud(x, y);
    }
    
    // Define rain
      for(let i = 0; i < 300; i++) {
      this.rain[i] = new Rain();
    }
    
    // Define a cloudy sky
    this.cloudysky = new Overcast();
    
    // Define a bolt of lightning
    for (let i = 0; i < 10; i++) {
      this.lightx += 10 * random(-8,8);
      this.lightw = random (1,10);
    this.lightning[i] = new Lightning(this.lightx, this.lighty, this.lightw); 
    }
  }

  draw() {
     // Set background changes
    //Getting stormy
    if(this.overcome == true && this.raining == false) {
      this.changeR -= .04;
      this.changeG -= .04;
      this.changeB -= .07;
    }
      // Grey sky while raining
    if(this.raining == true) {
      this.changeR = 160;
      this.changeG = 165;
      this.changeB = 180;
    }
      // Sky clearing up
    if (this.clearing == true) {
      if (this.changeR > 141) {
      this.changeR -= .04;
      this.changeG -= .04;
      this.changeB += .08;
      }
    }
      background(this.changeR, this.changeG, this.changeB);
    
    // Lightning
    if(this.raining == false && this.lightnin == true && this.clearing == false) {
      for(let bolt of lightning) {
        bolt.make();
      }     
    }
    
      // Move overcast clouds in or out
    if(this.overcome == true || this.clearing == true) {
      this.cloudysky.move() 
      this.cloudysky.show()
    } else {
    // Display overcast clouds whenever it is raining
    if (this.raining == true)
    this.cloudysky.show()
    }
    
    // Rain
    if (this.raining == true) {
      // // Rain signals overcast clouds to stop moving
      // overcome = false
      if (this.lessrain == false) {
        for(let drop of rain) {
          drop.show();
          drop.move();
        } 
      } else {
        for(let i = 0; i < 50; i++) {
          this.rain[i].show();
          this.rain[i].move();
        }
      }
    }
    // Add more clouds
    if(this.moreclouds == true) {
      for (let i = 6; i < this.numclouds; i++) { 
        this.clouds[i].show();
        this.clouds[i].move();
      }
    }

    // Scattered clouds will appear throughout
    for (let i = 0; i < 6; i++) { 
      this.clouds[i].show();
      this.clouds[i].move();
    }
      // The following is for clouds to reappear after clearing up
    if (this.changeR > 140 && this.changeB > 214) {
      this.clearing = false
      this.lightnin = false
      for (let i = 10; i < 14; i++) { 
        this.clouds[i].show();
        this.clouds[i].move();
      }
    }
  }
}