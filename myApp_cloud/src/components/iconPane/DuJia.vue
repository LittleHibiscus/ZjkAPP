<template>
    <div>
    <!-- 搜索框 -->
    <!-- <van-search v-model="value" placeholder="请输入搜索关键词" /> -->
      <div class="searchHeader">
            <mt-button class="mt-button" icon="back" @click="back">返回</mt-button>
       <router-link to='/search'>
          <mt-search class="mt-search" @blur="fetchData" v-model.trim="value" cancel-text="取消" placeholder="搜索"></mt-search>
         </router-link>
      </div>
           <!-- 回到顶端 -->
        <scrollToTop></scrollToTop>
      <!-- 首页项目展示开始 -->
       <div class="outer">
             <div class="index-show"  v-for="(item,i) of list" :key='i' :lid='item.href'>
        <!-- <router-link to='/indexDetail'> -->
       <div class="show-img" >
          <img :src="imgServer+item.bg"  alt="" :style="randomRgb()">
       </div>
       <div class="show-desc">
            <router-link class="router" :to="/recommendDetail/+item.href">
           <!-- 标题 -->
           <p class="desc-title">{{item.item_title}}</p>
           <!-- 描述 -->
           <p class="desc">{{item.subtitle}}</p>
           <!-- 标签 --> 
           <!-- <p class="label-style">
               <a  class='label' :style="randomRgb()" href="javascript:;">{{item.labela}}</a>
               <a  class='label' :style="randomRgb()" href="javascript:;">{{item.labelb}}</a>
           </p> -->
           <p class="price">成人票价￥{{item.adult}}</p>
           </router-link>
       </div>
    </div>
       </div>
    </div>
</template>
<script>
// 回到顶端
import ScrollToTop from '../common/ScrollToTop.vue'
// 图片服务器地址
import {domain} from '../../url.js'
 // 节流函数
const delay = (function() {
 let timer = 0;
 return function(callback, ms) {
 clearTimeout(timer);
 timer = setTimeout(callback, ms);
 };
})();
export default {
   data(){
       return{
           list:[],
           value:'',
            imgServer:domain.Base_M1_URL,// 图片服务器地址
       }
   } ,
    watch: {
        //watch title change
        title() {
        delay(() => {
        this.fetchData();
        console.log(this.value)
        }, 300);
        }
    },
   methods:{
      //返回    
       back(){
         this.$router.go(-1)
       },
        // 随机颜色值
        randomRgb(){
            let R=Math.floor(Math.random()*255);
            let G=Math.floor(Math.random()*255);
            let B=Math.floor(Math.random()*255);
            return{
                color:'#fff',
                background:'rgba(' + R + ',' + G + ',' + B + '.5)',
                marginRight:'5px',
                textAlign:'left'
            }},
            fetchData(){
                var url='searchIndex'
                var params={value:this.value}
                var type='get'
                this.reqM1Service(url,params,type).then(
                 res => {
                  console.log('查询',res);
                //   var rows=this.list.concat(res.data)
                //   this.list=rows
                //    console.log('this.list',this.list)
         }
        );
            }
   },
   created(){
          // 加载首页项目
     let url = "duJia";
    let params = {
    };
    let type='get'
    //->调用Java接口的请求服务
    this.reqM1Service(url,params,type).then(
      res => {
        console.log(res);
        //   var rows=this.list.concat(res.data)
        //   var row=this.list.slice(0,7)
                // this.list=rows
                this.list=res.data
                console.log('this.listzzzzzzzzz',this.list)
      }
    );
   },
   components:{
    'scrollToTop': ScrollToTop
}
}
</script>
<style scoped>
/* 首页展示 */
.mint-search{height: 50px;}
.mint-search >>> .mint-searchbar{
 background-color:rgb(38,162,255);
 /* background-color:rgb(255,240,240); */
}
.router{
    color: #000;
}
.searchHeader{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    background: rgb(38,162,255);
    align-items: center;
    position: fixed;
    top: 0;
    /* left: 0; */
    /* border-top: 1px solid #fff; */
}
.searchHeader .mt-button{
    background: transparent;
    color: #fff;
    padding: 5px;
}
.searchHeader .mt-search{
   width: 100%;
}
.outer{
    margin-top: 50px;
}
.index-show{
 width: 98%;
 height: 120px;
 border: 1px solid skyblue;
 margin-top: 20px;
 display: flex;
 justify-content: space-between;
 background: url(@/../../../../static/images/blue.jpg) no-repeat ;
background-size: cover;
border-radius: 27%;
box-shadow: 3px 5px 12px rgb(14, 50, 101);
 color: #ccc;
}
.index-show .show-img{
 width: 30%;
 height: 120px;
 /* border: 1px solid rgb(110, 58, 206); */
 border-radius: 30%;
 }
 .index-show .show-img img{
   max-width: 100%;
   height: 120px;
   border-radius: 30%;
 }
 .index-show .show-desc{
 width: 65%;
 height: 120px;
 color: #ccc;

 }
  .index-show .show-desc p{
      text-align: left;
      text-indent: 5px;
      padding: 5px;
       color: #999;
  }
  .desc-title{
    font: normal 18px bold;
  }
  .desc{
      font: normal 12px bolder;
      /* 超出一行文本省略 */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /* 文本不换行，这样超出一行的部分被截取，显示... */
  }
.label-style{
    padding: 5px;
    text-align: center;
  
}
.label{
 padding: 5px;
}
</style>

