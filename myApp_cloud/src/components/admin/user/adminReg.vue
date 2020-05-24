<template>
    <div class="user">
      <h1>管理员列表</h1>
      <div>
          <div class="serachHearder">
               <el-input   class="search"  size="small" placeholder="请输入内容" v-model="search">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
               <el-button type="password" @click="centerDialogVisible = true">添加管理员</el-button>
          </div>
      
           <el-dialog
             title="管理员注册  "
             :visible.sync="centerDialogVisible"
            width="30%"
            center>
              <div class="login1">        
              <!-- <h1>管理员注册</h1> -->
            <div class="username">
                 用户名<input type="text" v-model='uname1'>
            </div>
            <div class="username">
                密码<input type="password" v-model='upwd1'>
            </div>
             <button @click="reg">注册</button>
         </div>
</el-dialog>
          <table>
              <tr>
                  <th>管理员编号</th>
                  <th>用户名</th>
                  <th>操作</th>
              </tr>
              <tr v-for='(item,i) in userList' :key="i">
                  <td>{{item.aid}}</td>
                  <td>{{item.aname}}</td>
                  <td>
                        <el-button type="danger" icon="el-icon-delete"  @click="delUser(item.aid)" circle>删除</el-button>
                         <el-button type="primary" icon="el-icon-edit" circle>修改</el-button>
                  </td>
              </tr>
          </table>

      </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        userList:[],
      centerDialogVisible: false,
      search:'',
      uname1:'',
      upwd1:''
      };
    },
    methods: {
         // 管理员注册
     reg(){
        var reg=/^(admin)/
        var a=this.uname1
        var str=reg.test(a)
          console.log('正则',reg.test(a))
        if(reg.test(a)){
           let url='user/adminReg'; let params={aname:this.uname1,apwd:this.upwd1 }
           this.reqM1Service(url,params).then(
          res => {
          if(res.code==-2){
               this.$confirm(params.aname+'已经存在')
          }else{
               console.log(res);
                this.$confirm(`管理员${params.aname}注册成功`)
                this.centerDialogVisible=false
                this.loadUser()
  
        console.log(params)
          }
       
      });
        }else{
            this.$confirm('管理员注册必须以admin开头')
        }
  
    },
        // 加载用户列表
      loadUser(){
          let url ="user/adminList";let params = {};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
             console.log('userList',res.data)
             this.userList=res.data
         })
      },
    //   删除指定用户
      delUser(uid){ 
          console.log('uid',uid)
          this.$confirm('是否删除该用户')
          .then(res=>{
              let url ="user/adminDel";let params = {aid:uid};let type='get'
              this.reqM1Service(url,params,type).then(
                res => { 
                    console.log('删除用户',res.data)
                    //  this.userList=res.data
                    this.loadUser()
                })
          })
          .catch(err=>{
              //取消
          })
      },
    //   添加用户确定
     ok(){
          let url='user/reg';let params={uname:this.uname,upwd:this.upwd}
    this.reqM1Service(url,params).then(
      res => {
           if(res.code==-2){
              this.$confirm(params.uname+'已经存在')
              this.uname==''
              this.upwd==''
          }
        console.log(res,res.data);
        console.log(params)
         this.$confirm('用户添加成功！')
        this.loadUser()
      }
    );
       this.centerDialogVisible=false
    }
    },
    created(){
        this.loadUser()
    }
  }
</script>
<style scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  table{
      /* border: 1px solid #000; */
      width: 100%;
      text-align: center;
  }
    table th{
        background: #ddd;
        height: 50px;
    }
    table td{
        border-bottom: 1px solid #ccc;
        height: 50px;
    }
    .username{
        margin-bottom: 30px;
        text-align: left;
        
    }
     .username input{
         text-indent: 20px;
         font-size: 14px;
     }
    .serachHearder{
        text-align: left;
    }
    .search{width: 200px;}
</style>


