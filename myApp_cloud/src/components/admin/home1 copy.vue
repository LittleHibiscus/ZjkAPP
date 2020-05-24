<!--这个组件主要用来研究upload这个elementui的上传插件组件-->

<template>



    <div>
        <el-upload
  class="avatar-uploader"
  :action="imgServer+'upload'"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
111
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>

</template>



<script>
    // 图片服务器地址
import {domain} from '../../url.js'
  export default {
    data() {
      return {
        imageUrl: '',
         imgServer:domain.Base_M1_URL,// 图片服务器地址
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log('this.imageUrl',this.imageUrl)
        console.log('file',file)
        console.log('file',res.url.toString())
      },
         beforeAvatarUpload(file) {
          this.file = file;
          console.log(this.file)
        },

    //     	upData(){
	// 	  let formData = new FormData();
    //       formData.append('head', this.file);
    //       console.log('upDate',formData)
	// 			//第一个参数是键   第二个是值
	// 		//然后在这里发送请求   如果还有其他参数 	继续append    	
	
	// }

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style <style scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>