let Fruit = class {
  init (fruitPic, Ane, cheight) {
    for (let i = 0; i < Fruit.num; i++) {
      Fruit.alive[i] = false
      Fruit.x[i] = 0
      Fruit.y[i] = 0
      Fruit.type[i] = -1
      Fruit.speed[i] = Math.random() * 0.017 + 0.003
    }
    Fruit.fruitPic = fruitPic
    Fruit.ready = true
  }
  born (fid, Ane, cheight) {
    Fruit.aneID[fid] = Math.floor(Math.random() * Ane.num)
    Fruit.l[fid] = 0
    Fruit.alive[fid] = true
    Fruit.type[fid] = Math.random() < 0.3 ? 1 : 0
  }
  monitor (Ane, cheight) {
    let anum = 0
    for (let i = 0; i < Fruit.num; i++) {
      if (Fruit.alive[i]) {
        anum++
      }
    }
    if (anum < 15) {
      this.sendFruit(Ane, cheight)
    }
  }
  sendFruit (Ane, cheight) {
    for (let i = 0; i < Fruit.num; i++) {
      if (!Fruit.alive[i]) {
        this.born(i, Ane, cheight)
        break
      }
    }
  }
  draw (context, Ane) {
    for (let i = 0; i < Fruit.num; i++) {
      if (Fruit.alive[i] === true) {
        if (Fruit.l[i] <= 14) {
          Fruit.l[i] += Fruit.speed[i] * 30
          Fruit.x[i] = Ane.headx[Fruit.aneID[i]]
          Fruit.y[i] = Ane.heady[Fruit.aneID[i]]
        } else {
          Fruit.y[i] -= Fruit.speed[i] * 7 * 8
        }
        context.drawImage(Fruit.fruitPic[Fruit.type[i]], Fruit.x[i] - Fruit.l[i] * 0.5, Fruit.y[i] - Fruit.l[i] * 0.5, Fruit.l[i], Fruit.l[i])
        if (Fruit.y[i] < 10) {
          Fruit.alive[i] = false
        }
      }
    }
  }
}

Fruit.num = 30
Fruit.alive = []
Fruit.fruitPic = []
Fruit.x = []
Fruit.y = []
Fruit.l = []
Fruit.speed = []
Fruit.type = []
Fruit.aneID = []
Fruit.ready = false

export default Fruit
