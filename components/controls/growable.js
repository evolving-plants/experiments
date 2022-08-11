class Growable {
  
  constructor(bp) {
    this.timer = new Timer(bp)
    this.time = this.timer.time
    this.children = []
  }

  growMe() {
    this.time = this.timer.time
  }

  growChildren() {
    this.children.forEach(child => {
      child.timer.count()
      child.growMe()
      child.grow()
    })
  }

  setSpeed(speed) {
    this.timer.setInc(speed)
    this.children.forEach(child => child.setSpeed(speed))
  }

}