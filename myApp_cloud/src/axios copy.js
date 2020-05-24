import axios from "axios";
// qd=s模块 把查询字符串转成字符串
import qs from "qs";
import store from './store'
// axios.defaults.baseURL = 'http://127.0.0.1:5050/';
// axios.defaults.withCredentials=true;
const Axios=axios.create({
  baseURL:"http://127.0.0.1:5050/",
  withCredentials:true//携带cookie
})
// 响应拦截器
Axios.interceptors.request.use(
                config=>{
                console.log("进入请求拦截器...");
                //this.axios.post(
                //"user/signin",
                //   只能接收对象形式的参数
                // “uname=rong&uwpd=123456   ->qs.stringfy({uname:rong},upwd:123456)
                //{uname:dingding , upwd:123456}
                //)
                // 如何使post请求，自动转为字符串
                if(config.method==="post"){
                config.data=qs.stringify(config.data)
                }
                if(localStorage.getItem("token")){
                config.headers.token=localStorage.getItem("token");
                }
                if(sessionStorage.getItem("token")){
                config.headers.token=sessionStorage.getItem("token");
                }
                return config;//请求发出去了，携带token
            },
            error=>{
                console.log("===发送请求拦截器报错===")
                console.log(error);
                console.log("===end===");
                Promise.reject(error);
            }
);
Axios.interceptors.response.use(
  res=>{
    console.log("触发响应拦截器...")
    if(res.data.status==403){
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      store.commit("setIslogin",false);
      store.commit("setUname","");
    }else if(res.data.code==-1){
      store.commit("setIslogin",false);
      store.commit("setUname","");
      //alert(res.data.msg+" 请先登录 !");
    }else if(res.data.token){
      store.commit("setUname",res.data.uname);
      store.commit("setIslogin",true);
    //   remenber???
      if(res.remember==="true"){
        sessionStorage.setItem("token",res.data.token);
        // localStorage.setItem("token",res.data.token);
      }else{
        // sessionStorage.setItem("token",res.data.token);
        localStorage.setItem("token",res.data.token);
      }
    }
    return res;
  },
  error=>{
    
  }
)
export default {
  install: function(Vue, Option){
    Vue.prototype.axios=Axios;
  }
}