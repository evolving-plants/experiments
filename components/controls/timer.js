class Timer {
  constructor(bp) {
    this.time = 0
    this.inc = 1
    this.bp = bp
  }

  setInc(inc) {
    // this.bp *= inc/this.inc

    this.inc = inc
  }

  count() {
    this.time += this.inc
  }

  // count(inc) {
  //   this.inc = inc
  //   this.count()
  // }

}