import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: () => import('@/views/Welcome') },
      { path: '/users', component: () => import('@/views/Users') },
      { path: '/roles', component: () => import('@/views/Roles') },
      { path: '/rights', component: () => import('@/views/Rights') },
      { path: '/goods', component: () => import('@/views/Goods') },
      { path: '/add', component: () => import('@/views/Goods/components/add.vue') },
      { path: '/params', component: () => import('@/views/Params') },
      { path: '/categories', component: () => import('@/views/Categories') },
      { path: '/orders', component: () => import('@/views/Orders') },
      { path: '/reports', component: () => import('@/views/Reports') }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})
// 路由前置守卫
router.beforeEach((to, from, next) => {
  // ...
  // 如果有token
  if (store.state.token) {
    // 如果有token  判断是否在登录页
    if (to.path === '/login') {
      // 如果在登录页就跳转到主页
      next('/')
    } else {
      // 不在登录页就直接放行
      next()
    }
  } else {
    // 没有token
    // 没有token执行下面判断
    if (whiteList.indexOf(to.path) > -1) {
      // 判断白名单是否存在要去的路由地址 有就直接放行  没有就强制跳转到登录页
      next()
    } else {
      next('/login')
    }
  }
})
export default router
