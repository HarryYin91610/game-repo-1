<template lang="jade">
  div.app-wrapper
    div.nav-bar
      div.user-item
      div.menu-item
        ul.menu-list
          li.menu-item
            | cache canvas性能优化
          li.menu-item
            | Tweenjs
          li.menu-item
            | 序列帧动画
    router-view
</template>

<style lang="stylus" scoped>
</style>

<script>
  export default {
    methods: {
      handleNav (dest) {
        switch (dest) {
          case 'panel1':
          case 'panel2':
          case 'panel3':
            this.$router.push('/' + dest)
            break
          default:
            this.$router.push('/')
        }
        window.scrollTo(0, 0)
      }
    },
    mounted () {
      // 首次加载后根据link调整nav和router
      this.handleNav(this.$route.path.substr(1))
    },
    watch: {
      '$route.path': function (newVal) {
        this.handleNav(newVal.substr(1))
      }
    }
  }
</script>
