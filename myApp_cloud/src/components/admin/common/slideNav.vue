<template>
   <div class="nav">
       <!-- 左侧手风琴部分 -->
      <div class="nav-left">
            <el-row class="tac">
            <el-col :span="12">
                <el-menu
                default-active="echars" 
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                text-color="#000"
                active-text-color="#ffd04b"
                router unique-opened>
                <el-menu-item index="echars" active>
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>旅游项目管理</span>
                    </template>
                    <el-menu-item-group>
                    <!-- <template slot="title">旅游项目管理</template> -->
                    <el-menu-item index="shopItem" class="aaaa">首页旅游项目</el-menu-item>
                    <el-menu-item index="tuijian">推荐页</el-menu-item>
                    <el-menu-item index="shopComment">项目评论</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>旅游订单管理</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="adminOrder" class="aaaa">全部订单</el-menu-item>
                    <!-- <el-menu-item index="dataHeader">选项2</el-menu-item> -->
                    </el-menu-item-group>

                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                    </template>
                    <!-- 用户管理 -->
                    <el-menu-item-group>
                    <!-- <template slot="title">用户列表</template> -->
                    <el-menu-item index="userList" class="aaaa">用户列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>系统管理</span>
                    </template>
                    <!-- 用户管理 -->
                    <el-menu-item-group>
                    <!-- <template slot="title">用户列表</template> -->
                    <el-menu-item index="adminReg" class="aaaa">管理员列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- <el-menu-item index="adminReg">
                     <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">管理员管理</span>
                      </template>
                </el-menu-item> -->
                </el-menu>
            </el-col>
       </el-row>
      </div>
      <!-- 内容 -->
     <div class="center-msg">
        <router-view></router-view>
     </div>
   </div>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
  .el-col-12 {
    width: 100% !important;
}
.nav{
    width: 100%;
    /* border: 1px solid #f00; */
    display: flex;
    justify-content: start;
     /* width:300px;  */
}
.el-menu{
         background: linear-gradient(#A1FFCE,#FAFFD1) !important;
}
.center-msg{
    /* margin-left: 20px; */
    /* text-align: center; */
    width: 100%;
}

</style>

