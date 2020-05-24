<template>
    <div>
        <h1>搜索界面</h1>
         <!-- 搜索 -->
                <div class="serachHearder">
                    <el-input   class="search"  size="small" placeholder="请输入旅游标题" v-model="searchV">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    <!-- <el-button type="password" @click="centerDialogVisible = true">添加首页项目</el-button> -->
              </div>
                      <!-- 搜索列表显示 -->
            <table class="searchList" >
                <tr>
                    <th>编号</th>
                    <th>标题</th>
                    <th>图片</th>
                    <th style="width:400px">标题描述</th>
                    <th>价格</th>
                    <th>标签</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for='(item,i) in  resultList ' :key="i" >
                    <td>{{item.iid}}</td>
                    <td>{{item.title}}</td>
                    <!-- 图片 -->
                    <td >
                        <img class="pic" :src="imgServer+item.pic" alt="">
                    </td>
                    <td class="desc">{{item.subtitle}}</td>
               
                    <td>{{item.price}}</td>
                    <td>{{item.labela}}、{{item.labelb}}、{{item.labelc}}</td>
                     <td>
                        <el-button type="danger" icon="el-icon-delete"  @click="del(item.iid)" circle>删除</el-button>
                         <el-button type="primary" icon="el-icon-edit" circle  @click="updateShow(item.iid)">修改</el-button>
                         <!-- <el-button type="primary" icon="el-icon-edit" circle @click="centerDialogVisible = true" :data-iid='item.iid'>修改</el-button> -->
                  </td>
                </tr>
              
            </table>
            <table  class="searchList"  v-if="resultList==undefined">
               <tr>没有搜索结果</tr>
            </table>
            
    </div>
</template>
<script>
// 图片服务器地址
import {domain} from '../../../url.js'
export default {
    data(){
        return{
            searchV:'',
            resultList:[],
            imgServer:domain.Base_M1_URL,// 图片服务器地址
        }
    },
    watch:{
        searchV(){
            this.search()
        }
    },
    methods:{
         search(){
                let url ="searchIndex";let params = {value:this.searchV};let type='get'
            this.reqM1Service(url,params,type).then(
            res => { 
                this.resultList=res.data
                console.log('查询结果',this.resultList)
            })
            .catch(err=>{
                console.log('没有查询到结果')
            })
           },
           //   删除
      del(iid){
        this.$confirm('是否删除该旅游地点')
        .then(re=>{
            let url ="indexDel";let params = {iid:iid};let type='get'
                this.reqM1Service(url,params,type).then(
                res => { 
                    console.log(' res删除', res)
                    console.log(' params',params)    
                    this.loadShopItem()
                })
        }).catch(err=>{
            // 取消
        })
        
        
      },
    }
}
</script>
<style scoped>
table{width: 100%}
table th{
   background:  #ccc;
}
table td{
    height: 80px;
    border-bottom: 1px solid #CCC;
}
/* 图片 */
.pic{
    width: 80px;
    height: 80px;
}
.desc{
    text-align: center;
    width: 400px;
    height: 100px;
    overflow:hidden;
text-overflow:ellipsis;
display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:4;
/* (这里是行数 你可以控制你想在第几行末尾多余的显示省略号，之前的文本正常显示) */

}

   .serachHearder{
        text-align: left;
    }
    .search{width: 200px;}
</style>


