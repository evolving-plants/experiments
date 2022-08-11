class Back { 
  constructor() {
    this.startColor = 255;
    this.speedAnimate = 1;
  }
  


  draw() {
    if(this.startColor > height + 255 || this.startColor < 255) {
      this.speedAnimate *= -1;
    }
    this.startColor += this.speedAnimate;
    noStroke()
    let gap = 0;
    let numRectangles = 10;
    let rectHeight = height / numRectangles;
    for (let x = 0; x < height; x += gap + rectHeight) {
      let green = this.startColor - x;
      let red = 255;
      fill(red, green, 0);
      rect(0, x, width, rectHeight)
    }
  }


}