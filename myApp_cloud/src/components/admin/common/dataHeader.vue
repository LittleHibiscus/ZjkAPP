<template>
    <div class="header">
        <div class="tit">后台管理系统</div>
        <div class="user">
            <!-- <button  @click="logoutAdmin1">退出</button> -->
             <el-button size="small" type="primary"  @click="logoutAdmin1">退出</el-button>
            <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    用户信息<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">个人中心</el-dropdown-item>
    <!-- <el-dropdown-item command="b">退出</el-dropdown-item> -->
  </el-dropdown-menu>
</el-dropdown>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    methods: {
        ...mapActions(['logoutAdmin']),
      handleCommand(command) {
        // this.$message('click on item ' + command);
        this.$router.push('/userCenter')
      },
      logoutAdmin1(){
          this.$confirm('是否退出')
          .then(res=>{
               this.logoutAdmin()
               this.$router.push('/admin')
          }).catch(err=>{

          })
      }
    }
  }
</script>

<style scoped>
.header{
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(#A1FFCE,#FAFFD1)
}
.header .tit{
  font-size: 24px;
}
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
