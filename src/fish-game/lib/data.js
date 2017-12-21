let Data = class {
  constructor () {
    this.fruitNum = 0
    this.double = 0
    this.score = 0
    this.end = false
    this.alpha = 0
  }
  draw (context, cwidth, cheight) {
    // 绘制分数
    context.save()
    context.shadowBlur = 10
    context.shadowColor = 'white'
    context.fillStyle = 'white'
    context.font = '20px Verdana'
    context.textAlign = 'center'
    context.fillText('Score: ' + this.score, cwidth * 0.5, cheight - 80)
    // 绘制游戏结束
    if (this.end) {
      this.alpha = this.alpha + 0.002 > 1 ? 1 : this.alpha + 0.002
      context.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')'
      context.font = '30px Verdana'
      context.textAlign = 'center'
      context.fillText('GAMEOVER', cwidth * 0.5, cheight * 0.5)
    }
    context.restore()
  }
}
export default Data
