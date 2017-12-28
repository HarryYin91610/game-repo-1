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
        stage: {}
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
      },
      tick (event) {
        /* eslint-disable */
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
