<template>
<!-- 待支付项目列表 -->
	<div id="orderList">
		  <div class="cart-item" v-for="(item,i) of list" :key='i' v-if="item.orderState==0" @click="toPayDetail(item.iid,item.id)">
            <div class="leftText">
                <img :src="imgServer+item.img" alt="">
            </div>
            <div class="rightText">
                <!-- 标题 -->
                <p>{{item.title}}标题</p>
                <!-- 描述 -->
                <p>{{item.title}}描述</p>
                <p>总价￥{{item.totalprice}}</p>
                <!-- <p v-if="item.orderState==0">状态：未支付</p> -->
                 <van-button type="warning" size="mini">未支付</van-button>
                <!-- <p v-else>状态：未支付</p> -->
            </div>
        </div>    
 </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

</template>
<script>
// 图片服务器地址
import {domain} from '../../url.js'
import {mapActions,mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{
            list:[],//用户订单列表
            imgServer:domain.Base_M1_URL,// 图片服务器地址
            null:''//购物车为空显示
          }
        },
        created(){
          this.loadCart()
        },
         computed:{
      ...mapState(['uname','uid']),
  },
        methods:{
            toPayDetail(iid,id){
                 this.$router.push(`/toPayDetail/${iid}/${id}`)
            },
            // 加载某用户，未支付的订单，
            loadCart(){
                let url='cart/userOrderList_uid0';let params={uid:this.uid};let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    this.list=res.data
                    console.log('某用户未支付的订单，',res.data);
                  
                 }
                  
                )
            },
        }

}
</script>
<style scoped >

.cart-item{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    /* justify-content:space-around; */
    border: 1px solid #ccc;
    margin-bottom: 10px;
}
.leftText{
    display: flex;
    align-items: center;
    /* justify-content: flex-start; */
}
.cart-item.cart-item img{
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}
ul{
    width: 100%;
    height: 100px;
}
ul li{
    height: 100px;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    border: 1px solid #f00;
    margin-bottom: 10px;
}
ul li img{
    width: 100px;
    height: 100px;
    border: 1px solid #000;
}
</style>