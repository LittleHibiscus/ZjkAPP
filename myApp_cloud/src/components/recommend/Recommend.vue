<template>
   <div class="recommed-box"> 
  <div class="searchHeader">
            <mt-button class="mt-button" icon="back" @click="back">返回</mt-button>
       <router-link to='/search'>
          <mt-search class="mt-search"  cancel-text="取消" placeholder="搜索"></mt-search>
         </router-link>
      </div>

     <div class="outer">
           <!-- 手风琴  --> 
       <!-- 精选推荐 -->
       <div class="jingxuan" >
           <div class="jingHea">
               <h1 class="title">精选推荐</h1>
               <router-link to='/'>更多</router-link>
           </div>
           <div class="jingPic" >
               <div class="top">
                   <div class="top-left" v-for="(item,i) in childsJingXuan"  :key="'a'+i"  @click="toHref(item.href)">
                       <div>
                           <img :src="imgServer+item.bg" alt="">
                           <p> {{item.item_title}}</p>
                       </div>
                    </div>
                   <div class="top-right clearfix"  >
                       <div class="r1 clearfix" v-for="(item,i) in childsJingXuan1"  :key="'b'+i"  @click="toHref(item.href)">
                          <div class="imgBox">
                              <img :src="imgServer+item.bg" alt="">
                         </div >
                            <p> {{item.item_title}}</p>
                        </div>
                       <div class="r2 " v-for="(item,i) in childsJingXuan2"  :key="'c'+i"  @click="toHref(item.href)">
                            <div class="imgBox">
                                 <img :src="imgServer+item.bg" alt="">
                            </div>
                             <p> {{item.item_title}}</p>
                        </div>
                   </div>
               </div>
               <div class="bottom" v-for="(item,i) in childsJingXuan3"  :key="'d'+i"  @click="toHref(item.href)">
                   <img :src="imgServer+item.bg" alt="">
                   <p>{{item.item_title}} </p>  
               </div>
           </div>
       </div>
       <!-- 推荐列表 -->
        <div class=" bbb">
            <h1 class="title">推荐列表</h1>
            <van-collapse v-model="activeName" accordion class="aaa">
            <div  v-for="(index,i) in list"  :key='i' >
                <!-- 手风琴项目 标题 -->
                <van-collapse-item  class="collapse-pane" :title="index.title" :name="index.id" @click.native="showSpec(index.spec)" >
                           <!-- 手风琴子项目标题展示 -->
                            <div  class="collapse-item" v-for="(item,i) in childs"  :key='i' @click="toHref(item.href)" :style=" randomRgb()">
                                <img src="" alt="">
                                <p class="collapse-item-title">{{item.item_title}}</p> 
                                <!-- <p>{{item.href}}</p> -->
                            </div>
                </van-collapse-item>
            </div>
       </van-collapse>
        </div>
     </div>
   </div>
</template>
<script>
// 图片服务器地址
import {domain} from '../../url.js'
import Search  from '../Search.vue'
export default {
    data(){
        return{
        imgServer:domain.Base_M1_URL,// 图片服务器地址
        activeName:0,
         list:[],
         childs:[],
         childsJingXuan:[],
         childsJingXuan1:[],
         childsJingXuan2:[],
         childsJingXuan3:[],
         value:''
        }
    },
       methods:{
        //    返回  
        back(){this.$router.go(-1)},
         // 随机颜色值
        randomRgb(){
            let R=Math.floor(Math.random()*255);
            let G=Math.floor(Math.random()*255);
            let B=Math.floor(Math.random()*255);
            return{
                color:'#000',
                borderWidth:'2px',
                borderColor:'rgba(' + R + ',' + G + ',' + B + '.5)',
                // marginRight:'5px',
                // textAlign:'left'
            }
        },
            //    手风琴标题展示spec
         showSpec(spec){
            console.log('eeeeeeeeeeeeeee',spec)
        //            this.$router.push(/recommendDetail/+href)
                   let url ="recommendItem_list";
                          let params = {spec:spec};
             let type='get'
             //->调用Java接口的请求服务
             this.reqM1Service(url,params,type).then(
           res => {
                 console.log(res);
                 this.childs=res.data
                        // this.list1=rows
                         console.log('this.childs',this.childs)
             });
         },
        //  去详细
        toHref(href){
         console.log('href0000000000',href)
        this.$router.push(/recommendDetail/+href)
        },
        // 加载地名
             loadRecommend(){ 
            let url ="recommend_list";let params = {};let type='get'
            //->调用Java接口的请求服务
            this.reqM1Service(url,params,type).then(
            res => {
                console.log(res);
                this.list=res.data
                console.log('this.list1', this.list)
            }
            );
        },
        loadJingXuan(){
                //            this.$router.push(/recommendDetail/+href)
                   let url ="recommendItem_list1";
                          let params = {};
             let type='get'
             //->调用Java接口的请求服务
             this.reqM1Service(url,params,type).then(
           res => {
                 console.log(res);
                 this.childsJingXuan=res.data.splice(1,1)
                 this.childsJingXuan1=res.data.splice(2,1)
                 this.childsJingXuan2=res.data.splice(3,1)
                 this.childsJingXuan3=res.data.splice(4,1)
                         console.log('childsJingXuan',this.childsJingXuan)
             });
        },
         
    },
    created(){
        this.loadRecommend()
        this.loadJingXuan()
        // this.loadRecommendItem()
    },
    components:{
        'search':Search
    }
}
</script>
<style scoped>

.recommed-box{
    width: 100%;
    height: auto;
    /* padding: 3px; */
    text-align: left;
}
/* 精选推荐 */
/* .jingxuan{ */
    /* height: 600px; */
    /* border: 1px solid #f00; */
/* } */
.jingPic .top{
    /* display: flex; */
    width: 100%;
    display: inline-flex;
    height: 200px;
}
.top .top-left{
    border: 1px solid #000;
    width: 40%;
    height: 100%;
    margin-right: 2%;
    position: relative;
    display: flex;
    align-items: center;
}
.top-left img{
    width: 100%;
    height: 200px;
    z-index: -1;
}
.top-left p{
   color: #fff;
   z-index: 10;
   position: absolute;
   top: 50%;
   padding:  0 5px;
   font-size: 20px;
}
.top .top-right{
    /* border: 1px solid #000; */
    box-shadow: 2px 2px 2px 2px #ccc;
    width: 60%;
    height: 100%;
}
.r1,.r2{
    width: 100%;
    height: 100px;
    position: relative;
}
/* .r1{    margin-bottom: 4px;} */
.imgBox{
    height: 100px;
    padding-bottom: 4px; 
}
.r1 .imgBox img,.r2 .imgBox img{
    width: 100%;
    height: 100px;
    z-index: -1;
}
.r1 p,.r2 p{
    position: absolute;
    top: 50%;
    left: 30%;
    color: #fff;
}
.bottom{
    width: 100%;
    height: 100px;
    margin-top: 10px;
   position: relative;
}
.bottom img{
    width: 100%;
    height: 100px;
}
.bottom p{
    position: absolute;
    top: 50%;
    left: 40%;
    color: #fff;
    font-size: 20px;

}
.jingHea{
    display: flex;justify-content: space-between;align-items: center;
    }
.bbb{
    display: flex;
    flex-direction: column;
    width: 100%;
}
/* .van-cell{
    border: 1px solid #f00;
    /* height: 40px;  
} */
.van-collapse-item__content {
    padding: 0px;
    color: #969799;
    font-size: 13px;
    line-height: 1.5;
    /* background-color: #f00; */
}
/* 标题 */
.title{
  font-size: 24px;
}
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        /* height: 0; */
        clear:both;
        /* visibility: hidden; */
    }
    /* 返回头部 */
    .searchHeader{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    background: rgb(38,162,255);
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
}
.searchHeader .mt-button{
    background: transparent;
    color: #fff;
    padding: 5px;
}
.searchHeader .mt-search{
   width: 100%;
   height: 100%;
   background: #fff;
}
.outer{
    margin-top: 50px;
}
.mint-search{height: 50px;}
.mint-search >>> .mint-searchbar{
 background-color:#26a2ff;
}
</style>
