let Mom = class {
  constructor (cwidth, cheight) {
    this.x = cwidth * 0.5
    this.y = cheight * 0.5
    this.angle = 0
    this.eye = new Image()
    this.eye.src = require('../assets/bigEye0.png')
    this.body = new Image()
    this.body.src = require('../assets/bigSwim0.png')
    this.tail = new Image()
    this.tail.src = require('../assets/bigTail0.png')
    this.mcurTail = 0
    this.mcurEye = 0
    this.mcurBody = 0
  }
  update (position) {
    this.x = position.x
    this.y = position.y
  }
  draw (context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(this.tail, -this.tail.width * 0.5 + 30, -this.tail.height * 0.5)
    context.drawImage(this.body, -this.body.width * 0.5, -this.body.height * 0.5)
    context.drawImage(this.eye, -this.eye.width * 0.5, -this.eye.height * 0.5)
    context.restore()
  }
}

export default Mom
