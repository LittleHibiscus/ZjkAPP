<template>
    <div class="index-detail">
        <!-- 返回 -->
        <mt-header title="">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            aaaa
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
        <!-- 纵向轮播,图片懒加载-->
       <van-swipe  v-for='(item,i) in list' :key="'img'+i" class="my-swipe" style="height: 200px;" vertical  :autoplay="3000">
             <van-swipe-item >
                <img :src="imgServer+item.d_ban1" alt="">
            </van-swipe-item>
             <van-swipe-item >
                <img :src="imgServer+item.d_ban2" alt="">
            </van-swipe-item>
            <van-swipe-item >
                <img :src="imgServer+item.d_ban3" alt="">
            </van-swipe-item>  
     </van-swipe>
       <!-- 描述 -->
        <div class="desc" v-for='(item,i) in list' :key='i'>
            <!-- <p class="score">
                <span>4.9</span>分
                <span>782</span>赞
            </p> -->
            <p class="title">{{item.title}}</p>
            <p class="price">￥{{item.price}}</p>
            <div class="description">
              {{item.subtitle}}
            </div>
           
        </div>
        <!-- 路线 -->
        <hr>
        <!-- m门票 -->   
        <div  >
            <div class="menpiao" v-for='(item1,i2) in list' :key='i2' >
                <p>成人票</p>
                <div>
                    <p>价格￥{{item1.adult}}</p>
                </div> 
                <p>儿童票</p>
                <div>
                    <p>价格￥{{item1.child}}</p>
                </div>         
            </div>
        </div>
        <h1>景点地图</h1>
        <div class="local" v-for="(item,i) in list " :key="'local'+i">
             <my-map :keyword='item.title' :center='item.title'></my-map>
        </div>
  
        <!-- 用户评论 不同旅游地点显示相应的评论 -->
        <div v-for="(item2,a) in list" :key="'b'+a">
          <comments :iid='item2.iid' :title="item2.title"></comments> 
        </div>
        <!-- 回到顶端 -->
        <scrollToTop></scrollToTop>
        <!--下面  -->
            <!-- 底部tabbar -->
        <ul class="bar-footer">
             <li >
                 <!-- 收藏，选择不再收藏，调用取消收藏方法 -->
                 <div v-if='cang==false'  @click="cancelCollect">
                       <img src="@../../../static/images/loveactive.png" alt="">
                        <p>收藏</p>
                 </div>
                 <!-- 没收藏，要收藏 调用收藏方法-->
                 <div v-else  @click="addCollect">
                     <img src="@../../../static/images/love.png" alt=""> 
                    <p>收藏</p>
                </div>
             </li>
             <li class="cart" >
                <router-link to='/cart'>
                     <img src="@../../../static/images/cart.png" alt="">
                 <p>购物车</p>
                 <!-- <span>{{cartcount}}</span> -->
                </router-link>
             </li>
             <li>
                  <van-goods-action-button type="warning" text="加入购物车" @click="showPopup" />   
             </li>
             <li>
                 <van-goods-action-button type="danger" text="立即预订"    @click="showPopup1" />
             </li>
        </ul>
        <h1>攻略</h1>
         <!-- 加入购车遮罩层 -->
        <van-popup v-model="show"   position="bottom"   closeable>
            <div v-for="(item,i1) of list" :key='i1'  >
                <div class="bigimg">
                <img :src="imgServer+item.pic" alt="" >
                <div class="price">
                    <p>￥{{item.price}}</p>
                </div>
            </div>
                <div class="spec" >
                    <button >{{item.title}}</button>
                    <!-- <button>黑色</button> -->
                </div>       
            </div>
            <!-- <div class="prices-adult" v-for="(b,index) of list" :key="'a'+index"> -->
                    <span>成人</span>
                    <van-stepper v-model="adult9"/>   
                     <span>儿童</span>
                    <van-stepper v-model="child9" />                
            <!-- </div> -->
            <div>
                <van-button @click="addCart" type='primary' >确定</van-button>  
            </div>
      </van-popup>
         <!-- 立即购买遮罩层 -->
        <van-popup v-model="show1"   position="right"   closeable  :style="{ height: '90%' ,width:'100%'}">
            <div v-for="(item,i1) of list" :key='i1'  >
                <h1>{{item.title}}</h1>
                <div>
                     <van-notice-bar  v-show="nu1" wrapable :scrollable="false">
                   请选择出行日期
                </van-notice-bar>
                <van-cell title="点击选择出行日期" :value="date" @click="show3 = true" />
                <van-calendar v-model="show3" type="range" @confirm="onConfirm"   />
                </div>
                <!-- 价格 -->
                <van-notice-bar  v-show="nu" wrapable :scrollable="false">
                    请选择出行人数
                </van-notice-bar>
                <div class="prices-adult" >
                    <span>成人￥{{item.adult}}</span>
                    <van-stepper v-model="adult" min="0"  />  
                    <p >成人总价格<span class="meiyuan">￥</span><span class="price1">{{item.adult*adult}}</span></p>            
                 </div>
                <div class="prices-adult" >
                    <span>儿童￥{{item.child}}</span>
                    <van-stepper v-model="child" min="0" /> 
                     <p >儿童总价格<span class="meiyuan">￥</span><span class="price1">{{item.child*child}}</span></p>              
                </div>  
                <div class="userInfo">
                    <h1>游客信息</h1>
                      <div  class="phone">
                             手机号码<input type="text" v-model='phone' @blur="checkPhone">
                      </div>
                          <van-notice-bar  v-show="phoneReg" wrapable :scrollable="false">
                         手机号格式错误！请重填
                          </van-notice-bar>
                    
                      <div class="phone">
                           姓名：<input type="text" v-model='username'  required>
                      </div>
                    
                </div>
                <div class="pricetotal">
                    <p >待支付￥{{item.adult*adult+item.child*child}}</p>   
 
                </div>              
                    <van-button class="buynow" @click="buyNow" type='primary' >立即预订</van-button>   
            </div>
      </van-popup>
    </div>
</template>
<script>
import Map from '../common/Map.vue'//地图
import Comments from '../comments/Comments.vue'//评论组件
// 图片服务器地址
import {domain} from '../../url.js'
// 回到顶端
import ScrollToTop from '../common/ScrollToTop.vue'
import {mapActions,mapMutations,mapState} from 'vuex'
export default {
      data() {
        return {
        love:true,
        imgServer:domain.Base_M1_URL,// 图片服务器地址
        value:'1',
        list:[],//商品列表
        collect:[],//收藏列表
        show: false,
        show1:false,
        adult:'0',
        child:'0',
        adult9:'0',
        child9:'0',
        //   日历
        text: '',
        show3: false,
        date: '',//日历
        cang:true,//收藏
        username:'',
        phone:'',
        nu:'',/*出行人数为0的判断*/
        nu1:'',/*出行人数为0的判断*/
        phoneReg:'',/*手机号格式验证*/ 
        }
  },

  props:['did'],
  computed:{
      ...mapState(['uname','uid']),
  },
  methods:{
    ...mapMutations(['setUname','setUid']),
    //    日期选择 格式转换
         formatDate(date) {
      return `${date.getFullYear()}年${date.getMonth() + 1}-${date.getDate()}`;
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
    // 时间确认
    onConfirm(date) {
      const [start, end] = date;
      this.show3 = false;
      this.date = `${this.formatDate(start)}-${this.formatDate(end)}`;
      this.date1 = (end-start)/(60*60*24*1000);
      console.log('date----',this.date)
      console.log('date1天----',this.date1)
    },
      //添加收藏 
       addCollect(){
            console.log('添加收藏')
            this.$toast({
                 message: '收藏',
            })
            this.cang= !this.cang
            var uid=this.uid
            var uname=this.uname
            if(!uid){
                console.log('uid没有')
                this.$router.push('/login')
                this.$toast({
                    message: '请登录',
                });
            }else{
                let url = "user/userCollect";let type='get'
                let params = {
                    uid:uid,
                    title:this.list[0].title,
                    des:this.list[0].subtitle,
                    img:this.list[0].pic
                    };
                    this.reqM1Service(url,params,type).then(
                    res => {
                        console.log('user/userCollect',res.data);
                    });
            }    
      },
    //   取消收藏
      cancelCollect(){
          console.log('取消收藏')
            this.$toast({
                 message: '取消收藏',
            })
            this.cang=!this.cang//修改收藏状态与图标的状态
             let url = "user/userCollect_del";let type='get'
             let params = {title:this.child_every[0].item_title};    console.log('取消收藏参数',params);
            this.reqM1Service(url,params,type).then(
            res => {
                console.log(res);
                console.log('取消收藏参数',params);
                console.log('user/userCollect_del',res.data);
            });
      },
    //  详情展示
        detail(){
            let url = "indexDetail";let params = {did:this.did,}; let type='get'
            this.reqM1Service(url,params,type).then(
            res => {
            console.log(res);
            console.log('index_detail',res);
                    this.list=res.data;
                    console.log('indexdetail_list',this.list)
        }
        );
        },
    // 显示弹出层-加入购物车
     showPopup() {
                 var uid=this.uid
        var uname=this.uname
        if(!uid){
            console.log('uid没有')
            this.$router.push('/login')
            this.$toast({
                  message: '亲，请先登录',
            })
            }
            else{
                 this.show = !this.show;
            }
     
    },
    //显示弹出层 -立即购买
     showPopup1() {
              var uid=this.uid
        var uname=this.uname
        if(!uid){
            console.log('uid没有')
            this.$router.push('/login')
            this.$toast({
                  message: '亲，请先登录',
            });
        }else{

            this.show1 = !this.show1;
        }
    },
    // 添加购物车
    addCart(){
        console.log('添加购物车')
        this.showPopup();
        var uid=this.uid
        var uname=this.uname
        if(!uid){
            console.log('uid没有')
            this.$router.push('/login')
            this.$toast({
                  message: '请登录',
            });
        }
        else{
            let url = "cart/addCart";
         let params = {
         iid:this.did,//商品id
         uname:uname,
         uid:uid,
         img:this.list[0].pic,
         title:this.list[0].title,
         price:this.list[0].price,
         adult:this.list[0].adult,
         child:this.list[0].child,
         adultCount:this.adult9,    
         childCount:this.child9,    
      
        };
        // this.cartcount=this.setCartCount(this.cartcount)
         console.log('购物车uid',uid,uname);console.log('购物车price',this.list[0].price)
       let type='get'
       this.reqM1Service(url,params,type).then(
       res => {
        console.log(res);
          console.log('cart/addCart',res.data);
          this.$toast('加入购物车成功')
      }
    );
    }
    },
    // 立即购买
    buyNow(e){
        var uid=this.uid
        var uname=this.uname
        if(!uid){
            console.log('uid没有')
            this.$router.push('/login')
            this.$toast({
                  message: '请登录',
            });
        }
        else{
             this.showPopup1();
             if(this.date==''){
                  console.log('日期',this.date)
                   this.nu1=true 
                 this.show1=true
             }
             if(this.adult==0&&this.child==0){
                 console.log('请选择出行人数')
                 this.nu=true 
                 this.show1=true
           }else{
                 this.nu=false 
               //手机号正则验证    
                var phone =this.phone;
                var reg=/^1(3|4|5|6|7|8|9)\d{9}$/
                if(reg.test(phone)){ 
                    console.log('手机号',reg.test(phone))
                      let url = "cart/userOrder"; let type='get'
                //  支付参数
                let params = {
                iid:this.did,
                uid:this.uid,
                title:this.list[0].title,
                uname:this.uname,//商品iduname:uname,uid:uid,
                totalprice:this.list[0].adult*this.adult+this.list[0].child*this.child,   //xxxxxxxxxxx  
                img:this.list[0].pic,
                createtime:new Date().getTime()/1000,
                uname:this.username,
                phone:this.phone,
                time:this.date.toString(),
                };
            this.reqM1Service(url,params,type).then(
            res => {
                console.log('cart/userOrder66666666666666666',res.data);//插入到订单表，状态 affectedRows
                    this.$router.push('/pay/'+this.did+'/'+this.uid+'/'+params.time)
            }); 
                } else{
                      console.log('手机号',reg.test(phone))
                    //   // alert("手机号码有误，请重填");  
                    this.phoneReg=true
                     this.show1=true
                    // return false; 
                }
              
           }
         

    }
    }
  },
  created(){
    this.detail()
  },
components:{
    'my-map':Map,
    'comments':Comments,
    'scrollToTop': ScrollToTop
}
}
</script>
<style scoped>
.mint-search{height: 50px;}

.van-swipe {
height: 200px;
}
.van-swipe img{
    height: 200px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  /* background-color: #39a9ed; */
}
.desc{
    text-align: left;
    /* text-indent: 8px */
    padding-left: 10px;
    margin-top: 8px;
    }
.score{
      font: normal 12px bolder;
      height: 20px;
}
.title{
    font: normal 20px bolder;
    height: 25px;
    color: rgb(42, 42, 151);
    text-shadow: 13px 14px 14px #aaa;
    margin-bottom: 8px;
}
.price{
        font: normal 16px bold;
        color: #f00;
}
.description{
    text-indent: 20px;
    font: normal 16px bold;
    color: #aeaeae;
    margin-top: 10px;
}

/* 则罩层 */

.bigimg{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
}
.bigimg img{
  width:150px;
  height: 80px;
  border: 1px solid #f00;
}
.spec{
    /* background: #fff; */
    width: 100%;
    /* height: 50px; */
    /* display: flex;
    justify-content:space-evenly; */
    text-align: left;
}
.spec span{
    background: #ddd;
    padding: 5px;
    margin: 5px 5px 5px 0px;
}

.count{
   width: 100%;
   text-align: left;
   /* height: 50px; */
   border: 1px solid #000;
   margin-top: 10px;
}
/* 门票 */
.menpiao{
    width: 100%;
    height: 60px;
    background: #ddd;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
}
.prices-adult{
    width: 100%;
    /* border: 1px solid #f00; */
    display: flex;
    justify-content: space-around;
    margin: 20px auto;
    padding: 10px;
}
/* 价格 */
.price1{
    color:tomato;
    font: normal 18px bolder;
}
.meiyuan{
    color:tomato;
    font: normal 12px bolder;
}
.pricetotal{
    position: fixed;
    bottom: 10px;
    left: 20px;
    font: normal 18px bolder;
    /* display: flex;
    justify-content: space-around;
    align-items: center; */
}
.buynow{
    position: fixed;
    bottom: 10px;
    right: 10px;
}
/* 手机号码 */
.userInfo{
 width: 80%;
 margin: 0 auto;
 height: 150px;
 background: #ddd;
 text-align: center;
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
.tu{
    width: 100%;
    height: 80px;
    border: 1px solid #f00;
}
.tu img{
      width: 100%;
    height: 150px;
}
/* 底部tabbar */
.bar-footer{
    width: 100%;
    height: 60px;
    display: flex;
    position: fixed;
    align-items: center;
    bottom: 0;
    right: 0;
}
.cart{
    position: relative;
}
.cart span{
    position: absolute;
    right: 0;
    top: 0;
}
.bar-footer li:nth-child(1),.bar-footer li:nth-child(2){
    width: 20%;
}
.bar-footer li:nth-child(3),.bar-footer li:nth-child(4){
    width: 30%;
}
/* 地图 */
.local{
    height: 250px;
    border: 1px solid #000;
    overflow: auto;
}
.phoneReg{
    color: #f00;
}
</style>

