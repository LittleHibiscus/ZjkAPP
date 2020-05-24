<template>
    <div class="user">
      <h1>订单管理</h1>
           <div class="serachHearder">
               <el-input   class="search"  size="small" placeholder="请输入内容" v-model="search">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
               <!-- <el-button type="password" @click="centerDialogVisible = true">添加用户</el-button> -->
          </div>
      <div>
          <el-tabs type="border-card">
                <el-tab-pane label="全部订单">
                    <!-- 全部订单 -->
                        <table>
                            <tr>
                                <th>用户id</th>
                                <th>标题</th>
                                <th>图片</th>
                                <th>总价</th>
                                <th>订单时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,i) of list" :key='i'>
                                <td>{{item.uid}}</td>
                                <td>{{item.title}}</td>
                                <td><img :src="imgServer+item.img" alt="" style="width:100px"></td>
                                <td>{{item.totalprice}}</td>
                                <td>{{item.createtime | fifterTime}}</td>
                                <td>  <p v-if="item.orderState==1">
                                    <van-button type="primary" size="mini">已支付</van-button>
                                </p>
                                <p v-else>
                                    <van-button type="warning" size="mini">未支付</van-button>
                                    </p></td>
                                <td>
                                        <el-button type="danger" icon="el-icon-delete"  @click="delUser(item.uid)" circle>删除</el-button>
                                        <el-button type="primary" icon="el-icon-edit" circle>修改</el-button>
                                </td>
                            </tr>
                        </table>
                </el-tab-pane>
                <el-tab-pane label="已支付">
                    <!-- 已经支付 -->
                        <table>
                            <tr>
                                <th>用户id</th>
                                <th>标题</th>
                                <th>图片</th>
                                <th>总价</th>
                                <th>订单时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            <!-- 修改item.orderState==1，已经支付 -->
                            <tr v-for="(item,i) of list" :key='i' v-if="item.orderState==1">
                                <td>{{item.uid}}</td>
                                <td>{{item.title}}</td>
                                <td><img :src="imgServer+item.img" alt="" style="width:100px"></td>
                                <td>{{item.totalprice}}</td>
                                <td>{{item.createtime | fifterTime}}</td>
                                <td>  <p v-if="item.orderState==1">
                                    <van-button type="primary" size="mini">已支付</van-button>
                                </p>
                                <p v-else>
                                    <van-button type="warning" size="mini">未支付</van-button>
                                    </p></td>
                                <td>
                                        <el-button type="danger" icon="el-icon-delete"  @click="delUser(item.uid)" circle>删除</el-button>
                                        <el-button type="primary" icon="el-icon-edit" circle>修改</el-button>
                                </td>
                            </tr>
                        </table>
                </el-tab-pane>
                <el-tab-pane label="未支付">
                        <!-- 未支付 -->
                        <table>
                            <tr>
                                <th>用户id</th>
                                <th>标题</th>
                                <th>图片</th>
                                <th>总价</th>
                                <th>订单时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            <!-- 修改item.orderState==1，已经支付 -->
                            <tr v-for="(item,i) of list" :key='i' v-if="item.orderState==0">
                                <td>{{item.uid}}</td>
                                <td>{{item.title}}</td>
                                <td><img :src="imgServer+item.img" alt="" style="width:100px"></td>
                                <td>{{item.totalprice}}</td>
                                <td>{{item.createtime | fifterTime}}</td>
                                <td>  <p v-if="item.orderState==1">
                                    <van-button type="primary" size="mini">已支付</van-button>
                                </p>
                                <p v-else>
                                    <van-button type="warning" size="mini">未支付</van-button>
                                    </p></td>
                                <td>
                                        <el-button type="danger" icon="el-icon-delete"  @click="delUser(item.uid)" circle>删除</el-button>
                                        <el-button type="primary" icon="el-icon-edit" circle>修改</el-button>
                                </td>
                            </tr>
                        </table>
                </el-tab-pane>
         </el-tabs>  
      </div>
      <div>
     
      
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
      </div>
    </div>
</template>
<script>
// 图片服务器地址
import {domain} from '../../../url.js'
import fifterTime from '../../../assets/js/fifter.js'
  export default {
    data() {
      return {
           imgServer:domain.Base_M1_URL,// 图片服务器地址
        userList:[],
        list:[],
      centerDialogVisible: false,
      search:'',
      uname:'',
      upwd:''
      };
    },
     // 时间戳过滤器
      	filters: {
			fifterTime(time) {
				let date = new Date(time)
                return fifterTime(date, 'yyyy-MM-dd hh:mm')
                console.list('fifterTime',fifterTime)
			}
		},
    methods: {
        // 加载用户列表
        loadCart(){
                let url='cart/userOrderListAll';let params={};let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    console.log('userOrderList',res.data);
                    // this.list=res.data;
                    // console.log('indexdetail_list',this.list)
                   this.list=res.data
                    this.status=res.data.orderStatus
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
        this.loadCart()
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


