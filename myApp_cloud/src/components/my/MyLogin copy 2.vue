<template>
    <div class="my-login-box">
        <!-- 右上角用户设置 -->
       <div class="set">
           <button>
                 <img  src="@../../../static/images/travel.png" alt="" width="30px">
            </button>
           <button @click="showSet">
                 <img  src="@../../../static/images/set.png" alt="" width="30px">
           </button>
       </div>
      
       <!-- 弹出层 -->
       <van-popup v-model="show6" position="right" :style="{ height: '100%',width:'100%' }">
                <!-- 返回 -->
        <mt-header title="用户设置">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"  @click="showSet"></mt-button>
         </mt-header>
         <!-- 用户信息 -->
         <userInfo></userInfo>
       </van-popup>
      <div class="login">
          <!-- 上传头像 -->
          <!-- 用户未登陆显示  头像默认显示图片-->
            <div class="login-no" v-if="uid==''" >
                <!-- <img ref='goodsImg' src="@../../../static/images/huaxue.png" alt="" > -->
                 <div> 匿名用户<router-link to='/login'>去登录</router-link></div>
            </div>
         <!-- 用户登录显示  用户名、数据库头像，数据库没有头像显示默认头像-->
            <div class="login-yes" v-else>
                <!-- 头像存储  -->
                <!-- <img :src="uavator" alt="" class="icc">  -->
                <!-- 数据库中有头像 -->
                <van-uploader v-model="fileList.avator"  :after-read="afterRead"  v-show="show"  :max-count="1" class="sc" >
                    <!-- 默认图片 --> 
                    <!-- <img   v-show="show1" ref='goodsImg' src="@../../../static/images/huaxue.png" alt="" width="50px"> -->
                <div class="icc" v-for="(img,i) in list1" :key='i' v-if="img.avator!==null">
                                <img :src="img.avator" alt=""  ref='goodsImg' >
                </div>
                <!-- 数据库中没有头像，默认显示的图片 -->
                <div v-else class="icc" >
                            <img  class="icc" ref='goodsImg' src="@../../../static/images/huaxue.png"  >
                </div>
                </van-uploader>  
                  <div>
                       嗨！{{uname}}
                  </div>
                   <button @click="this.logout">去注销</button>
            </div> 
      
      </div>
     
    </div>
</template>

<script>
// 图片服务器地址
import {domain} from '../../url.js'
import {mapState,mapMutations,mapActions} from 'vuex'
import userInfo from '../userInfo/UserInfo'
export default {
      inject:['reload'], 
        data(){
        return {
            imgServer:domain.Base_M1_URL,// 图片服务器地址
            list:[],//更新头像用户表
            list1:[],//数据库用户表，查询头像
            show:true,
            show1:true,
            show6:false,/*用户设置弹出层*/
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
        // 注销
        ...mapActions(['logout']),
        showSet(){
            this.show6=true
        },
        // 查询数据库的头像
        imgs(){
              let url ="user/list";
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
    },
    components:{
      'userInfo':userInfo
    }
  
}
</script>

<style scoped>
/* 头部设置 */
.set{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px;
}
.set button{
    border: 0;
    background: transparent;
}
.my-login-box{ 
    width: 100%;
    height: 150px;
    background:  #aff;
    position: relative;
}
.login{
    width: 80%;
    height: 140px;
    background:#fff;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    margin:0 auto;
    box-shadow: 4px 4px 4px 4px #ccc;
    position: absolute;
    top: 50px;
    left: 10%;
    margin-bottom: 40px;
}
.van-uploader{
    margin: 10px auto;
}
.van-uploader__upload {
border-radius: 50px;
}

.icc{
    width: 80px;
    height: 80px;  
    border: 1px solid #f00;     
    border-radius: 50%; 
}
.icc img{
  width: 100%;
  height: 100%;
   border-radius: 50%; 
}
/* 未登录状态 */
/* .login-no{height: 80px;} */
.login-no img{
       width: 100%;
       height: 100%;
       border: 1px solid #f00; 
       border-radius: 50%;  
}
/*登录状态  */
/* .login-yes{

} */
</style>
