<template>
    <div class="my-login-box">
         <!-- 返回 -->
        <mt-header title="修改头像">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
      <div class="login">
         <!-- 用户登录显示  用户名、数据库头像，数据库没有头像显示默认头像-->
       
         <div>
                    <!-- 头像存储  -->
                    <!-- <img :src="uavator" alt="" class="icc" ref='goodsImg' v-show="show1">  -->
                <van-uploader v-model="fileList.avator"  :after-read="afterRead"  :max-count="1" class="sc"  v-show="show">
                    <!-- 默认图片 --> 
                        <!-- <img   v-show="show1" ref='goodsImg' src="@../../../static/images/huaxue.png" alt="" width="50px"> -->
                    <div class="icc" v-for="(img,i) in list1" :key='i' v-if="img.avator!==null">
                        <img :src="img.avator" alt=""  ref='goodsImg' ><!-- 头像数据库  -->
                    </div>
                    <div v-else class="icc" >
                        <img ref='goodsImg' src="@../../../static/images/huaxue.png"  >
                    </div>
                </van-uploader>  
                <div> 用户{{uname}}</div>
         </div> 
      </div>
    </div>
</template>

<script>
// 图片服务器地址
import {domain} from '../../url.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
      inject:['reload'], 
        data(){
        return {
            imgServer:domain.Base_M1_URL,// 图片服务器地址
            list:[],//更新头像用户表
            list1:[],//数据库用户表，查询头像
            show:true,
            show1:true,
            fileList:[
                {avator:''},
            // Uploader 根据文件后缀来判断是否为图片文件
            // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
            { url: 'https://cloud-image', isImage: true }
                ],
        }
    },
        computed:{
        ...mapState(['uid','uname','uavator']),
    },
    methods:{
        ...mapMutations(['setUname','setUid','setAvator']),
        // 查询数据库的头像
        imgs(){
              let url ="user/list1";
          let params = {uid:this.uid};
           let type='get'
          this.reqM1Service(url,params,type).then(
           res => {
              this.list1=res.data
              console.log('数据库显示list', this.list1);
             }); 
        },
        // 上传头像
           afterRead(file) {
            this.show=false
            this.show1=false
            // 此时可以自行将文件上传至服务器
            console.log('file',file);
            const formData = new FormData();  // 声明一个FormData对象
            formData.append("file", file.file);
            //   图片转base64
            //  console.log('filecontent666',file.content.replace(/^data:image\/\w+;base64,/, ''));
            //  var aaa=file.content.replace(/^data:image\/\w+;base64,/, '')
            // 设置上面 ref=goodsImg的照片为默认显示
            this.$refs.goodsImg.src=file.content
            this.avator=file.content//现在选中的头像
            //  将用户头像保存到LocalStorage中******
            this.setAvator(this.avator||'')
            //  将用户头像添加到数据库，参数头像
              let url ="user/userInfo1";let params = { 
                  avator:this.avator,
                  uname:this.uname
                   };
                   let type='post'
              this.reqM1Service(url,params,type).then(
             res => { 
                 console.log('上传头像到user表',res);
                 this.imgs()//数据库用户头像
                 this.show=true
                 this.show1=false
             });
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
.icc{
    width: 100px;
    height: 100px;  
    border: 1px solid #f00;    
    border-radius: 50%; 
}
.icc img{
  width: 100%;
  height: 100%;
  border-radius: 50%; 
}
</style>5
