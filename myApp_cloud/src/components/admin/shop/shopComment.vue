<template>
    <div class="user">
      <h1>评论列表</h1>
      <div>
          <div class="serachHearder">
               <el-input   class="search"  size="small" placeholder="输入首页编号/首页标题" v-model="keyword">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
              <el-button size="small" type="primary"  @click="all">全部评论</el-button>
          </div>
           <!-- table显示搜索显示 -->
            <div v-if="resultList.length!==0">
                  <table v-show="listSearch">
                        <tr>
                            <th>序号</th>
                            <th>首页序号</th>
                            <th>首页标题</th>
                            <th>用户名</th>
                            <th>评论内容</th>
                            <th>评论时间</th>
                        </tr>
                        <tr v-for='(item,i) in resultList' :key="i">
                            <td>{{item.id}}</td>
                            <td>{{item.iid}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.uname}}</td>
                            <td>{{item.comment}}</td>
                            <td>{{item.time| fifterTime}}</td>
                        </tr>
                 </table>
            </div>
            <div v-else v-show="listSearch">没有匹配结果</div>
          <!-- table显示 -->
          <table v-show="list">
              <tr>
                  <th>序号</th>
                  <th>首页序号</th>
                  <th>首页标题</th>
                  <th>用户名</th>
                  <th>评论内容</th>
                  <th>评论时间</th>
              </tr>
              <tr v-for='(item,i) in userList' :key="i">
                  <td>{{item.id}}</td>
                  <td>{{item.iid}}</td>
                  <td>{{item.title}}</td>
                  <td>{{item.uname}}</td>
                  <td>{{item.comment}}</td>
                  <td>{{item.time| fifterTime}}</td>
                  <!-- <td>
                        <el-button type="danger" icon="el-icon-delete"  @click="delUser(item.uid)" circle>删除</el-button>
                         <el-button type="primary" icon="el-icon-edit" circle @click="showDia(item.uid)" >修改</el-button>
                  </td> -->
              </tr>
          </table>
      </div>
    </div>
</template>
<script>
import fifterTime from '../../../assets/js/fifter.js'
  export default {
    data() {
      return {
        userList:[],//全部用户
        userList1:[],//uid 指定用户
        keyword:'',
        resultList:[],
        list:true,
        listSearch:false
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
        // 搜索
        search(){
              let url ="commentList_iid1";let params = {value:this.keyword};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
             console.log('查询',res)
             this.resultList=res.data
             this.list=false
             this.listSearch=true
            //  this.userList=res.data
         })
        },
        all(){
            this.listSearch=false;
            this.list=true
        },
        // 加载用户列表
      loadUser(){
          let url ="commentList1";let params = {};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
             console.log('userList',res.data)
             this.userList=res.data
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


