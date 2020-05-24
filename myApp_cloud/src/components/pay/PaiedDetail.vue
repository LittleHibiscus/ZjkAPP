<template>
<div class="outer">
        <!-- 返回 -->
        <mt-header title="已支付订单">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
         <!-- 通知栏 -->
         <!-- closeable 模式，在右侧显示关闭按钮 -->
        <van-notice-bar mode="closeable"  left-icon="volume-o">
        亲爱的旅客，用于疫情影响，请您佩戴口罩，文明出行，关爱你我他
        </van-notice-bar>
    <div id="orderList">
        
		  <div class="cart-item" v-for="(item,i) of list" :key='i'  @click="toDetail(item.iid)">
              
            <div class="rightText">
                <!-- 标题 -->
                <p class="title">出行地点:&nbsp;&nbsp;{{item.title}}</p>
                <p  class="title">总价:&nbsp;&nbsp;￥{{item.totalprice}}</p>
                <p class="title">状态:&nbsp;&nbsp;已支付</p>
                <p class="title">下单时间:&nbsp;&nbsp;{{item.createtime| fifterTime}}</p>
                <p class="title">出行时间:&nbsp;&nbsp;{{item.time}}</p>
                <div class="info">
                    <h1>订票人信息</h1>
                     <div>
                             姓名<input type="text" v-model="item.uname" disabled>
                     </div>
                     <div>
                             电话<input type="text" v-model="item.phone" disabled>
                     </div>
                </div>
            </div>
        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	</div>
</div>
	
</template>
<script>
// 图片服务器地址
import {domain} from '../../url.js'
import {mapActions,mapMutations,mapState} from 'vuex'
import fifterTime from '../../assets/js/fifter.js'
export default {
    data(){
        return{
            list:[],//用户订单列表
            imgServer:domain.Base_M1_URL,// 图片服务器地址
            null:''//购物车为空显示
          }
        },
        props:['id'],
           // 时间戳过滤器
      	filters: {
			fifterTime(time) {
				let date = new Date(time)
                return fifterTime(date, 'yyyy-MM-dd hh:mm')
                console.list('fifterTime',fifterTime)
			}
		},
        created(){
          this.loadCart()
        },
         computed:{
      ...mapState(['uname','uid']),
  },
        methods:{
            back(){this.$router.go(-1)},
            toDetail(iid){
                console.log('iidiiid',iid)
                // this.$router.push(`/PaiedDetail`)
            },
            // 加载购物车
            loadCart(){
                let url='cart/userOrder_suc';let params={id:this.id};let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    this.list=res.data
                    console.log('userOrderList9999999999',res.data);
                 }
                  
                )
            },
            // 全选
          
        }

}
</script>
<style scoped >
.cart-item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-around;
    border: 1px solid rgb(255,251,232);
    margin-top: 10px;
    padding: 5px;
}
.title{
    font:normal 18px/24px bolder;
    margin-bottom: 20px;
}
.rightText{
    text-align: left;
}
.info{
    text-align: center;
}
.info div{
    width: 100%;
    height: 50px;
    /* margin-bottom: 10px; */
}

.info input{
 width: 100%;
 height: 30px;
}

</style>