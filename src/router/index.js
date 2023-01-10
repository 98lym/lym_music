import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login'
import NotFount from '@/views/404'
const routes = [
  {
    path: '/',
    redirect: '/login',
    children: [
      {
        path: 'login',
        component: Login,
      }
    ]
    // hidden: true
  },
  {
    path: '/home',
    name:'Home',
    component: () => import('@/components/NavBar'),
    children: [
      {
        path:'/home',
        name:'Home',
        component:()=> import('@/views/Home'),
        meta:{
          keepAlive: true //设置页面是否需要使用缓存
        }
      },
      {
        path:'/my',
        name:'My',
        component:()=> import('@/views/My'),
        meta:{
          keepAlive: true //设置页面是否需要使用缓存
        }
      },
      {
        path:'/SongList',
        name:'SongList',
        component:()=> import('@/views/SongList'),
        meta:{
          keepAlive: false //设置页面是否需要使用缓存
        }
      }
    ]
    // hidden: true
  },        
  {
    path: '/*',
    component: NotFount
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
