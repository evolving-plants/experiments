class Back {
  constructor() {
    this.sky
    this.yoff = 0.0
    this.cloud1
    this.cloud2
    this.cloud3
    this.cloud4
    this.numfiles = 4
    this.clouds = []
    //array of cloud images
    this.arrayoffiles = [
      '/assets/images/Cloud 1.png', 
      '/assets/images/Cloud 2.png', 
      '/assets/images/Cloud 3.png', 
      '/assets/images/Cloud 4.png'
    ]
    //set number of clouds
    this.numClouds = 100

    this.drop = [] 
  }

  load() {
    this.arrayoffiles.forEach((path, index) => {
      this.arrayoffiles[index] = loadImage(path)
    })
    this.sky = loadImage('/assets/images/Sky.png');
  }

  init() {
    for(let d = 0; d < 600; d++) {
      this.drop[d] = new Raindrop();
    } 
    for(let i = 0, j = 0 ; i < this.numClouds; i++, j++){
      if (j == this.numfiles){
        j = 0
      }
      this.clouds[i] = new Cloud();
      this.clouds[i].cloudimage = this.arrayoffiles[j]
    }
  }

  draw() {
    background (this.sky,2000,800);
    //filter(GRAY) to make BG night
    
    for(let i = 0; i < this.clouds.length; i++){
      this.clouds[i].move();
      this.clouds[i].show();
      
    }
 
    for(let d = 0; d < 300; d++) {
      this.drop[d].show();
      this.drop[d].update();
    }
    //tint(255, 127) to make clouds transparent
    
    fill(147,112,219);
    beginShape();

    let xoff = 0; 
      
    for (let x = -10; x <= width; x += 10) {

      let y = map(noise(xoff, this.yoff), 0, 1, 400, 300);
      vertex(x, y);
      xoff += 0.03;
    }

    this.yoff += 0.005;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }


}