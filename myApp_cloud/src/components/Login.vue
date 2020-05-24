<template>
    <div class="login-box  clearfix">
            <mt-header title="登录/注册">
  <router-link to="/" slot="left">
    <mt-button icon="back" @click="back">返回</mt-button>
  </router-link>
  <mt-button icon="more" slot="right"></mt-button>
</mt-header>
      <div class="login-reg">
      <mt-navbar v-model="selected">
          <mt-tab-item id="tab-login">登录</mt-tab-item>
          <mt-tab-item id="tab-register">注册</mt-tab-item>
     </mt-navbar>
<!-- tab-container -->
        <mt-tab-container v-model="selected">
          <!-- 登录 -->
          <mt-tab-container-item id="tab-login">
            <div class="log-reg">
                <input type="text" placeholder="清输入用户名"  v-model='uname'>
              <div> <input type="password" placeholder="清输入密码"  v-model='upwd'></div>
              <!-- <input type='radio' v-model="remember">记住密码 -->
              <mt-button size="large" @click="alogin" :isLogin='false'>登录</mt-button>
              <!-- <mt-button size="large" @click="logout" >注销</mt-button> -->
            </div>
            <div class="otherlogin clearfix">
              <h1>--------------其他登录方式----------</h1>
            <div>
            <button><img src="@../../../static/images/weixin.png" alt=""></button>
            </div>
            </div>
          </mt-tab-container-item>
          <!-- 注册 -->
          <mt-tab-container-item id="tab-register">
              <div class="log-reg">
                <input type="text" placeholder="清输入用户名" v-model="uname">
              <div> <input type="password" placeholder="清输入密码" v-model="upwd"></div>
              <mt-button size="large" @click="register">注册</mt-button>
            </div>
          </mt-tab-container-item>

        </mt-tab-container>
      </div>
 


    </div>
    
</template>
<script>
import {mapActions,mapMutations} from 'vuex'
import register from './Register.vue'
export default {
    data(){
        return{
            selected:'tab-login',
            // 登录的用户名密码
            uid:'',
            uname:'',
            upwd:'',
            // 注册的用户名密码
            // uname2:'',
            // upwd2:'',
            // isLogin:false
            remember:false
           
                  }
    },
     methods: {
    ...mapActions([
        // 去vuex中取出名为login的函数放到此处，三个点，...打散数组
        "login"//,register
    ]),
    ...mapMutations(['setUname','changeLogin','setUid']),
    // 返回
    back(){
        this.$router.go(-1)
    },
     alogin(){
         let _this=this;
         var url='user/login';
            let params = {
           uname: this.uname,
           upwd: this.upwd,
         }; 
         this.reqM1Service(url,params).then(
         res => {
             if(res.code==200){
                console.log('登录res.data',res.data);
                console.log('token对象解析--uid,uname',res.decoded[0].uid,res.decoded[0].uname)
                //  保存在localStorage中的uid,uname
                _this.uid=res.decoded[0].uid;
                _this.uname=res.decoded[0].uname
                //  设置存储
                _this.setUid( _this.uid||'')
                _this.setUname( _this.uname||'')
                console.log('登录了',params);
                _this.userToken = 'Bearer ' + res.token;
                // 将用户token保存到vuex中
                // _this.changeLogin({ Authorization: _this.userToken });
                //   登录成功返回到首页
                  _this.$router.push('/');
                this.$toast({
                        message: '登录成功！',
                    });
             }else{
               this.$toast({
                  message: '用户名或密码错误！',
               })
             }
   
     }
    );
     },
    //   mylogin(){
    //     this.login({//给参数user
    //         uid:'',
    //         uname:this.uname,
    //         upwd:this.upwd
    //     }).then(()=>{
    //         if(this.remember){
    //              localStorage.setItem('uname',this.uname)
    //         }else{
    //             sessionStorage.setItem('uname',this.uname)
    //         }
           
    //     }) 
    //     this.$store.commit('setUname',)
    //   },
    // login(){
    //     // var url='user/login';
    //     // var obj={uname:this.uname,upwd:this.upwd}
    //     // this.axios(
    //     //     {
    //     //        method:"post",
    //     //     url,
    //     //  data:{
    //     //      uname:this.uname,upwd:this.upwd
    //     //  },
    //     //     })
    //     // .then(res=>{
    //     //     console.log('login111',res)
    //     //     console.log(obj) 
    //     // })
    //     // .catch(err=>{
    //     //     console.log(err)
    //     // })
      
    // let url = "user/login";
    // let params = {
    //   uname: this.uname,
    //   upwd: this.upwd,
    // };  
    // // // ->调用Java接口的请求服务
    // this.reqM1Service(url,params).then(
    //   res => {
    //     console.log(res,res.data);
    //     console.log(params);
    //     this.isLogin=true;
    //     console.log('登录了',params)

    //   }
    // );
     
    // },
  //    注册
    register(){
         let url='user/reg'; let params={uname:this.uname,upwd:this.upwd }
         this.reqM1Service(url,params).then(
         res => {
           if(res.code==-2){
              this.$messagebox(params.uname+'已经存在')
            //   清空已经输入的
              this.uname=''
              this.upwd=''
           }else if(res.code==200){
                 this.$toast('注册成功!转到登录');
                 this.selected='tab-login'
           }
           else{
               console.log('注册',res)
           }
      });
    }
   },
created(){
},
       mounted(){
    // 尝试从浏览器的localStorage和sessionStorage中获得uname,
    // 因为因为localStorage和sessionStorage不受网页刷新的影响，他们属于浏览器的存储机制
    // var uname=localStorage.getItem('uname')||
    // sessionStorage.getItem('uname');
    // var uname=this.uname
    // this.setUname(uname||'')
    // this.setUid(this.uid||'')
},
components:{
    
}
}
</script>
<style scoped>
.clearfix{
  clear: both;
}
.login-box{
   width: 100%;
    height: 700px;
    background: url(@/../../../static/images/login.jpeg) center no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    position: relative;
    
}
.clearfix::after{
 content: '';
 display: block;
 clear: both;
 }
.login-reg{
    width: 100%;
    height: 500px;
    position: fixed;
    top: 20%;
    left: 0%;
}
/* 外边距合并 */
.login-reg::before{
    display: table;
    content: '';
}
/* navbar */
.mint-navbar {
    margin-top: 120px

}
.mint-tab-item-label {
    color: #fff;
    font-size: 20px;
}
.log-reg{
    background: rgba(0,0,0, 0.3);
}
.log-reg input{
    border: none;
    border-radius: 20px;
    margin: 10px auto;
    width: 80%;
    height: 30px;
    background: rgba(256,256,256, .9);
   text-indent: 35px;
}
.log-reg input:first-child{
    background:   rgba(256,256,256, .9) url(@/../../../static/images/username.png) left center no-repeat;
 
}
.log-reg input:last-child{
     background:   rgba(256,256,256, .9) url(@/../../../static/images/password.png) left center no-repeat;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}  
h1{
    font-size: 18px;
    color: #fff;
}
</style>


