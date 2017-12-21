let Ane = class {
  init (cheight) {
    for (let i = 0; i < Ane.num; i++) {
      Ane.rootx[i] = i * 16 + Math.random() * 20
      Ane.headx[i] = Ane.rootx[i]
      Ane.heady[i] = cheight - 250 + Math.random() * 50
      Ane.amp[i] = Math.random() * 50 + 30
    }
  }
  draw (context, cheight) {
    Ane.alpha += 1
    let l = Math.sin(Ane.alpha / 180 * Math.PI) // [-1  1]
    context.save()
    context.globalAlpha = 0.6
    context.lineWidth = 20
    context.lineCap = 'round'
    context.strokeStyle = '#3b154e'
    for (let i = 0; i < Ane.num; i++) {
      context.beginPath()
      context.moveTo(Ane.rootx[i], cheight)
      Ane.headx[i] = Ane.rootx[i] + l * Ane.amp[i]
      context.quadraticCurveTo(Ane.rootx[i], cheight - 100, Ane.headx[i], Ane.heady[i])
      context.stroke()
    }
    context.restore()
  }
}

Ane.num = 50
Ane.rootx = []
Ane.headx = []
Ane.heady = []
Ane.amp = []
Ane.alpha = 0

export default Ane
