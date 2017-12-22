<template lang="jade">
  div.app-wrapper
    canvas(id="myCanvas", width="320", height="200")
      | 非常抱歉，您的浏览器不支持Canvas，请更换浏览器后再尝试。
</template>

<style lang="stylus" scoped>
</style>

<script>
  export default {
    data () {
      return {
        stage: {},
        circle: {}
      }
    },
    methods: {
      // 生成圆形
      getCircle () {
        /* eslint-disable */
        let circle = new createjs.Shape()
        circle.graphics.setStrokeStyle(2).beginStroke('rgba(0, 0, 0, 0.5)').beginFill('orange').drawCircle(55, 100, 50)
        this.stage.addChild(circle)
        this.stage.update()
      },
      // 生成矩形
      getRect () {
        let rect = new createjs.Shape()
        rect.graphics.setStrokeStyle(2).beginStroke('rgba(0, 0, 0, 0.5)').beginFill("orange").drawRect(10, 10, 100, 100)
        rect.x = 120
        rect.y = 40
        //将生成图形添加到stage中，并且调用update方法更新
        this.stage.addChild(rect)
        this.stage.update()
      },
      // 生成多角形
      getPolystar () {
        //生成多角形: 五角星
        let polystar = new createjs.Shape()
        polystar.graphics.setStrokeStyle(2).beginStroke("orange").drawPolyStar(100, 100, 50, 5, 0.4, -90)
        this.stage.addChild(polystar)
        this.stage.update()
      },
      handleTick () {
        this.circle.x += 10
        if (this.circle.x > this.stage.canvas.width) {
          this.circle.x = 0
        }
        this.stage.update()
      }
    },
    mounted () {
      /* eslint-disable */
      let canvas = document.getElementById('myCanvas')
      this.stage = new createjs.Stage(canvas)
      // this.getCircle()
      // this.getRect()
      this.getPolystar()
      // this.stage.update()
      // createjs.Ticker.addEventListener("tick", this.handleTick)
    }
  }
</script>
