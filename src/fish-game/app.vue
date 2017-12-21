<template lang="jade">
  div#app-wrapper
    canvas#canvas1(width="800", height="600") 您的浏览器不支持Canvas，请更换浏览器后再试。
    canvas#canvas2(width="800", height="600") 您的浏览器不支持Canvas，请更换浏览器后再试。
</template>

<style lang="stylus" scoped>
  #app-wrapper
    position: relative
    width: 800px
    height: 600px
    margin: 0 auto
    #canvas1, #canvas2
      position: absolute
      top: 0
      left: 0
    #canvas1
      z-index: 1
    #canvas2
      z-index: 0
</style>

<script>
import Utils from './lib/utils.js'
import Ane from './lib/ane.js'
import Fruit from './lib/fruit.js'
import Mom from './lib/mom.js'
import Baby from './lib/baby.js'
import Collision from './lib/collision.js'
import Data from './lib/data.js'
import Wave from './lib/wave.js'
import Halo from './lib/halo.js'
import Dust from './lib/dust.js'

export default {
  name: 'app',
  data () {
    return {
      cwidth: 0,
      cheight: 0,
      context1: {}, // fishes, dust, UI circle
      context2: {}, // background, ane, fruits
      mouse: {
        x: 0,
        y: 0
      },
      bgPic: {},
      ane: {},
      fruit: {},
      fruitPic: [],
      fruitPicLoaded: 0,
      achievement: {},
      wave: {},
      halo: {},
      // 漂浮物
      dust: {},
      dustPic: [],
      // 鱼妈妈相关
      mom: {},
      mtailTimer: 0,
      meye: [],
      meyeTimer: 0,
      meyeInterval: 1000,
      mbodyO: [],
      mbodyB: [],
      // 鱼宝宝相关
      baby: {},
      btailTimer: 0,
      beye: [],
      beyeTimer: 0,
      beyeInterval: 1000,
      bbody: [],
      bbodyTimer: 0,
      // 公用鱼尾图片
      tail: []
    }
  },
  methods: {
    // 入口函数
    game () {
      this.init()
      window.requestAnimeFrame(this.gameLoop)
    },
    // 初始化数据
    init () {
      let canvas1 = document.getElementById('canvas1')
      let canvas2 = document.getElementById('canvas2')
      this.cwidth = canvas1.width
      this.cheight = canvas1.height
      this.context1 = canvas1.getContext('2d')
      this.context2 = canvas2.getContext('2d')
      // 初始化成就
      this.achievement = new Data()
      // 初始化波纹
      this.wave = new Wave()
      // 初始化光圈
      this.halo = new Halo()
      // 初始漂浮物
      this.dust = new Dust(this.cwidth, this.cheight)
      // 绘制背景
      this.bgPic = new Image()
      this.bgPic.src = require('./assets/background.jpg')
      this.bgPic.onload = this.drawBackground
      // 绘制海葵
      this.ane = new Ane()
      this.ane.init(this.cheight)
      // 绘制果实
      this.fruitPic[0] = new Image()
      this.fruitPic[0].src = require('./assets/fruit.png')
      this.fruitPic[1] = new Image()
      this.fruitPic[1].src = require('./assets/blue.png')
      this.fruit = new Fruit()
      for (let i = 0; i < this.fruitPic.length; i++) {
        this.fruitPic[i].onload = () => {
          this.fruitPicLoaded++
        }
      }
      // 加载鱼尾图片
      for (let i = 0; i < 8; i++) {
        this.tail[i] = new Image()
        this.tail[i].src = require('./assets/bigTail' + i + '.png')
      }
      // 加载小鱼眼睛图片
      for (let i = 0; i < 2; i++) {
        this.beye[i] = new Image()
        this.beye[i].src = require('./assets/babyEye' + i + '.png')
      }
      // 加载大鱼眼睛图片
      for (let i = 0; i < 2; i++) {
        this.meye[i] = new Image()
        this.meye[i].src = require('./assets/bigEye' + i + '.png')
      }
      // 加载大鱼橘黄色身体图片
      for (let i = 0; i < 8; i++) {
        this.mbodyO[i] = new Image()
        this.mbodyO[i].src = require('./assets/bigSwim' + i + '.png')
      }
      // 加载大鱼蓝色身体图片
      for (let i = 0; i < 8; i++) {
        this.mbodyB[i] = new Image()
        this.mbodyB[i].src = require('./assets/bigSwimBlue' + i + '.png')
      }
      // 加载小鱼身体图片
      for (let i = 0; i < 20; i++) {
        this.bbody[i] = new Image()
        this.bbody[i].src = require('./assets/babyFade' + i + '.png')
      }
      // 加载漂浮物图片
      for (let i = 0; i < 7; i++) {
        this.dustPic[i] = new Image()
        this.dustPic[i].src = require('./assets/dust' + i + '.png')
      }
      // 鱼妈妈
      this.mom = new Mom(this.cwidth, this.cheight)
      // 鱼宝宝
      this.baby = new Baby(this.cwidth, this.cheight)
    },
    // 循环动画帧渲染
    gameLoop (timestamp) {
      let mtailProgress = timestamp - this.mtailTimer
      let meyeProgress = timestamp - this.meyeTimer
      let btailProgress = timestamp - this.btailTimer
      let beyeProgress = timestamp - this.beyeTimer
      let bbodyProgress = timestamp - this.bbodyTimer
      this.context1.clearRect(0, 0, this.cwidth, this.cheight)
      this.context2.clearRect(0, 0, this.cwidth, this.cheight)
      // 绘制背景
      this.drawBackground()
      // 绘制海葵
      this.ane.draw(this.context2, this.cheight)
      // 绘制漂浮物
      this.dust.draw(this.context1, this.dustPic)
      // 绘制果实
      if (Fruit.ready === true) {
        this.fruit.monitor(Ane, this.cheight)
        this.fruit.draw(this.context2, Ane)
      }
      // 绘制鱼妈妈
      // 计算趋向坐标
      let position = {}
      position.x = Utils.lerpDistance(this.mouse.x, this.mom.x, 0.99)
      position.y = Utils.lerpDistance(this.mouse.y, this.mom.y, 0.99)
      // 计算趋向角度
      let deltaX = this.mouse.x - this.mom.x
      let deltaY = this.mouse.y - this.mom.y
      let alpha = Math.atan2(deltaY, deltaX) + Math.PI // 0 ~ 2PI
      this.mom.angle = Utils.lerpAngle(alpha, this.mom.angle, 0.9)
      this.mom.update(position)
      this.mom.draw(this.context1)
      // 尾巴动画
      if (mtailProgress > 60) {
        this.mom.mcurTail = (this.mom.mcurTail + 1) % 8
        this.mom.tail = this.tail[this.mom.mcurTail]
        this.mtailTimer = timestamp
      }
      // 眨眼动画
      if (meyeProgress > this.meyeInterval) {
        this.mom.mcurEye = (this.mom.mcurEye + 1) % 2
        this.mom.eye = this.meye[this.mom.mcurEye]
        if (this.mom.mcurEye === 0) {
          this.meyeInterval = Math.random() * 1500 + 2000
        } else {
          this.meyeInterval = 200
        }
        this.meyeTimer = timestamp
      }
      // 身体颜色升级判断
      if (this.achievement.double === 1) {
        // blue
        this.mom.body = this.mbodyB[this.mom.mcurBody]
      } else {
        // orange
        this.mom.body = this.mbodyO[this.mom.mcurBody]
      }
      // 绘制鱼宝宝
      // 计算趋向坐标
      let position2 = {}
      position2.x = Utils.lerpDistance(this.mom.x, this.baby.x, 0.99)
      position2.y = Utils.lerpDistance(this.mom.y, this.baby.y, 0.99)
      // 计算趋向角度
      let deltaX2 = this.mom.x - this.baby.x
      let deltaY2 = this.mom.y - this.baby.y
      let alpha2 = Math.atan2(deltaY2, deltaX2) + Math.PI // 0 ~ 2PI
      this.baby.angle = Utils.lerpAngle(alpha2, this.baby.angle, 0.9)
      this.baby.update(position2)
      this.baby.draw(this.context1)
      // 尾巴动画
      if (btailProgress > 100) {
        this.baby.bcurTail = (this.baby.bcurTail + 1) % 8
        this.baby.tail = this.tail[this.baby.bcurTail]
        this.btailTimer = timestamp
      }
      // 眨眼动画
      if (beyeProgress > this.beyeInterval) {
        this.baby.bcurEye = (this.baby.bcurEye + 1) % 2
        this.baby.eye = this.beye[this.baby.bcurEye]
        if (this.baby.bcurEye === 0) {
          this.beyeInterval = Math.random() * 1500 + 2000
        } else {
          this.beyeInterval = 200
        }
        this.beyeTimer = timestamp
      }
      // 身体褪色动画
      if (bbodyProgress > 1000) {
        this.baby.bcurBody = this.baby.bcurBody + 1
        if (this.baby.bcurBody > 19) {
          this.baby.bcurBody = 19
          // game over
          this.achievement.end = true
          document.getElementById('canvas1').removeEventListener('mousemove', this.onMouseMove)
        }
        this.baby.body = this.bbody[this.baby.bcurBody]
        this.bbodyTimer = timestamp
      }
      if (this.achievement.end === false) {
        // 判断是否喂到小鱼
        Collision.feedBaby(this.mom, this.baby, this.achievement, this.halo)
        // 判断果实是否被吃
        Collision.isCollide(Fruit, this.mom, this.achievement, this.wave)
        this.wave.draw(this.context1)
        this.halo.draw(this.context1)
      }
      // 显示成就
      this.achievement.draw(this.context1, this.cwidth, this.cheight)
      window.requestAnimeFrame(this.gameLoop)
    },
    // 绘制背景
    drawBackground () {
      this.context2.save()
      this.context2.drawImage(this.bgPic, 0, 0, this.cwidth, this.cheight)
      this.context2.restore()
    },
    // 鼠标移动处理函数
    onMouseMove (event) {
      if (event.pageX || event.pageY) {
        this.mouse.x = event.pageX
        this.mouse.y = event.pageY
      } else {
        this.mouse.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
        this.mouse.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop
      }
      // 将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
      this.mouse.x -= document.getElementById('app-wrapper').offsetLeft
      this.mouse.y -= document.getElementById('app-wrapper').offsetTop
    }
  },
  created () {
    // 设置动画方法
    Utils.animation()
  },
  mounted () {
    document.getElementById('canvas1').addEventListener('mousemove', this.onMouseMove, false)
    document.body.onload = this.game()
  },
  watch: {
    fruitPicLoaded () {
      if (this.fruitPicLoaded === this.fruitPic.length) {
        this.fruit.init(this.fruitPic, Ane, this.cheight)
      }
    }
  }
}
</script>
