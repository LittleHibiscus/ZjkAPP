<template>
    <div>
          <!-- 返回 -->
        <mt-header title="修改密码">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
        <div>
         <div class="change">
                原密码:<input type="password" v-model='upwd'  placeholder="旧密码"  @change="checkYuan">
                <!-- <span v-show='isTrue'></span>
                <span v-show='isTrue1'></span> -->
              
         </div>   <p v-show='isTrue' class="font">原密码正确√</p>
                <p v-show='isTrue1'  class="font">原密码错误×</p>
           <div class="change" >
                新密码<input type="password" v-model='newUpwd' >
           </div>
           <div class="change">
                确认密码<input type="password" v-model='ok'  @blur="checkNew">
                 <p v-show='isTrue2' class="font">两次输入一致</p>
                <p v-show='isTrue3'  class="font">两次输入不一致！</p>
           </div>
           
            <button @click="checkNew1">确认修改</button>
        </div>

    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    name:'ChangePwd',
    data(){
        return{
         upwd:'',//原密码
         newUpwd:'',//新密码
         ok:'',//确认密码
         list:[],//该uid 用户信息
         isTrue:'',//判断原密码正确
         isTrue1:'',//判断原密码错误
         isTrue2:'',//判断确认密码是否正确
         isTrue3:'',//判断输入是否正确
        }
    },
    computed:{
        ...mapState(['uname','uid'])
    },
    methods:{
         ...mapActions(['logout']),
        // 失去焦点时，判断原密码是否正确
        checkYuan(){
                 //  查询指定用户的密码
            let url ="user/update";
            let params = {uname:this.uname};
            let type='get'
            this.reqM1Service(url,params,type).then(
            res => {
                this.list=res.data
                //新密码与确认密码是否相同
                if(this.$md5(this.upwd)!=this.list[0].upwd){
                    console.log('原密码输入错误,原密码',this.list[0].upwd)
                    this.isTrue1=true
                    this.isTrue=false
                }else{
                    console.log('原密码输入正确')
                    this.isTrue=true
                    this.isTrue1=false
                    // if(this.ok==this.newUpwd){
                    //    this.change()
                    // }else{
                    //      console.log('两次密码输入不正确！')
                    // }
    
                }
            })
        },
        // 失去焦点时，检查新密码是否相同
        checkNew(){

            var newU =this.newUpwd
              if(this.ok==newU){
                    //    this.change()
                       console.log('两次一致！')
                       this.isTrue2=true;
                              let url ="user/update1";
          let params = {upwd:this.$md5(newU),uid:this.uid};
          let type='get'
          this.reqM1Service(url,params,type).then(
           res => {
             this.list=res.data
             console.log('修改密码',res);
             this.logout()
       
             this.$toast('密码修改成功！请重新登录')
             this.$router.push('/login')
                //    this.$router.go(0)
             });
                    }else{
                         console.log('两次密码输入不正确！')
                            this.isTrue3=true;
                         return;
                    }
        },
        checkNew1(){

            var newU =this.newUpwd
              if(this.ok==newU){
                    //    this.change()
                       console.log('两次一致！')
                       this.isTrue2=true;
                              let url ="user/update1";
          let params = {upwd:this.$md5(newU),uid:this.uid};
          let type='get'
          this.reqM1Service(url,params,type).then(
           res => {
             this.list=res.data
             console.log('修改密码',res);
             this.$toast('密码修改成功！请重新登录')
             this.$router.push('/Login')
             });
                    }else{
                         console.log('两次密码输入不正确！')
                            this.isTrue3=true;
                         return;
                    }
        },
        // ...mapMutations(['set']),
    //     update(){
    //         //  查询指定用户的密码
    //         let url ="user/update";
    //         let params = {uname:this.uname};
    //         let type='get'
    //         this.reqM1Service(url,params,type).then(
    //         res => {
    //             this.list=res.data
    //             //新密码与确认密码是否相同
    //             if(this.$md5(this.upwd)!=this.list[0].upwd){
    //                 console.log('原密码输入错误,原密码',this.list[0].upwd)
    //                 this.isTrue=false
    //             }else{
    //                 console.log('原密码输入正确')
    //                 this.isTrue=true
    //                 if(this.ok==this.newUpwd){
    //                    this.change()
    //                 }else{
    //                      console.log('两次密码输入不正确！')
    //                 }
    
    //             }
    //         })
    // },
    // 修改密码
    change(){
           let url ="user/update1";
          let params = {upwd:this.$md5(this.newUpwd),uid:this.uid};
          let type='get'
          this.reqM1Service(url,params,type).then(
           res => {
             this.list=res.data
             console.log('修改密码',res);
             });
    }
 }
}
</script>
<style scoped>
.change{
    width: 100%;
    height: 40px;
    background: #fff;
    text-align: left;
    padding-left: 30px;
    font:normal 16px/40px bold;
    margin-bottom: 20px;

}
 input{
 width: 65%;
 height: 30px;
 margin-bottom:10px;
 text-indent: 30px;
 font-size: 14px;
}
span{
    width: 20%; 
    display: inline-block;
    border: 1px solid #f00;
}
.font{
    font-size: 14px;
    color: #f00;
}
button{
    height: 50px;
    width: 100%;
    font-size: 16px;
    border-radius: 20px;
    color: #fff;
    background:skyblue;
    margin-top: 20px;
}
</style>


