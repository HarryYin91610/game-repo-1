<template lang="jade">
  div.app-wrapper
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
        imgRes: [
          {
            name: 'spritesheet_grant.png',
            el: {}
          },
          {
            name: 'sky.png',
            el: {}
          },
          {
            name: 'ground.png',
            el: {}
          },
          {
            name: 'hill1.png',
            el: {}
          },
          {
            name: 'hill2.png',
            el: {}
          }
        ],
        sky: {},
        ground: {},
        grant: {}
      }
    },
    methods: {
      // 窗口尺寸改变处理
      resize () {
        let canvas = document.getElementById('myCanvas')
        this.cwidth = window.innerWidth
        this.cheight = 400
        canvas.width = this.cwidth
        canvas.height = 400
      },
      // 帧动画
      loadRes () {
        // 资源数据
        let count = 0
        for (let imgItem of this.imgRes) {
          imgItem.el = new Image()
          imgItem.el.src = require('./assets/' + imgItem.name)
          imgItem.el.onload = () => {
            count++
            if (count === this.imgRes.length) {
              this.handleComplete()
            }
          }
        }
      },
      handleComplete () {
        /* eslint-disable */
        this.sky = new createjs.Shape()
        this.sky.graphics.beginBitmapFill(this.imgRes[1].el, 'repeat-x').drawRect(0, 0, this.cwidth, this.cheight)
        //By default swapping between Stage for StageGL will not allow for vector drawing operation such as BitmapFill, useless you cache your shape.
        this.sky.cache(0, 0, this.cwidth, this.cheight)

        let gImg = this.imgRes[2].el
        this.ground = new createjs.Shape()
        this.ground.graphics.beginBitmapFill(gImg).drawRect(0, 0, this.cwidth + gImg.width, gImg.height)
        this.ground.tileW = gImg.width
        this.ground.y = this.cheight - gImg.height
        //By default swapping between Stage for StageGL will not allow for vector drawing operation such as BitmapFill, useless you cache your shape.
        this.ground.cache(0, 0, this.cwidth + gImg.width, gImg.height)

        let spriteSheet = new createjs.SpriteSheet({
          framerate: 30,
          images: [this.imgRes[0].el],
          frames: {width: 165, height: 292, count: 64, regX: 82, regY: 0},
          // define two animations, run (loops, 1.5x speed) and jump (returns to run):
          animations: {
            run: [0, 25, 'run', 1.5],
            jump: [26, 63, 'run']
          }
        })
        this.grant = new createjs.Sprite(spriteSheet, 'run')
        this.grant.y = 35

        this.stage.addChild(this.sky, this.ground, this.grant)
        this.stage.addEventListener("stagemousedown", this.handleJumpStart)

        createjs.Ticker.timingMode = createjs.Ticker.RAF
		    createjs.Ticker.addEventListener("tick", this.tick)
      },
      tick (event) {
        let deltaS = event.delta / 1000
        let position = this.grant.x + 150 * deltaS

        let grantW = this.grant.getBounds().width * this.grant.scaleX
        this.grant.x = (position >= this.cwidth + grantW) ? -grantW : position

        this.ground.x = (this.ground.x - deltaS * 150) % this.ground.tileW

        this.stage.update(event)
      },
      handleJumpStart () {
        this.grant.gotoAndPlay("jump")
      }
    },
    mounted () {
      /* eslint-disable */
      let canvas = document.getElementById('myCanvas')
      this.resize()
      this.stage = new createjs.Stage(canvas)
      this.loadRes()
      window.addEventListener('resize', this.resize)
    }
  }
</script>
