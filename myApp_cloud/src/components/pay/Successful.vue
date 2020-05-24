<template>
<!-- 支付成功跳转的页面 -->
     <div class="box">
         <p>订单提交成功</p>
         <p v-once>{{second}}s之后跳转到订单页</p>
         <van-loading type="spinner" color="#1989fa" />
     </div>
</template>
<script>
import {mapActions,mapMutations,mapState} from 'vuex'
export default {
   data(){
       return{
           second:1
       }
   },
     computed:{
      ...mapState(['uname','uid']),
  },
//    created(){
//        this.jump();
//    },
   mounted(){
          this.jump();
   },
   methods:{
       jump(){
           setInterval(()=>{
               this.second-=1
               if(this.second==0){
                //    跳转到全部订单
                   this.$router.push('/MyOrder/trip/2')
                console.log('跳转。。。。。。。。。。')
                       this.changeStates();
               }
           },1000)
       },
       changeStates(){
         let url = "cart/changeOrderStatus";
         let params = {
           orderState:'666',
        uid:this.uid

        };
       let type='get'
       this.reqM1Service(url,params,type).then(
       res => {
          console.log('changeOrderStatus',res.data);
          });
       }
   }
}
</script>
<style scoped>
.box{
    width: 100%;
    height: 200px;
    
    /* display: flex;
    justify-content: center;
    align-items: center; */
}
</style>


