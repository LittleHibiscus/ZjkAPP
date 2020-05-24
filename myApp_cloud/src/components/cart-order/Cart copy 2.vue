<template>
    <div>
                <!-- 返回 -->
        <mt-header title="我的旅游购物车">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
        <h1>购物车，共{{list.length}}件宝贝</h1>
        <!-- 顶部复选框，全选 -->
         <div class="selectAll" v-if="list.length!=0">
            全选<input type="checkbox" @change="selectAll" v-model='allcb'>
         </div>
        <!-- 购物车列表 -->
        <van-row  justify="space-around">
        <div class="cart-item" v-for="(item,i) of list" :key='i' >
            <!-- 每个元素的两侧间隔相等 -->
             <van-col span="1"> 
                 <input type="checkbox" v-model='item.cb' @change="itemchange" >
            </van-col>
            <van-col span="4">       
                <img :src="imgServer+item.img" alt="">
            </van-col>
          <van-col span="6"> 
              <div >
            <!-- 描述 -->
                <p>{{item.title}}</p>
                <p>{{item.item_title}}</p>
                <p>
                       <!-- <span>￥{{item.price}}</span> -->
                        <!-- <span>X{{item.count}}</span> -->
                 </p>
                 <button @click="showPopup1">去支付</button>
                 <!-- <div>
                        <span>成人{{item.adult}}</span>
                    <van-stepper v-model="adult"/>   
                     <span>儿童{{item.child}}</span>
                    <van-stepper v-model="child" />   
                 </div>  -->
                </div> 
          </van-col>
            <van-col span="6"> <!-- 删除选中的商品 -->
                    <mt-button :data-id='item.id' @click="del" size='small'>删除</mt-button>
            </van-col>
                    <!-- 全部删除 -->
        </div>
    </van-row>
         <button @click='delm' v-if="list.length!=0">删除选中的商品</button>
        <div v-if="list.length==0"  class="cartnull">
               <h1 >购物车空空如也~~~</h1>
               <img src="@../../../static/images/cartnull.jpg" alt="" width="200px" >
        </div>    
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
import {domain} from '../../url.js'
export default {
    data(){
        return{
           imgServer:domain.Base_M1_URL,// 图片服务器地址
            list:[],//购物车列表
            allcb:false,//最上面全选，双选绑定的变量
            adult:'1',
            child:'1',
        show: false,
        show1:false,
        adult:'0',
        child:'0',
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
        created(){
          this.loadCart()
        },
        methods:{
               // 时间确认
    onConfirm(date) {
      const [start, end] = date;
      this.show3 = false;
      this.date = `${this.formatDate(start)}-${this.formatDate(end)}`;
      this.date1 = (end-start)/(60*60*24*1000);
      console.log('date----',this.date)
      console.log('date1天----',this.date1)
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
         
             // 立即购买
    buyNow(e){
        var uid=this.uid
        var uname=this.uname
        // if(!uid){
        //     console.log('uid没有')
        //     this.$router.push('/login')
        //     this.$toast({
        //           message: '请登录',
        //     });
        // }
        // else{
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
         

    // }
    
  },
            
                //显示弹出层 -立即购买
     showPopup1() {
        //       var uid=this.uid
        // var uname=this.uname
        // if(!uid){
        //     console.log('uid没有')
        //     this.$router.push('/login')
        //     this.$toast({
        //           message: '亲，请先登录',
        //     });
        // }else{

            this.show1 = !this.show1;
        // }
    },
            // 根据上面复选框的状态修改上面的全选状态
            itemchange(){
                // 商品复选框的状态修改
                // 1累加商品状态
                // 创建变量，选中的数量
                var sum=0;
                // 3创建循环办理商品状态
                for(var item of this.list){
                    if(item.cb){//选中为true
                    sum++//选中数量加一
                    }
                }
                //如果全部选中的数量等于当前购物车数组的长度，设置全选为true
                if(sum==this.list.length){
                    this.allcb=true
                }else{
                    this.allcb=false
                }
            },
            // 加载购物车列表
            loadCart(){
                let url='cart/cartList';
                let params=''
                let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    console.log('cart/addCart',res.data);
                    // this.list=res.data;
                    // console.log('indexdetail_list',this.list)
                    var list=res.data
                //      if(list.length==0){
                //          this.showNull=true
                //        console.log('购物车空空如也')
                //   }
                    // 为每个商品添加状态
                    for(var item of list){
                      item.cb=false
                    }
                    // 赋值
                    this.list=list
                 }
                  
                )
            },
            // 全选
            selectAll(event){
                // 1添加参数event
                // 2获取当前全选按钮状态
                var all=event.target.checked;
                console.log(all)//全选按钮true选中，false,未选中
                // 赋值所有商品的复选框选中状态
                for(var item of this.list){
                    item.cb=all
                }              
            },
            // 删除选中的一个商品
            del(event){
                // 1为删除按钮添加自定义属性data-id 保存当前购物车商品id
                // 2条件点击事件，click del
                // 2.1交互提示，是否删除商品
                this.$messagebox.confirm('是否删除商品')
                // 确定删除
                .then(res=>{
                // 回调函数3~8
                // 3获取当前商品id
                var id=event.target.dataset.id;console.log('购物车id',id)
                // 发送ajax请求，删除购物车商品,重新加载购物车列表loadCart
                    let url='cart/cartDel';
                    let params={id}
                    let type='get'
                    this.reqM1Service(url,params,type).then(
                    res => {
                        console.log('cart/cartDel',res);
                        // 重新加载购物车列表loadCart
                        this.loadCart()
                    })
                })
                .catch(err=>{
                //取消
                })
            },
            // 删除选中的很多商品
            delm(){
                    // 3 创建空字符串，保存复选框所选中的下标数组'1,2,3'
                        var str=''
                    // 4创建循坏遍历list数组，判断如果当前对象cb选中值为true时，执行以下操作
                        for(var item of this.list){
                                if(item.cb){
                                    str+=item.id+',';//str拼接选中的item.id的下标值
                                }
                        }
                //   将对象id拼接
                // 5 判断用户是否选中商品，未选中不可执行全部删除操作，提示！‘请选中要删除的商品’
                    if(str.length==0){
                        this.$messagebox('请先选择要删除的商品！');
                        return;
                    }else{//截取选中的长度，数组下标起始为0 ，截取从下标0开始，截取str.lenght-1
                        //1：显示交互提示框，请用户再次确认是否删除商品
                        this.$messagebox.confirm('是否删除选中的商品')
                        // 2 再次确认
                        .then(res=>{
                                str=str.substring(0,str.length-1)
                                console.log('截取后的str',str)
                                // 发送ajax请求，删除选中的很多商品,参数为一组id
                                let url='cart/cartDelAll';let params={id:str};let type='get'
                                this.reqM1Service(url,params,type)
                                .then(res => {
                                console.log('删除选中很多商品的res',res);
                                // 再重新加载购物车列表
                                this.loadCart()
                                // 9提示删除成功
                                this.$toast('删除成功')
                                }) 
                            })
                            .catch(err=>{})
                        }  
            },
        }

}
</script>
<style scoped>
.selectAll{
    text-align: left;
}
.cart-item{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    border: 1px solid #ccc;
    margin-bottom: 10px;
}
.leftText{
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    justify-content: space-between;
    align-items: center;
    border: 1px solid #f00;
    margin-bottom: 20px;
}
ul li img{
    width: 100px;
    height: 100px;
    border: 1px solid #000;
}
</style>


