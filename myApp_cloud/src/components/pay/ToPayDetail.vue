<template>
    <div>
        <!-- 去支付的详情-->
                         <!-- 返回 -->
        <mt-header title="我的未支付订单">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
        <div>
              <div class="cart-item" v-for="(item,i) of list" :key='i'  >
            <!-- <div class="leftText">
                <img :src="imgServer+item.img" alt="">
            </div> -->
            <div class="rightText">
                <!-- 标题 -->
                <p class="title">{{item.title}}标题</p>
                <p class="title">总价￥{{item.totalprice}}</p>
                <p class="title">出行时间:{{item.time}}</p>
                <p   class="title" >状态：未支付</p>
                <div class="info">
                    <h1  class="title" style="color:#f00">订票人信息</h1>
                    <p class="title">姓名：{{item.uname}}</p>
                    <p class="title">手机号：{{item.phone}}</p>
                </div>
                <van-button type="primary"  @click="pay(item.iid,item.id)">去支付</van-button>
                <!-- 删除选中的商品 -->
                <hr>
            </div>
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
            list:[],
            topayCart:[],
            date: '',//日历
            nu:'',/*出行人数为0的判断*/
            nu1:false,/*出行人数为0的判断*/
            phoneReg:'',/*手机号格式验证*/
            show3:false,
            username:'',
            phone:'',
            imgServer:domain.Base_M1_URL,// 图片服务器地址
        }
    },
    props:['iid','id'],
    created(){
        this.loadCart()
    },
      computed:{
      ...mapState(['uname','uid']),
     },
    methods:{
          back(){
              this.$router.go(-1)
          },
        // 加载购物车
            loadCart(){
                let url='cart/transPay';let params={iid:this.iid,id:this.id};let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log('未支付转支付',res.data);
                    this.list=res.data
                 }
                )
            },
            // 去支付
            pay(iid,id){
                        this.show1=true
                        console.log('去支付',iid)
                            let url='cart/cartList_id';
                        let params={iid:iid}
                        let type='get'
                        this.reqM1Service(url,params,type).then(
                        res => {
                        console.log('res',res)
                        this.topayCart=res.data
                             console.log(' this.topayCartres' ,this.topayCart)
                        this.$router.push(`/pay/${iid}/${this.list[0].uid}/${this.list[0].time}`)
                        })
        },
    }
}
</script>
<style scoped >
.title{
    font-size: 18px;
    margin-bottom: 20px;
}
</style>

