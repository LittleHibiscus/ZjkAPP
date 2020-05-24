<template>
    <div class="index-detail">
        <!-- 返回 -->
        <mt-header title="long long long long title">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
        <!-- 纵向轮播,图片懒加载-->
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
     
       </van-swipe>
       <!-- 描述 -->
        <div class="desc" v-for="(item,i) in list" :key='i' >
            <p class="score">
                <span>4.9</span>分
                <span>782</span>赞
            </p>
            <p class="title">{{item.title}}</p>
            <p class="price">￥{{item.price}}</p>
            <div class="description">
              {{item.subtitle}}
            </div>
        </div>
        <!-- 路线 -->
        <hr>
        <van-tabs v-model="active" animated>
        <van-tab v-for="(index,i) in 3" :title="'选项 ' + index" :key='i'>
            内容 {{ index }}
        </van-tab>
        </van-tabs>
       <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
        <van-goods-action-icon icon="shop-o" text="店铺" info="12" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
      data() {
            return {
            active:'',
            images: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg'
            ],
            list:[],
            // uid:this.uname,
            }
       },
        computed:{
        ...mapState(['uname'])
        },
       props:['did','uid'],
       methods:{
         detail(){
            // var url='foodDetail'
            //  var obj={did:this.did}
            // this.axios.get(
            // url,{params:obj}
            // )
            // .then(res=>{
            //  console.log('food_detail',res);
            //  this.list=res.data.data;
            //  console.log('fooddetail_list',this.list)
            //         })
        let url = "foodDetail"
        let params = {
            did:this.did,
            uid:this.uid
        };
        let type='get'
    //->调用Java接口的请求服务
    this.reqM1Service(url,params,type).then(
      res => {
        console.log(res);
          var rows=this.list.concat(res.data)
              this.list=res.data;
                console.log('food_detail',this.list)
                console.log('food_detail---uid',this.uid)
      });
         },
       },
       created(){
           this.detail()
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
    font: normal 16px bolder;
       height: 25px;
}
.price{
        font: normal 16px bold;
        color: #f00;
}
.description{
    font: normal 16px bold;
    color: #aeaeae;
}
ul{
width: 100%;
background: #26a2ff;
display: flex;justify-content: space-between;
position: fixed;
bottom: 0;
align-items: center;}
ul li:last-child{
    width: 30%;
}
ul li:last-child button{
background: #e4740b;
padding: 5px;
border: none;
font: normal 18px bolder;
}
</style>

