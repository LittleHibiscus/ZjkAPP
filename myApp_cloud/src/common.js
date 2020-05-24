//引入axios
import axios from 'axios'
import {domain} from './url.js'
axios.defaults.baseM1URL = domain.Base_M1_URL
import router from './router/index'
// 设置请求超时
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.interceptors.request.use(config => {
//     config.headers.Authorization = window.sessionStorage.getItem('authorization')
//     return config
// })
// 请求拦截
import store from './store'
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        // console.log("进入请求拦截器...");
    //     if(localStorage.getItem("token")){
    //         config.headers.token=localStorage.getItem("token");
    //         }
    //         if(sessionStorage.getItem("token")){
    //         config.headers.token=sessionStorage.getItem("token");
    //         }
    //     return config;
    // },
    console.log("进入请求拦截器mmmmmmmmmmmmm...");
    // router.beforeEach((to,from,next)=>{
    //     if(to.meta.requireAuth){
    //         if(localStorage.getItem('aname')){
    //              console.log('路由守卫有')
    //             next()
    //         }else{
    //             next({path:'/admin'})
    //             console.log('路由守卫无，去登录')
    //         }
    //     }else{
    //         next()
    //     }
    // })
    if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
      }
   
      return config;
    },
    error => {
        return Promise.error(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    // response => {
    //     // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    //     // 否则的话抛出错误
    //     if (response.status === 200) {
    //         return Promise.resolve(response);
    //     }
        
    //     else {
    //         return Promise.reject(response);
    //     }
    // }
    res=>{
        console.log("触发响应拦截器...")
        if(res.data.status==403){
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          store.commit("setIslogin",false);
          store.commit("setUname","");
        }else if(res.data.code==-1){
        //   store.commit("setIslogin",false);
        //   store.commit("setUname","");
        //   alert(res.data.msg+" 请先登录6666 !");
          localStorage.removeItem('Authorization');
        //   router.push({
        //       name:'Login',
        //       path:'/login'
        //   });
        console.log('去登录')
        }else if(res.data.token){
        //   store.commit("setUname",res.data.uname);
        //   store.commit("setIslogin",true);
        //   remenber???
        //   if(res.remember==="true"){
        //     // sessionStorage.setItem("token",res.data.token);
        //     localStorage.setItem("token",res.data.token);
        //   }else{
        //     sessionStorage.setItem("token",res.data.token);
        //     // localStorage.setItem("token",res.data.token);
        //   }
        }
        return res;
      },
      error=>{
        
      }
)
//对get请求传递过来的参数处理
function paramsToUrl(url, params) {
    if (!params) return url
    for (var key in params) {
        if (params[key] && params[key] != 'undefined') {
            if (url.indexOf('?') != -1) {
                url += '&' + '' + key + '=' + params[key] || '' + ''
            } else {
                url += '?' + '' + key + '=' + params[key] || '' + ''
            }
        }
    }
    return url
}
function requireData(url, params, type, item) {
    if (!url) return false
    switch (item) {
        case 2:
            url = axios.defaults.baseM2URL + url
            break;
        default:
            url = axios.defaults.baseM1URL + url
    }
    if (type === 'get') {
        url = paramsToUrl(url, params)
        return new Promise((resolve, reject) => {
            axios.get(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            axios.post(url, JSON.stringify(params)).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
function reqService(url,params,type){
    return requireData.call(this,url,params,type,1)
}

export default {
    install(Vue,options){
        //Java的请求数据方法
        Vue.prototype.reqM1Service=function(url,params,type){
            return requireData.call(this,url,params,type,1)
        }
        //Php的请求数据方法
        Vue.prototype.reqM2Service = function (url,params,type) {
            return requireData.call(this, url, params, type,2)
        }
    }, reqService

}