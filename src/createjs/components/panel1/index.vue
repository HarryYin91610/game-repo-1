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
        fpsLabel: {},
        radius: 20,
        colors: ['#828b20', '#b0ac31', '#cbc53d', '#fad779', '#f9e4ad', '#faf2db', '#563512', '#222222']
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
        for (let i = 0; i < 500; i++) {
          let shape = new createjs.Shape()
          shape.graphics.beginFill(this.colors[Math.floor(Math.random() * this.colors.length)]).drawCircle(0, 0, this.radius)

          //修改图形坐标
          shape.x = Math.floor(Math.random() * this.cwidth)
          shape.y = Math.floor(Math.random() * this.cheight)
          shape.velX = Math.random() * 10 - 5
          shape.velY = Math.random() * 10 - 5
          shape.alpha = Math.random() * 1

          //尝试注释掉如下cache代码，比较一下FPS值的区别和动画性能区别
          shape.cache(-this.radius, -this.radius, this.radius * 2, this.radius * 2)

          this.stage.addChild(shape)
        }
        //添加一个FPS，比较一下性能区别
        this.fpsLabel = new createjs.Text("-- fps", "normal 24px Arial", "#000000")
        this.fpsLabel.x = 10
        this.fpsLabel.y = 20
        this.stage.addChild(this.fpsLabel)

        createjs.Ticker.addEventListener("tick", this.tick)
      },
      tick (event) {
        /* eslint-disable */
        let w = this.cwidth + this.radius * 2
        let h = this.cheight + this.radius * 2
        let l = this.stage.getNumChildren() - 1

        for (let i = 0; i < l; i++) {
          let shape = this.stage.getChildAt(i)
          shape.x = (shape.x + this.radius + shape.velX + this.cwidth) % this.cwidth - this.radius
          shape.y = (shape.y + this.radius + shape.velY + this.cheight) % this.cheight - this.radius
        }

        let ftext = createjs.Ticker.getMeasuredFPS()
        this.fpsLabel.text = Math.round(ftext) + " fps"
        this.stage.update(event)
      }
    },
    mounted () {
      /* eslint-disable */
      let canvas = document.getElementById('myCanvas')
      this.resize()
      this.stage = new createjs.Stage(canvas)
      this.initCircles()
      window.addEventListener('resize', this.resize)
    }
  }
</script>
