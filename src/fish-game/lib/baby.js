let Baby = class {
  constructor (cwidth, cheight) {
    this.x = cwidth * 0.5 - 50
    this.y = cheight * 0.5 + 50
    this.angle = 0
    this.eye = new Image()
    this.eye.src = require('../assets/babyEye0.png')
    this.body = new Image()
    this.body.src = require('../assets/babyFade0.png')
    this.tail = new Image()
    this.tail.src = require('../assets/babyTail0.png')
    this.bcurBody = 0
    this.bcurTail = 0
    this.bcurEye = 0
  }
  update (position) {
    this.x = position.x
    this.y = position.y
  }
  draw (context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(this.tail, -this.tail.width * 0.5 + 25, -this.tail.height * 0.5, 27, 37)
    context.drawImage(this.body, -this.body.width * 0.5, -this.body.height * 0.5)
    context.drawImage(this.eye, -this.eye.width * 0.5, -this.eye.height * 0.5)
    context.restore()
  }
}
export default Baby
