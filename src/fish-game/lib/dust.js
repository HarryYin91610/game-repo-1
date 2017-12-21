let Dust = class {
  constructor (cwidth, cheight) {
    for (let i = 0; i < Dust.num; i++) {
      Dust.x[i] = Math.random() * cwidth
      Dust.y[i] = Math.random() * cheight
      Dust.amp[i] = 20 + Math.random() * 15
      Dust.NO[i] = Math.floor(Math.random() * 7)
    }
  }
  draw (context, images) {
    Dust.alpha += 1
    let l = Math.sin(Dust.alpha / 180 * Math.PI)
    for (let i = 0; i < Dust.num; i++) {
      context.drawImage(images[Dust.NO[i]], Dust.x[i] + l * Dust.amp[i], Dust.y[i])
    }
  }
}

Dust.x = []
Dust.y = []
Dust.amp = []
Dust.NO = []
Dust.alpha = 0
Dust.num = 30

export default Dust
