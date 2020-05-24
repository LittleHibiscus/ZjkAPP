<template>
<div class="index-box">
    <!-- 首页头部 -->
    <div class="index-header-bg" :style="backgroundImg">
      <div class="search">
          <!-- 头像与城市 -->
            <div class="avator-position">
                <!-- 头像 -->
             <!-- <img src='@../../../static/images/huaxue.png' alt="" class="icc"> -->
             <!-- 数据库有该用户的头像 -->
                 <div class="icc"   v-for="(img,i) in list1" :key='i' v-if="img.avator!==null">
                    <img   :src="img.avator" alt="" >
                    <!-- <img  v-else src='@../../../static/images/huaxue.png' alt="" class="icc"> -->
                </div>
                 <div class="icc" v-else>
                    <!-- <img    :src="img.avator" alt="" > -->
                    <img src='@../../../static/images/huaxue.png' alt="" >
                </div>

                <!-- 城市 -->
                    <select name="" id="">
                      <option value="">{{LocationCity}}</option>
                    </select>
            </div>
            <!-- 搜索 -->
            <router-link  to='/search'><mt-search v-model="value"   placeholder="搜索"></mt-search> </router-link>
            <!-- 日历 -->
            <div class="weather" @click="wea()" >
                <!-- <button @click="wea()"></button> -->
                <span>{{ date | formaDate }}</span>
            </div>
        </div>
    </div>
    <!-- 首页中部 -->
    <div class="index-center">
        <!-- 自定义轮播图 -->
         <my-swip></my-swip>
         <!-- 中部小图标 -->
        <div class="index-icon">
            <ul>
                <li >
                 <router-link to='/skiSlope'>
                    <img src='@../../../static/images/huaxue.png' alt="" />
                    <p>七大滑雪场</p>
                 </router-link>
                 </li>
                <li >
                 <router-link to='/duJia'>
                    <img src='@../../../static/images/jiudian.png' alt="" />
                    <p>度假村</p>
                 </router-link>
                 </li>
                <li >
                 <router-link to='/zuTuan'>
                    <img src='@../../../static/images/xingcheng.png' alt="" />
                    <p>组团游</p>
                 </router-link>
                 </li>
                <li >
                 <router-link to='/notFound'>
                 <!-- <div @click='news'> -->
                    <img src='@../../../static/images/zhibo.png' alt="" />
                    <p>冬奥咨询</p>
                 <!-- </div> -->
                 </router-link>
                 </li>
            </ul>
        </div>
          <transition name="fade">
            <div v-show="guanggao" class="guanggao">  
                <div class="guanggaoImg">
                     <div class="del" @click="delGuGao">
                         广告
                        <button >×</button>
                     </div>
                     <img  src="@../../../static/images/guanggao.jpg" alt="">
                </div>
                  
                
            </div>
         </transition>
        <!-- 倒计时开始 -->
    <div class="count-down">
          <h1>倒计时</h1>
        <p >
            距冬奥会开幕<span>{{day}}</span>天<span>{{hour}}</span>时<span>{{min}}</span>分
            <span>{{second}}秒</span> 
        </p>                    
    </div> 
       <!-- 倒计时结束 -->
    <!-- 首页项目展示开始 -->
     <div class="index-bottom">
          <div class="index-show"  v-for="(item,i) of list" :key='i' :lid='item.href'>
        <!-- <router-link to='/indexDetail'> -->
       <div class="show-img"  >
          <img :src="imgServer+item.pic" alt="" :style="randomRgb()">
       </div>
       <div class="show-desc">
            <router-link :to="/indexDetail/+item.href">
           <!-- 标题 -->
           <p class="desc-title">{{item.title}}</p>
           <!-- 描述 -->
           <p class="desc">{{item.subtitle}}</p>
           <!-- 标签 --> 
           <p class="label-style">
               <a  class='label' :style="randomRgb()" href="javascript:;">{{item.labela}}</a>
               <a  class='label' :style="randomRgb()" href="javascript:;">{{item.labelb}}</a>
               <!-- <a  class='label' :style="randomRgb()" href="javascript:;">{{item.labelc}}</a> -->
           </p>
           <p class="price">{{item.price}}/起</p>
           </router-link>
       </div>
    </div>
    </div> 
    <!-- 首页展示结束 -->
 </div>
</div>
</template>
<script>
// 引入组件，层级轮播图my-swip
import Swip from '../common/Swip.vue'
import getCurrentCityName from '../../assets/js/getCurrentCityName.js'
// 图片服务器地址
import {domain} from '../../url.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            LocationCity:"正在定位",    //给渲染层定义一个初始值
            imgServer:domain.Base_M1_URL,// 图片服务器地址
            value:'',
            // city:'',//城市
            // 项目展示标签
            // itemLabel:[{name:'滑雪'},{name:'旅游'}],
            // 头部搜索背景图
            backgroundImg:{
             backgroundImage:'url('+require('@../../../static/images/bg1.jpg')+')',
             backgroundSize:'100% 100%',
             backgroundPositon:'top center'
            },
            // 首页数据list
            list:[],
            list1:[],//用户表头像显示
            // pno:0,//页码（第几页数据）
            timer:'',
               curStartTime: '2022/2/4 00:00:00',
                day: '0',
                hour: '00',
                min: '00',
                second: '00',
                date:new Date(),
                guanggao:false,//广告
            }
       },
        computed:{
               ...mapState(['uid','uname','uavator']),
        //计算属性定时器  
        // restTime(){
        //     let setTime=new Date('2022/2/4 00:00:00');
        //     let nowTime=new Date();
        //     let  restSec=setTime.getTime()-nowTime.getTime();//相差的毫秒数
        //     console.log(restSec)
        //     let day=parseInt(restSec/(60*60*24*1000) );
        //     let hour=parseInt(restSec/(60*60*1000)%24)
        //     let minu=parseInt(restSec/(60*1000)%60)
        //     let sec=parseInt(restSec/1000%60);
        //     let str=`${day}天${hour}小时${minu}分钟${sec}秒`;
        //     return {day:day,hour:hour,minu:minu,sec:sec};
        //     return {day:day,hour:hour,minu:minu,sec:sec};
        //     console.log('str',str)
        //     // this.time
        // },
            
    },
    methods:{
        // ...mapMutations(['setUname','setUid','setAvator']),
        // 广告
        guang(){
            setTimeout(()=>{
                this.guanggao=true
            },2000)
        },
        // 删除广告
        delGuGao(){
            this.guanggao=false
        },
        news(){
            location.href='https://www.baidu.com/s?tn=news&rtt=1&bsst=1&wd=2020%E5%86%AC%E5%A5%A5%E6%96%B0%E9%97%BB&cl=2&origin=ps'
        },
         //定义获取城市方法
           city(){   
            const geolocation = new BMap.Geolocation();
            var _this = this
            geolocation.getCurrentPosition(function getinfo(position){
                let city = position.address.city;             //获取城市信息
                let province = position.address.province;    //获取省份信息
                _this.LocationCity = city
                console.log('position',position)
            }, function(e) {
                _this.LocationCity = "定位失败"
            }, {provider: 'baidu'});		
        },
      // 倒计时
        countTime () {
            // 获取当前时间
            let date = new Date()
            let now = date.getTime()
            // 设置截止时间
            let endDate = new Date(this.curStartTime) // this.curStartTime需要倒计时的日期
            let end = endDate.getTime()
            // 时间差
            let leftTime = end - now
            // 定义变量 d,h,m,s保存倒计时的时间
            if (leftTime >= 0) {
                // 天
                this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
                // 时
                let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
                this.hour = h < 10 ? '0' + h : h
                // 分
                let m = Math.floor(leftTime / 1000 / 60 % 60)
                this.min = m < 10 ? '0' + m : m
                // 秒
                let s = Math.floor(leftTime / 1000 % 60)
                this.second = s < 10 ? '0' + s : s
            } else {
                this.day = 0
                this.hour = '00'
                this.min = '00'
                this.second = '00'
            }
            // 等于0的时候不调用
            if (Number(this.hour) === 0 && Number(this.day) === 0 && Number(this.min) === 0 && Number(this.second) === 0) {
                return
            } else {
            // 递归每秒调用countTime方法，显示动态时间效果,
                this.timer=setTimeout(this.countTime, 3000)
            }
        },
      
        wea(){
           console.log('日历')
        }, 
              // 查询数据库的头像
        imgs(){
              let url ="user/list1";
          let params = {uid:this.uid};
           let type='get'
          this.reqM1Service(url,params,type).then(
           res => {
              this.list1=res.data
             }); 
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
            }
        },
        // 获取当前城市
        getCurrentCity() {
            getCurrentCityName().then((city) => {
              console.log(city);  //顺利的话能在控制台打印出当前城市
              this.city=city;
              this.imgs()
            })
        },
        // 加载首页列表
        loadIndex(){
             let url ="indexItem";let params = {};let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    var rows=this.list.concat(res.data)
                            this.list=rows
                            console.log('this.list',this.list)
                })
        },
        // loadIndex(){
        // var url='indexItem'
        // // var  params=''
        //   this.axios.get(
        //         url,
        //         // params
        //     ).then(res=>{
        //         var rows=this.list.concat(res.data)
        //         this.list=rows;
        //         console.log('灰',this.list.data)
        //     })
        // },
 //   var obj={did:this.did}
        //     this.axios.get(
        //         url,{params:obj}
        //     )
        //     .then(res=>{
        //         console.log('index_detail',res);
        //         this.list=res.data.data;
        //         console.log('indexdetail_list',this.list)
        //     })
},
    created(){
        // 加载用户表中数据库的头像
        this.imgs()
        //   倒计时
        this.curStartTime = '2022/2/4 00:00:00'
        this.countTime()
        // 加载首页列表
        this.loadIndex()
        //    this.getCurrentCity();
    },
    mounted() {
        // 加载用户头像信息
        this.imgs(),
        this.city()    //触发获取城市方法
        this.guang()

    },
    beforeDestroy()
  {
     clearTimeout(this.timer)
    this.timer = null;
  },
    // 注册引入的组件，层叠轮播图
    components:{
        'my-swip':Swip,
    },
    //  首页头部日期显示
     filters:{
           //设置一个函数来进行过滤
           formaDate:function(value){
               //创建一个时间日期对象
               var date = new Date();
               var year = date.getFullYear();      //存储年
               var month = date.getMonth()+1;    //存储月份
               var day =date.getDate();         //存储日期
               var week = "星期" + "日一二三四五六".charAt(date.getDay());
            //    var hours = this.padaDate(date.getHours());      //存储时
            //    var minutes = this.padaDate(date.getMinutes());  //存储分
            //    var seconds = this.padaDate(date.getSeconds());  //存储秒
               //返回格式化后的日期
               return year+'年'+month+'月'+day+'日'+week;
           }
       },
  
}
</script>
<style scoped>
.index-box{
    padding: 2px;
    /* height: 2000px; */
}
/* 搜索框 */
.mint-search {
    height: 100%;
}
/* 首页头部 */
.index-header-bg{
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10
 
}
/* 广告 */
.guanggao{
    width: 100%;
    height: 100px; 
}
.guanggaoImg{
    position: relative;
}
.guanggaoImg img{
    width: 100%;
    height: 80px;
}
.guanggaoImg  .del{
    position: relative;
    right: 0; 
    top: 20px; 
    text-align: right;
    color: #000;
    font-weight: bolder;
}
.guanggao  .del button{
    border: none;
    background: transparent;
}
.search{
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    align-items: center;
}
.avator-position{
    width: 33%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/* 头像 */
.avator-position img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1ps solid #f00;
}
.avator-position select{
    /* width: 20%; */
    flex: 1;
    margin-left: 5px
}
.mint-search >>> .mint-searchbar{
 background-color:transparent;
    /* width: 60%; */
}
/* 天气 */
.weather{
    background:url(@/../../../../static/images/blue.jpg);
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* text-align: right; */

}
/* 首页中部 */
.index-center{
    background: #fff;
    margin-top: 60px;
}

/* 轮播图 */
.mint-swipe{
 height: 200px;
 margin-top: 10px
}
.mint-swipe-items-wrap{
 border-radius: 15px;
}
.mint-swipe-items-wrap img{
    max-width: 100%;
    height: auto;
     border-radius: 15px;
   
}
/* 轮播指示器 */
.mint-swipe-indicators /deep/ .mint-swipe-indicator{
    background-color: #f00 ;
    opacity: 1;
}
.mint-swipe-indicators >>> .mint-swipe-indicator.is-active{
    background: #00f;
}
/* 小图标 */
.index-icon{
    margin: 5px 0px;
    /* border: 1px solid skyblue */
}
.index-icon ul{
    display: flex;
    width: 100%;
    flex-wrap: wrap
}
.index-icon ul li{
 width: 22%;
 padding: 5px;
 margin-bottom: 10px;
}
/* 倒计时 */
.count-down{
 width: 100%;
 height: 6 0px;
 /* border: 1px solid #000; */
 display: inline-block;
 background:linear-gradient(to left,#77A1D3,#79CBCA,#E684AE) ;
 padding: 4px;
 background-size: 100%;
 opacity: 0.9;
 font: normal 18px bolder;
 margin-top: 10px;
}
/* .count-down h1{display: inline-block} */
/* .count-down img{
  width: 20px;height: 20px;  
} */
.count-down p span{
   /* background:linear-gradient(#DC2424,#4A569D); */
   background-clip: text;
   font: normal 24px/30px bolder;
   /* color: transparent */
}
.index-bottom{
    width: 100%;
    margin-bottom:50px;
}
/* 首页展示 */
.index-show{
 width: 100%;
 height: 120px;
 border: 1px solid skyblue;
 margin-top: 20px;
 display: flex;
 justify-content: space-between;
 background: url(@/../../../../static/images/blue.jpg) no-repeat ;
background-size: cover;
border-radius: 27%;
box-shadow: 3px 5px 12px rgb(14, 50, 101);
}
.index-show .show-img{
 width: 30%;
 height: 120px;
 border: 1px solid rgb(110, 58, 206);
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
 

 }
  .index-show .show-desc p{
      text-align: left;
      text-indent: 5px;
      padding: 5px;
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
/* 动画过渡 */
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
  height: 80px;
  /* opacity: 0; */
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
}
</style>


