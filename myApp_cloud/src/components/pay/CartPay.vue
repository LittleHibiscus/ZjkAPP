<template>
<!-- 在购物车中点击去支付！ -->
    <div class="outer">
                <!-- 返回 -->
        <mt-header title="支付">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
        <div class="cartPay" v-for="(item,i) of topayCart " :key="i">
            <p class="title">出行地点：{{item.title}}</p>
            <div class="title">
                <span >成人<span class="money">￥</span><span class="aduPri">{{item.adult}}</span></span>×<span>{{item.adultCount}}</span>
            </div>
           <div class="title">
                <span>儿童<span class="money">￥</span><span class="aduPri">{{item.child}}</span></span>×<span>{{item.childCount}}</span>
           </div>
        <div>
                     <van-notice-bar  v-show="nu1" wrapable :scrollable="false">
                   请选择出行日期
                </van-notice-bar>
                <van-cell title="点击选择出行日期" :value="date" @click="show3 = true" />
                <van-calendar v-model="show3" type="range" @confirm="onConfirm"   />
        </div>
        <div class="userInfo">
                    <h1 class="title">游客支付信息</h1>
                      <div  class="phone">
                            <span class="titPho"> 手机号码:</span><input type="text" v-model='phone' @blur="checkPhone">
                      </div>
                          <van-notice-bar  v-show="phoneReg" wrapable :scrollable="false">
                         手机号格式错误！请重填
                          </van-notice-bar>
                      <div class="phone">
                           <span class="titPho">姓名：</span><input type="text" v-model='username'  required>
                      </div>   
        </div>
        </div>
        <div class="pay" v-for="(item,i) of topayCart " :key="'a'+i">
            <div class="price"> <span class="money">￥</span>{{item.price}}</div>
           <van-button  type="danger" @click="pay">支付</van-button>
        </div>
     
    </div>
</template>
<script>
import {mapActions,mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{
           topayCart:[],
            date: '',//日历
         nu:'',/*出行人数为0的判断*/
        nu1:false,/*出行人数为0的判断*/
        phoneReg:'',/*手机号格式验证*/
        show3:false,
        username:'',
        phone:'',
  
        }
    },
    props:['iid'],
    computed:{
      ...mapState(['uname','uid']),
  },
    methods:{
            //   返回
               back(){
                   this.$router.go(-1)
               },
               // 去支付
               pay(){
                   //    验证是否登录
                   var uid=this.uid
                    if(!uid){
                        console.log('uid没有')
                        this.$router.push('/login')
                        this.$toast({
                            message: '请登录',
                    });
                    }else{
                        // 验证是否输入日期，没输入提示黄框
                        if(this.date==''){
                        console.log('日期',this.date)
                        this.nu1=true 
                        this.show1=true
                    }
                // if(this.nu1){
                //     console.log('请选择出行人数')
                //     this.nu=true 
                //     this.show1=true
                //      }
                      else{
                         this.nu=false 
                        //手机号正则验证    
                            var phone =this.phone;
                            var reg=/^1(3|4|5|6|7|8|9)\d{9}$/
                            // 手机号验证通过
                            if(reg.test(phone)){ 
                                console.log('手机号',reg.test(phone))
                                // 调取插入用户订单接口userOrder
                                let url = "cart/userOrder"; let type='get'
                            //  支付参数
                                let params = {
                                // id:this.id,
                                iid:this.iid,
                                uid:this.uid,
                                title:this.topayCart[0].title,
                                uname:this.uname,//商品iduname:uname,uid:uid,
                                // toString:'666',
                                totalprice:this.topayCart[0].adult*this.topayCart[0].adultCount+this.topayCart[0].child*this.topayCart[0].childCount,   //xxxxxxxxxxx  
                                img:this.topayCart[0].img,
                                createtime:new Date().getTime()/1000,
                                uname:this.username,
                                phone:this.phone,
                                time:this.date.toString(),
                                };
                                this.reqM1Service(url,params,type).then(
                                res => {
                                    console.log('购物车转支付，插入用户订单',res.data);//插入到订单表，状态 affectedRows
                                        this.$router.push('/pay/'+this.iid+'/'+this.uid+'/'+params.time)
                                }); 
                                // 手机号验证不通过
                           } else{
                                console.log('手机号',reg.test(phone))
                                this.phoneReg=true
                                this.show1=true 
                }
                     }
                 }
               },
            //    加载
               loading(){
                    let url='cart/cartList_id';
                let params={iid:this.iid}
                let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    this.topayCart=res.data
                    for(var key in this.topayCart){
                        this.topayCart[key].price=this.topayCart[key].adult*this.topayCart[key].adultCount+this.topayCart[key].child*this.topayCart[key].childCount
                    }
                   console.log('resthis.topayCart',this.topayCart)
              
                 })
        },
            // 手机号正则验证
                checkPhone(){
                        //手机号正则验证    
                            var phone =this.phone;
                            var reg=/^1(3|4|5|6|7|8|9)\d{9}$/
                            if(reg.test(phone)){ 
                                console.log('手机号',reg.test(phone))
                                this.phoneReg=false
                            
                            } else{
                                console.log('手机号',reg.test(phone))
                                //   // alert("手机号码有误，请重填");  
                                this.phoneReg=true
                                this.show1=true
                                // return false; 
                            }
                },
            //          // 时间确认
            onConfirm(date) {
                const [start, end] = date;
                this.show3 = false;
                this.date = `${this.formatDate(start)}-${this.formatDate(end)}`;
                this.date1 = (end-start)/(60*60*24*1000);
                console.log('date----',this.date)
                console.log('date1天----',this.date1)
            },
                    formatDate(date) {
            return `${date.getFullYear()}年${date.getMonth() + 1}-${date.getDate()}`;
            },
    },
    created(){
        this.loading()
    }
}
</script>
<style scoped>
.cartPay{
  width: 100%;
  position: absolute;
  top: 10%;
  /* text-align: left; */
}
/* 手机号码 */
.userInfo{
 width: 80%;
 margin: 0 auto;
 height: 150px;
 background: #ddd;
 text-align: center;
 margin-top: 50px;
}
.phone{
    width: 100%;
    margin-bottom: 30px;
}
.phone input{
    height: 30px;
        /* width: 80%; */
    /* text-indent: 10px; */
}
.title{
    font: normal 18px/24px bolder;
    margin-bottom: 20px;
}
.pay{
    width: 100%;
    position: fixed;
    bottom: 0px;
    right:0px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
}
.price{
    width: 80px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    /* border: 1px solid #f00; */
    color: #f00;
    font-weight: bolder;
}
.money{
    color: #f00;
    font-size: 12px;
}
.titPho{
    display:inline-block;
    width: 80px;

}
.aduPri{
    font-size: 18px;
    font-weight: bold;
    color: #f00;
}
</style>

