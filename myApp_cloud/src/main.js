// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'//引入并使用
// import axios from './axios'//引入并使用
// 引入全局样式文件
import './assets/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
// 1完整引入mint-ui组件库中所有组件，先安装 npm install mint-ui -S
import MintUI from 'mint-ui'
// 2单引入mint-ui样式文件
import 'mint-ui/lib/style.css'
// 从vant中引入
//  npm install --save vant
import Vant from 'vant'
import 'vant/lib/index.css';
/* eslint-disable no-new */
// 引入axios 处理ajax请求 npm i axios -save
// import axios from './axios'
//  import common from './common'//引入并使用
//  import {domain} from './url.js'
// 引入百度api
import BaiduMap from 'vue-baidu-map'
// 引入MD5加密模块
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
// axios.defaults.baseM1URL = domain.Base_M1_URL
// 配置服务端基础路径--封装到了axios.js
// axios.defaults.baseURL='http://127.0.0.1:5050/';
// // 配置保存session信息 为true 保存session
// axios.defaults.withCredentials=true;
// axios 注册vue

// 
// router.beforeEach((to, from, next) => {
//     let token = sessionStorage.getItem('token');
//     if (!token && to.path !== 'user/login') {
//       next('user/login');
//     } else {
//       next();
//     }
// })

// 检测滚动返回顶端
router.afterEach((to, from) => {
    window.scrollTo(0,0);
  })
//   路由守卫
router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){
        if(localStorage.getItem('aname')){
             console.log('路由守卫有')
            next()
        }else{
            next({path:'/admin'})
            console.log('路由守卫无，去登录')
        }
    }else{
        next()
    }
})
// 3将mint-ui注册vue实例
Vue.use(MintUI)
// 将vant注册vue实例
Vue.use(Vant)
Vue.use(ElementUI);
// Vue.use(Vuex)
Vue.use(axios)
// Vue.use(common)
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'gHWCpd53ETOocAbpnn3b2ODYTw3SUerD'
  })
Vue.prototype.axios=axios;
// Vue.prototype.common=common;

new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})

