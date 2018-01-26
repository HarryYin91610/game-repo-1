<template lang="jade">
  div.panel1-wrapper
    canvas(id="myCanvas")
      | 非常抱歉，您的浏览器不支持Canvas，请更换浏览器后再尝试。
</template>

<style lang="stylus" scoped>
</style>

<script>
  export default {
    data () {
      return {
        cwidth: 0,
        cheight: 0,
        stage: {},
        tweens: [],
        textObj: {},
        activeCount: 0,
        circleCount: 25
      }
    },
    methods: {
      // 窗口尺寸改变处理
      resize () {
        let canvas = document.getElementById('myCanvas')
        this.cwidth = window.innerWidth
        this.cheight = window.innerHeight
        canvas.width = this.cwidth
        canvas.height = this.cheight
      },
      initCircles () {
        /* eslint-disable */
        for (let i = 0; i < this.circleCount; i++) {
          // draw the circle, and put it on stage:
          let circle = new createjs.Shape()
          circle.graphics.setStrokeStyle(15)
          circle.graphics.beginStroke("#113355")
          circle.graphics.drawCircle(0, 0, (i + 1) * 4)
          circle.alpha = 1 - i * 0.02
          circle.x = Math.random() * 550
          circle.y = Math.random() * 400
          circle.compositeOperation = "lighter"

          let tween = createjs.Tween.get(circle).to({x: 275, y: 200}, (0.5 + i * 0.04) * 1500, createjs.Ease.bounceOut).call(this.tweenComplete)
          this.tweens.push({tween: tween, ref: circle})
          this.stage.addChild(circle)
        }
        this.activeCount = this.circleCount
        this.stage.addEventListener("stagemouseup", this.handleMouseUp)

        this.textObj = new createjs.Text("Click Anywhere to Tween", "36px Arial", "#777")
        this.textObj.x = 350
        this.textObj.y = 200
        this.stage.addChild(this.textObj)

        createjs.Ticker.addEventListener("tick", this.tick)
      },
      tweenComplete () {
        this.activeCount--
      },
      tick (event) {
        /* eslint-disable */
        if (this.activeCount) {
          this.stage.update(event)
        }
      },
      handleMouseUp(event) {
        /* eslint-disable */
        if (this.textObj) {
          this.stage.removeChild(this.textObj)
          this.textObj = null
        }
        for (let i = 0; i < this.circleCount; i++) {
          let ref = this.tweens[i].ref
          let tween = this.tweens[i].tween
          createjs.Tween.get(ref, {override: true}).to({x: this.stage.mouseX, y: this.stage.mouseY}, (0.5 + i * 0.04) * 1500, createjs.Ease.bounceOut).call(this.tweenComplete)
        }
        this.activeCount = this.circleCount
      }
    },
    mounted () {
      /* eslint-disable */
      let canvas = document.getElementById('myCanvas')
      this.resize()
      this.stage = new createjs.Stage(canvas)
      this.stage.enableDOMEvents(true)
      this.stage.enableMouseOver(10)
      createjs.Touch.enable(this.stage)

      this.initCircles()
      window.addEventListener('resize', this.resize)
    }
  }
</script>
