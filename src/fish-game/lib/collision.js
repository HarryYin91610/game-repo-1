import Utils from './utils.js'

let Collision = {}
Collision.isCollide = function (Fruit, fish, data, wave) {
  for (let i = 0; i < Fruit.num; i++) {
    if (Fruit.alive[i]) {
      let distance = Utils.calDistance(Fruit.x[i], Fruit.y[i], fish.x, fish.y)
      if (distance < 900) {
        // collided --> fruit eaten
        wave.born(Fruit.x[i], Fruit.y[i]) // 产生白色波纹
        Fruit.alive[i] = false
        data.fruitNum ++
        fish.mcurBody ++
        if (fish.mcurBody > 7) {
          fish.mcurBody = 7
        }
        if (Fruit.type[i] === 1) {
          // 吃到蓝色果实
          data.double = 1
        }
      }
    }
  }
}
Collision.feedBaby = function (mom, baby, data, halo) {
  let distance = Utils.calDistance(mom.x, mom.y, baby.x, baby.y)
  if (distance < 900 && data.fruitNum > 0) {
    halo.born(baby.x, baby.y) // 产生黄色光圈
    // score update
    data.score += data.fruitNum * 100 * (data.double + 1)
    // collided --> baby recover
    mom.mcurBody = 0
    baby.bcurBody = 0
    data.fruitNum = 0
    data.double = 0
  }
}
export default Collision
