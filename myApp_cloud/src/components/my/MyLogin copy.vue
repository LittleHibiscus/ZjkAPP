<template>
    <div class="my-login-box">
      <div class="login">
          <!-- 上传头像 -->
          <!-- 用户未登陆显示 -->
         <div v-if="uid==''" >匿名用户<router-link to='/login'>去登录</router-link>
         <!-- 默认图片 -->
            <img src="/../../../static/images/login.jpeg" alt="" width="50px">
         </div>
         <!-- 用户登录显示 -->
         <div v-else>欢迎{{uname}}和{{uid}}
             <button @click="this.logout">去注销</button>
             <button @click="userInfo">修改个人信息</button>
             <button @click="userInfo">修改头像</button>
             头像存储
            <img :src="uavator" alt="" class="icc">
                   <van-uploader v-model="fileList.avator"  v-show='show'  v-if="uavator==''"
          :after-read="afterRead" :max-count="1" class="sc" />  
         </div> 
         <!-- 头像数据库 
              <div class="icc" v-for="(img,i) in list1" :key='i'>
                <img :src="img.avator" alt="" >
             </div> -->
      </div>
      <!-- 我的收藏 -->
          <ul class="love">
              <li>
                  <router-link to='/myCollect'>
                   <img src="@../../../static/images/love.png" alt="">
                   <p>我的收藏</p>
                  </router-link>
              </li>
              <li>
               <router-link to='/cart'>
                    <img src="@../../../static/images/love.png" alt="">
                <p>我的购物车</p>
               </router-link>
                </li>
              <li><img src="@../../../static/images/love.png" alt=""></li>
            
          </ul>
    </div>
</template>

<script>
// 图片服务器地址
import {domain} from '../../url.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
        data(){
        return {
            imgServer:domain.Base_M1_URL,// 图片服务器地址
            list:[],//用户表
            list1:[],//用户表
            show:true,
            // avator:[],//头像
            fileList:[
            {avator:''},
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://cloud-image', isImage: true }
            ],
            // imgs1:[]
        }
    },
        computed:{
        ...mapState(['uid','uname','uavator']),
    },
    methods:{
        ...mapMutations(['setUname','setUid','setAvator']),
        // 注销
        ...mapActions(['logout']),
        // 修改用户信息
        userInfo(){
            this.$router.push('/userInfo')
        },
        // 查询数据库的头像
        imgs(){
        //    let url ="user/userInfo1";
        //    let params = {};
        //    let type='get'
        //  this.reqM1Service(url,params,type).then(
        //   res => {
        //      this.imgs1=res.data
        //       console.log('99999999', this.imgs1);
        //       }); 
              let url ="user/list";
          let params = {uid:this.uid};
           let type='get'
          this.reqM1Service(url,params,type).then(
           res => {
              this.list1=res.data
              console.log('数据库显示list', this.list);
             }); 
        },
        updateAvator(){
                 // 更新指定用户的头像uid
          let url ="user/userInfo2";
          let params = {
              avator:this.avator,//现在的头像，替换原数据库的头像
              uid:this.uid
              };
          let type='post'
          this.reqM1Service(url,params,type).then(
           res => {
             this.list=res
             console.log('99999999更新头像', this.list);
            
                this.show=true
             });
        },
        // 上传头像
           afterRead(file) {
            this.show=false
            // 此时可以自行将文件上传至服务器
            console.log('file',file);
            const formData = new FormData();  // 声明一个FormData对象
            formData.append("file", file.file);
            //   图片转base64
            //  console.log('filecontent666',file.content.replace(/^data:image\/\w+;base64,/, ''));
            //  var aaa=file.content.replace(/^data:image\/\w+;base64,/, '')
            this.avator=file.content//现在选中的头像
            //  将用户头像保存到LocalStorage中******
            this.setAvator(this.avator||'')

            //  将用户头像添加到数据库，参数头像
            //   let url ="user/userInfo";let params = { avator:this.avator };let type='post'
            //   this.reqM1Service(url,params,type).then(
            //  res => { console.log('avatorres555',res);
            //     //  this.imgs()//数据库用户头像
            //      this.show=false
            //  });
            // --------------查找指定用户名
            //     let url ="user/update";
            //     let params = {uname:this.uname};
            //     let type='get'
            //     this.reqM1Service(url,params,type).then(
            // res => {
            //     this.list=res.data
            //     console.log('查找用户',res);
                this.updateAvator()
                // });
            // ------------------------- 
            
        },
//  注销在vuex
    },
    created(){
         this.imgs()
    }
  
}
</script>

<style scoped>
.my-login-box{ 
    width: 100%;
    /* height: 150px; */
    background: #ccc;
}
.login{
     height: 140px;
    background: #aff;
}
.van-uploader{
    margin: 10px auto;
}
.van-uploader__upload {
border-radius: 50px;
}
.love{
    height: 80px;
    border: 1px solid #f00;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin-top: 20px; */
}
.love li{
    display: flex;
    flex-direction: column;
}
.icc{
    width: 100px;
    height: 100px;  
    border: 1px solid #f00;  
    z-index: 10;    
    border-radius: 50%; 
}
.icc img{
  width: 100%;
  height: 100%;
}
</style>5
