<template>
    <div>
         <van-cell title="修改密码" is-link to="/changePwd" />
         <van-cell title="修改头像" is-link to="/changeAvator" />
         <!-- 渐变色按钮 -->
          <van-button @click="logout1" color="linear-gradient(to right, #4bb0ff, #6149f6)" block>退出登录</van-button>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
        }
    },
    methods:{
         ...mapActions(['logout']),
         logout1(){
            console.log(1111111111)
                          this.$dialog.confirm({
        title: '退出登录',
        message: '确定要退出吗'
        }).then(() => {
            this.logout().then(res=>{
                 this.$router.push('/login')
            })
       
        }).catch(() => {
        // on cancel
        });
                
  
          
         }
    },
    computed:{
    },
//      components: {
//     [Dialog.Component.name]: Dialog.Component
//   }
 }
</script>
<style scoped>
.van-cell{text-align: left;}
</style>


