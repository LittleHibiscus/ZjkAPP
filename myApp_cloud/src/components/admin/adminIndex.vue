<template>
   <div>
       <!-- 系统头部 -->
      <dataHeader></dataHeader>
           <!-- 面包屑 -->
       <!-- <el-breadcrumb >
    
      </el-breadcrumb> -->
      <!-- 左侧导航 -->
     <slideNav></slideNav>
     <!-- 右侧内容？？？ -->


   </div>
</template>
<script>
import userList from './user/userList'
import dataHeader from './common/dataHeader'
import slideNav from './common/slideNav'
  export default {
    data() {
      return {
        tabPosition: 'left'
      };
    },
    components:{
      'userList':userList,
      'dataHeader':dataHeader,
      'slideNav':slideNav
    },
    created(){
        this.$router.push('/echars')
    }
  };
</script>
<style scoped>
.content{
    text-align: right;

}
</style>
