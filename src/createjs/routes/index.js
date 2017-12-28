import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPanel from '../components/main/index.vue'
import Panel1 from '../components/panel1/index.vue'
import Panel2 from '../components/panel2/index.vue'
import Panel3 from '../components/panel3/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainPanel
  },
  {
    path: '/panel1',
    component: Panel1
  },
  {
    path: '/panel2',
    component: Panel2
  },
  {
    path: '/panel3',
    component: Panel3
  }
]

export default new VueRouter({
  routes
})
