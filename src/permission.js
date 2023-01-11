import store from '@/store'
import router from './router'
// import { useRouter } from 'vue-router'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
const whiteList = ['/login', '/NotFount'] // 定义白名单  所有不受权限控制的页面
// 路由的前置守卫
router.beforeEach(function (to, from, next) {
    NProgress.start() // 开启进度条
    //  首先判断有无token
    if (store.getters.token&& store.getters.token!==undefined) {
        //   如果有token 继续判断是不是去登录页
        if (to.path === '/login') {
            //  表示去的是登录页
            next('/home') // 跳到主页
        } else {
            next() // 直接放行
        }
    } else {
        // 如果没有token
        if (whiteList.indexOf(to.path) > -1) {
            // 如果找到了 表示在在名单里面
            next()
        } else {
            next('/login') // 跳到登录页
        }
    }
    NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(function () {
    NProgress.done() // 关闭进度条
})