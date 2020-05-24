<template>
    <div class="user">
      <h1>用户列表</h1>
      <div>
          <div class="serachHearder">
               <el-input   class="search"  size="small" placeholder="请输入内容" v-model="search">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
               <el-button type="password" @click="centerDialogVisible = true">添加用户</el-button>
          </div>
          <!-- 弹出添加用户 -->
           <el-dialog
                    title="提示"
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center>
            <!-- <span>需要注意的是内容是默认不居中的</span> -->
            <div class="username">
                请输入用户名<input type="text" placeholder="用户名" v-model="uname">
            </div>
            <div class="username">
                请输入密码<input type="password" placeholder="密码" v-model="upwd">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </span>
         </el-dialog>
          <!-- 弹出修改用户 -->
           <el-dialog
                    title="修改用户信息"
                    :visible.sync="centerDialogVisibleUpdate"
                    width="30%"
                    center>
            <!-- <span>需要注意的是内容是默认不居中的</span> -->
             <!-- <div v-for="(item,i) in userList1" :key="'uid'+i"> -->
                 <div class="username">
                请输入用户名<input type="text" placeholder="用户名"  v-model="uname1"  />
            </div>
            <div class="username">
                请输入密码<input type="password" placeholder="密码" v-model="upwd">
            </div>
             <!-- </div> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisibleUpdate = false">取 消</el-button>
                <el-button type="primary" @click="update()">确 定</el-button>
            </span>
         </el-dialog>
          <table>
              <tr>
                  <th>uid</th>
                  <th>用户名</th>
                  <th>操作</th>
              </tr>
              <tr v-for='(item,i) in userList' :key="i">
                  <td>{{item.uid}}</td>
                  <td>{{item.uname}}</td>
                  <td>
                        <el-button type="danger" icon="el-icon-delete"  @click="delUser(item.uid)" circle>删除</el-button>
                         <el-button type="primary" icon="el-icon-edit" circle @click="showDia(item.uid)" >修改</el-button>
                  </td>
              </tr>
          </table>
          <!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。 -->
    <!-- <el-table 
    :data="userList"
    style="width: 100%"
    >
        <el-table-column 
        prop="uid"
        label="用户编号"
        width="180">
        </el-table-column>
        <el-table-column
        prop="uname"
        label="用户名"
        width="180">
        </el-table-column>
        <el-table-column
        prop="address"
        label="地址">
        </el-table-column>
            <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="delUser(userList)">删除{{userList.uid}}</el-button>
        </template>
        </el-table-column>
  </el-table> -->

      </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        userList:[],//全部用户
        userList1:[],//uid 指定用户
      centerDialogVisible: false,
      centerDialogVisibleUpdate:false,//修改用户信
      search:'',
      uname:'',
      upwd:'',
      uid:'',//需要修改的uid
      uname1:''
      };
    },
    methods: {
        showDia(uid){
            // 显示弹出层
            this.centerDialogVisibleUpdate=true
                    console.log('修改信息',uid)
                    this.uid=uid
                             let url ="user/list1";let params = {uid};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
             console.log('userList1111',res.data)
             this.userList1=res.data
             this.uname1=res.data[0].uname
            //  更新
             console.log('更新操作',)
         })
        },
        // 加载用户列表
      loadUser(){
          let url ="user/list";let params = {};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
             console.log('userList',res.data)
             this.userList=res.data
         })
      },
    //   删除指定用户
      delUser(uid){ console.log('uid',uid)
          this.$confirm('是否删除该用户')
         
          .then(res=>{
              let url ="user/del";let params = {uid:uid};let type='get'
              this.reqM1Service(url,params,type).then(
                res => { 
                    console.log('删除用户',res.data)
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
    },
    // 修改用户信息
    update(){
         console.log('修改信息777',)
        //  用户之前信息
        var uname1=this.uname1
        // console.log('uname1',uname1)
                //  更新
                let url ="user/list1_update1";let params = {uname:uname1,uid:this.uid};let type='get'
                                console.log('参数',params)
            this.reqM1Service(url,params,type).then(
            res => { 
                console.log('res',res)
                this.centerDialogVisibleUpdate=false
               this.loadUser()
            })
         
    },
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


