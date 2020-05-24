<template>
    <div>
                <!-- 返回 -->
        <mt-header title="我的旅游购物车">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
        <h1>购物车，共{{list.length}}件宝贝</h1>
        <!-- 顶部复选框，全选 -->
         <div class="selectAll" v-if="list.length!=0">
            全选<input type="checkbox" @change="selectAll" v-model='allcb'>
         </div>
        <!-- 购物车列表 -->
        <!-- <van-row  justify="space-around"> -->
        <div class="cart-item" v-for="(item,i) of list" :key='i' >
            <!-- 每个元素的两侧间隔相等 -->
             <!-- <van-col span="1">  -->
                 <input type="checkbox" v-model='item.cb' @change="itemchange" >
            <!-- </van-col> -->
            <!-- <van-col span="3">        -->
                <div style="textAlign:left">
                <p style="font:normal 18px/24px bolder">{{item.title}}</p>
                <img :src="imgServer+item.img" alt="">
                </div>
            <!-- </van-col> -->
          <!-- <van-col span="12">  -->
              <div >
            <!-- 描述 -->
               
                <p>{{item.item_title}}</p>
                <p>
                       <!-- <span>￥{{item.price}}</span> -->
                        <!-- <span>X{{item.count}}</span> -->
                 </p>
            
                 <div class="price">
                    <span>成人￥{{item.adult}}/人</span>
                    <van-stepper class="adult" v-model="item.adultCount"  @change="changeCount(item.adultCount,item.id)" />   
                 </div> 
                 <div class="price">
                     <span>儿童￥{{item.child}}/人</span>
                    <van-stepper v-model="item.childCount" @change="changeCount1(item.childCount,item.id)" />   
                 </div>
                </div> 
          <!-- </van-col> -->
          <!-- 删除选中的商品 -->
            <!-- <van-col span="3">  -->
                <div class="d-p">
                     <div>
                           <van-button type='danger' :data-id='item.id' @click="del" size='small'>删除</van-button>
                         <!-- <mt-button >删除</mt-button> -->
                     </div>
                         <van-button type="primary"  @click="pay(item.iid,item.id)" size='small'>去支付</van-button>
                </div>
               
            <!-- </van-col> -->
                    <!-- 全部删除 -->
        </div>
    <!-- </van-row> -->
    <van-button type="warning"   @click='delm' v-if="list.length!=0" size='small'>删除所有选中的</van-button>
         <!-- <button >删除选中的商品</button> -->
        <div v-if="list.length==0"  class="cartnull">
               <h1 >购物车空空如也~~~</h1>
               <img src="@../../../static/images/cartnull.jpg" alt="" width="200px" >
        </div> 
          <!-- 立即购买遮罩层 -->
        <van-popup v-model="show1"   position="right"   closeable  :style="{ height: '90%' ,width:'100%'}">
         <div>
             购物车转支付
             <div v-for="(item,i) in topayCart " :key="'pay'+i">
                <h1>{{item.title}}</h1>
             </div>
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
        adultC:'0',
        childC:'0',
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
        topayCart:[],/*加入购物车去支付*/
        }
        },
        created(){
          this.loadCart()
        },
        methods:{  
            // 返回
            back(){this.$router.go(-1)},
            // 修改成人数量
            changeCount(ac,id){
                console.log('点击',ac)
                console.log('点击小标',id)
                  let url='cart/cartCountUpdate';
                let params={adultCount:ac,id:id}
                let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                   console.log('res6666',res)
                //    this.topayCart=res.data
                 })
            },
            // 修改儿童数量
            changeCount1(cc,id){
                console.log('点击',cc)
                  let url='cart/cartCountUpdate1';
                let params={childCount:cc,id:id}
                let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                   console.log('res6666',res)
                //    this.topayCart=res.data
                 })
            },
            pay(iid,id){
                this.show1=true
                console.log('去支付',iid)
                    let url='cart/cartList_id';
                let params={iid:iid,id:id}
                let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                   console.log('res',res)
                   this.topayCart=res.data
                   this.$router.push(`/cartPay/${iid}/${id}`)
                 })
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
                    // for(var item in list){
                    //     this.adultC=list[item.adultCount

                    // }
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
    height: 150px;
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
/* 成人儿童价格 */
.price{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
}
/* 删除支付 */

</style>


