<template>
        <div class="bg" >
          <transition name="bounce"  appear :duration="5000">
                <div class="login">        
                    <div class="login-content">
                          <h1>管理员登录</h1>
                    <div class="uname">
                        <span>用户名</span> <el-input ref="mark" prefix-icon='el-icon-user-solid' placeholder="请输入管理员用户名"  class="el-input" v-model="uname" ></el-input>
                    </div>
                    <div class="uname">
                       <span>密码</span> <el-input   prefix-icon='el-icon-s-goods' placeholder="请输入密码"  class="el-input" v-model="upwd" show-password></el-input>
                       <!-- 密码<input type="text" v-model=''> -->
                    </div>
                     <div class="remember">
                   <input id='remember' type="checkbox" style="color:#fff" v-model='rem' @change="savePwd" >
                           <label  for='remember' style="color:#fff">记住密码</label>
                     </div>
                      <el-button type="primary" plain @click="alogin" size='medium' style="
                      width:30%">登录</el-button>
                    </div>
                    
                </div>
           </transition>
         <!-- <div class="login1">        
              <h1>管理员注册</h1>
            <div class="uname">
                 用户名<input type="text" v-model='uname1'>
            </div>
            <div class="upwd">
                密码<input type="text" v-model='upwd1'>
            </div>
             <button @click="reg">注册</button>
         </div> -->
       
    </div>
</template>
<script>
import {mapActions,mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{
            uname:sessionStorage.getItem('uname')||'',
            upwd:sessionStorage.getItem('upwd')||'',
            list:[],
            text:'',
            rem:false
        }
    },
    computed:{
        ...mapState(['aname'])
    },
    mounted(){
        this.$refs.mark.$el.querySelector('input').focus();
    },


    
    methods:{
     ...mapMutations(['setAname']),
    //  记住密码
    savePwd(){
        var checkStatus=this.rem
        var uname=this.uname;
        var upwd=this.upwd;
        if(checkStatus){
            sessionStorage.setItem('uname',uname)
            sessionStorage.setItem('upwd',upwd)
        }else{
            sessionStorage.clear()
        }
    },
    // 管理员注册
     reg(){
        var reg=/^(admin)/
        var a=this.uname1
        var str=reg.test(a)
          console.log('正则',reg.test(a))
        if(reg.test(a)){
           let url='user/adminReg'; let params={aname:this.uname1,apwd:this.upwd1 }
           this.reqM1Service(url,params).then(
          res => {
          if(res.code==-2){
               this.$confirm(params.aname+'已经存在')
          }
        console.log(res);
  
        console.log(params)
      });
        }else{
            this.$confirm('管理员注册必须以admin开头')
        }
  
    },
          // 管理员登录
           alogin(){
                let _this=this; var url='user/adminLogin';
                let params = {aname: this.uname,apwd: this.upwd}; 
                this.reqM1Service(url,params)
                .then( res => {
                    console.log('res',res);
                    if(res.code==-3){
                        this.$confirm('用户名或密码错误')
                            this.$refs.mark.$el.querySelector('input').focus();
                    }
                    else{
                            this.$router.push('/adminIndex');
                            var c=res.data[0].aname
                            var b=this.setAname(c||'')
                        //    this.$confirm( '登录成功！');
                   }
                 })
          },
    }
}
</script>
<style scoped>
.bg{
    width: 100%;
    height: 700px;
    background: url(../../../static/images/adminbg.jpg) top center no-repeat;
    background-size: 100%;
}
.login{ 
    width: 500px;
    /* border: 1px solid #f00; */
    height: 400px;
    position:absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -200px; 
 }
 .login-content{
     width: 100%; 
     height: 100%; 
      display: flex; 
     flex-direction: column; 
      justify-content: center; 
      align-items: center;
    align-content: space-between;
    background: rgba(100, 100, 100, .5);
    border-radius: 10%;
    z-index: -1;
 }
 .login-content h1{
     font-size: 20px;
     margin-bottom: 20px;

 }

.uname{
    width: 100%;
    display: inline-block;
    text-align: center;
    margin-bottom: 50px;
}
.uname .el-input{
   width: 70%;
   opacity:7
}
.uname span{
     width: 15%;
     display: inline-block;
    color: #000;
    font-size: 18px;
}
.bounce-enter-active {
  animation: bounce-in 1.5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
     transform: scale(.1);
  }
  50% {
    transform: scale(1.5);

  }
  100% {
    transform: scale(1);

  }
}.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
.remember{
    width: 80%;
    display: flex;
    align-items: center;
    text-align: right;
    /* justify-content: center; */

}
</style>


