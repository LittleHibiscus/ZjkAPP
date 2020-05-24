<template>
	<div id="orderList">
		  <div class="cart-item" v-for="(item,i) of list" :key='i'>
            <div class="leftText">
                <img :src="imgServer+item.img" alt="">
            </div>
            <div class="rightText">
                <!-- 标题 -->
                <p>{{item.title}}标题</p>
                <!-- 描述 -->
                <p>{{item.title}}描述</p>
                <p>总价￥{{item.totalprice}}</p>
                <p>
                    <span>数量{{item.count}}</span>
                </p>
                <p>下单时间{{item.time}}</p>
                <p v-if="item.orderState==1">
                    <van-button type="primary" size="mini">已支付</van-button>
                </p>
                <p v-else>
                     <van-button type="warning" size="mini">未支付</van-button>
                    </p>
                <!-- 删除选中的商品 -->
                <hr>
            </div>
        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	</div>
</template>
<script>
// 图片服务器地址
import {domain} from '../../url.js'
import {mapActions,mapMutations,mapState} from 'vuex'
import timestampFormat from '../../assets/js/formatDate.js'
export default {
    data(){
        return{
            list:[],//用户订单列表
            imgServer:domain.Base_M1_URL,// 图片服务器地址
            null:''//购物车为空显示
          }
        },
        props:['status'],
        created(){
          this.loadCart()
        },
         computed:{
      ...mapState(['uname','uid']),
  },
        methods:{
            loadCart(){
                let url='cart/userOrderList1';let params={uid:this.uid};let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    console.log('userOrderList',res.data);
                    // this.list=res.data;
                    // console.log('indexdetail_list',this.list)
                    var list=res.data
                    this.status=res.data.orderStatus
                     // 为每个商品添加状态
                     for(var item of list){
                       item.cb=false
                     }
                     // 赋值
                     this.list=list
                     for(var item in this.list){
                          var transTime=this.list[item].time
                          var a=this.timestampFormat(transTime)
                          this.list[item].time=a
                     }
                 })
            },
            // 全选
          
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
    /* border: 1px solid #ccc; */
    box-shadow: 2px 2px 2px 2px #ccc;
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
  /* border: 1px solid #000; */
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
    /* border: 1px solid #f00; */
    margin-bottom: 10px;
}
ul li img{
    width: 100px;
    height: 100px;
    /* border: 1px solid #000; */
}
</style>