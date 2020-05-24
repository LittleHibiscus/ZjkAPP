import Vue from 'vue'
import Vuex from 'vuex'
// import axios from './axios'
import axios from 'axios'
import common from './common'//引入并使

// 模块化，单例模式，内存里只有一个，在首次引用时创建谁用这个模块都是公共的，自由市场
Vue.use(Vuex)
Vue.use(common)

export default new Vuex.Store({
  state: {
    //   存放变量
    uname:localStorage.getItem('uname')||'',//用户名
    uid:localStorage.getItem('uid')||'',//用户id
    uavator:localStorage.getItem('uavator')||'',//用户头像
    aname:localStorage.getItem('aname')||'',//管理员用户名
    // 存放用户对象
    // userInfo:[{uid:'',uname:'',upwd:''}],
    //    islogin:false,
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    // 购物车数量,不对
    // cartcount:4,
  },
  //读取状态
  getters:{
      uname:(status)=>status.uname,
      uid:(status)=>status.uid
    // cid:(state)=>{
    //   return state.cid;
    // }
    // uname:(state)=>{
    //     // return state.uname
    //     var uid=state.userInfo.uid;
    //     var uname=state.userInfo.uname
    //     return {uid,uname}
    // }
  },
  setters:{
      
  },
  //修改状态值，修改state中的变量,不能传异步请求
  mutations: {
    //   函数，参数state,通过stata操作state中的变量，带参数uname
    setUname(state,uname){
        // 将传进来的uanme放在stata中的uanme
         state.uname=uname;
         localStorage.setItem('uname',uname)
    },
    setUid(state,uid){
      state.uid=uid
      localStorage.setItem('uid',uid)
    },
    setAvator(state,uavator){
       state.uavator=uavator
       localStorage.setItem('uavator',uavator)
    },
    setIslogin(state,islogin){
      state.islogin=islogin;
    },
     // 修改token，并将token存入localStorage
     changeLogin (state, user) {
        state.Authorization = user.Authorization;
        localStorage.setItem('Authorization', user.Authorization);
      },
    //   管理员姓名
      setAname(state,aname){
          state.aname=aname
          localStorage.setItem('aname',aname)

      },
      setCartCount(state,cartcount){
         state.cartcount=cartcount;
         localStorage.setItem('cartcount',cartcount)
      },
    
  },
//专门负责发送异步ajax请求，从服务器端获取数据
  actions: {
    // context代表整个vuex对象，用context操作mutations中的变量
    // action只能接受一个参数，user对象的形式
    // login(context,params){
    //     let url = "user/login";
    //     // let params = {
    //     //   uname: this.uname,
    //     //   upwd: this.upwd,
    //     // };  
    //     // // ->调用Java接口的请求服务
    //    common.reqService(url,params).then(
    //       res => {
    //         console.log(res);
    //         // console.log(params);
    //         // this.isLogin=true;
    //         console.log('vuex登录了6666aaaaaaa',params,res.uid,res.uname)
    //         context.commit('setUname',params.uname,res.uid)
    //       }
    //     );
       
    // },
    // 注销
    logout(context,params){
        // this.setUname('null')
        // localStorage.removeItem('token')
        // localStorage.removeItem('uname')
        // sessionStorage.removeItem('token')
        // sessionStorage.removeItem('uname')
        // sessionStorage.removeItem('token')
        localStorage.clear();
        context.commit('setUname','')
        context.commit('setUid','')
        context.commit('setAvator','')
         console.log('注销吧',)  
     },
    //  注销管理员
    logoutAdmin(context,params){
        // this.setUname('null')
        // localStorage.removeItem('token')
        // localStorage.removeItem('uname')
        // sessionStorage.removeItem('token')
        // sessionStorage.removeItem('uname')
        // sessionStorage.removeItem('token')
        // localStorage.clear();
        context.commit('setAname','')
         console.log('管理员销吧',)  
     },
  }
})
