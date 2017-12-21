let Halo = class {
  constructor () {
    for (let i = 0; i < Halo.num; i++) {
      Halo.alive[i] = false
      Halo.r[i] = 0
    }
  }
  born (x, y) {
    for (let i = 0; i < Halo.num; i++) {
      if (Halo.alive[i] === false) {
        Halo.alive[i] = true
        Halo.r[i] = 10
        Halo.x[i] = x
        Halo.y[i] = y
        break
      }
    }
  }
  draw (context) {
    context.save()
    context.shadowBlur = 20
    context.shadowColor = '#FFFF00'
    context.lineWidth = 2
    for (let i = 0; i < Halo.num; i++) {
      if (Halo.alive[i] === true) {
        Halo.r[i] += 1
        if (Halo.r[i] > 100) {
          Halo.alive[i] = false
          break
        }
        let alpha = 1 - Halo.r[i] / 100
        context.beginPath()
        context.arc(Halo.x[i], Halo.y[i], Halo.r[i], 0, 2 * Math.PI)
        context.strokeStyle = 'rgba(255, 69, 0, ' + alpha + ')'
        context.stroke()
      }
    }
    context.restore()
  }
}

Halo.x = []
Halo.y = []
Halo.alive = []
Halo.r = []
Halo.num = 5

export default Halo
