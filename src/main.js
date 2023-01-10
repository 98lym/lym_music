import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission.js'
import '@/assets/icons'
import svgIcon from "@/assets/icons/index.vue";
import Antd from 'ant-design-vue'
import './index.css'
import 'ant-design-vue/dist/antd.css';
import '@ant-design-vue/pro-layout/dist/style.css'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'
createApp(App).use(store)
    .use(router)
    .use(Antd)
    .use(ProLayout)
    .use(PageContainer)
    .component('svg-icon',svgIcon)
    .mount('#app')
