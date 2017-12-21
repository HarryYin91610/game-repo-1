let Wave = class {
  constructor () {
    for (let i = 0; i < Wave.num; i++) {
      Wave.alive[i] = false
      Wave.r[i] = 0
    }
  }
  born (x, y) {
    for (let i = 0; i < Wave.num; i++) {
      if (Wave.alive[i] === false) {
        Wave.alive[i] = true
        Wave.r[i] = 10
        Wave.x[i] = x
        Wave.y[i] = y
        break
      }
    }
  }
  draw (context) {
    context.save()
    context.shadowBlur = 5
    context.shadowColor = '#fff'
    context.lineWidth = 2
    for (let i = 0; i < Wave.num; i++) {
      if (Wave.alive[i] === true) {
        Wave.r[i] += 1
        if (Wave.r[i] > 50) {
          Wave.alive[i] = false
          break
        }
        let alpha = 1 - Wave.r[i] / 50
        context.beginPath()
        context.arc(Wave.x[i], Wave.y[i], Wave.r[i], 0, 2 * Math.PI)
        context.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')'
        context.stroke()
      }
    }
    context.restore()
  }
}

Wave.x = []
Wave.y = []
Wave.alive = []
Wave.r = []
Wave.num = 10

export default Wave
