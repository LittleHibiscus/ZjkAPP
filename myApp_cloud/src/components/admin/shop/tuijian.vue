<template>
    <div>
        <div class="showItem">
            <!-- 搜索 -->
                <div class="serachHearder">
                    <div @click="search" style="display:inline-block">
                         <el-input   class="search"  size="small" placeholder="请输入内容" v-model="searchV"  @click="search">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-button size="small" type="primary" icon="el-icon-search" >搜索</el-button>
                    </div>
                   
                    <el-button type="password" @click="centerDialogVisible = true">添加首页项目</el-button>
              </div>
              <!-- 添加首页项目 -->
                <el-dialog title="添加首页项目" :visible.sync="centerDialogVisible" width="30%" center>
                    <!-- <span>需要注意的是内容是默认不居中的</span> -->
                               <div >
                     <!-- <div v-for="(item,i) of shopList"  :key="'a'+i"> -->
                          <div class="title">
                             标题<input type="text" placeholder="标题" v-model="title" value="item.title">
                         </div>
                             <div class="pic">图片
                                <el-upload
                            class="avatar-uploader"
                            :action="imgServer+'upload'"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                         </div>
                          <div >
                              描述<el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="subtitle">
                                </el-input>
                         </div>
                         <div class="title">
                              价格<input type="text" placeholder="标题" v-model="price" >
                         </div>
                         <div class="title">
                              标签1<input type="text" placeholder="标签1" v-model="labela" >
                         </div>
                         <div class="title">
                              标签2<input type="text" placeholder="标签2" v-model="labelb" >
                         </div>
                         <div class="title">
                              标签3<input type="text" placeholder="标签3" v-model="labelc" >
                         </div>
                
                     </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="ok">确 定</el-button>
                    </span>
              </el-dialog>
              <!-- 修改首页项目 -->
                  <el-dialog title="修改首页项目" :visible.sync="centerDialogVisibleUpdate" width="30%" center>
                    <!-- <span>需要注意的是内容是默认不居中的</span> -->
                               <div >
                     <!-- <div v-for="(item,i) of shopList"  :key="'a'+i"> -->
                          <div class="title"  >
                             标题<input type="text" placeholder="标题" v-model="title1" >
                            
                         </div>
                             <div class="pic">图片
                                <el-upload class="avatar-uploader" :action="imgServer+'upload'" :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            原来的图片
                             <img :src="pic2" alt="" style="width:80px,height:80px">
                         </div>
                          <div >
                              描述<el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="subtitle1">
                                </el-input>
                         </div>
                         <div class="title">
                              价格<input type="number" placeholder="价格" v-model="price1" >
                         </div>
                         <div class="title">
                              标签1<input type="text" placeholder="标签1" v-model="labela1" >
                         </div>
                         <div class="title">
                              标签2<input type="text" placeholder="标签2" v-model="labelb1" >
                         </div>
                         <!-- <div class="title">
                              标签3<input type="text" placeholder="标签3" v-model="labelc" >
                         </div> -->
                
                     </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="update">确 定</el-button>
                    </span>
              </el-dialog>
           <!-- 表格显示 -->
        
            <table>
                <tr>
                    <th>编号</th>
                    <th>标题</th>
                    <th>图片</th>
                    <th style="width:400px">标题描述</th>
                    <th>价格</th>
                    <!-- <th>状态</th> -->
                    <th>操作</th>
                </tr>
                <tr v-for='(item,i) in shopList' :key="i">
                    <td>{{item.id}}</td>
                    <td>{{item.item_title}}</td>
                    <!-- 图片 -->
                    <td >
                        <img class="pic" :src="imgServer+item.bg" alt="">
                    </td>
                    <td class="desc">{{item.subtitle}}</td>
               
                    <td>{{item.adult}}</td>
                     <td>
                        <el-button type="danger" icon="el-icon-delete"  @click="del(item.iid)" circle>删除</el-button>
                         <el-button type="primary" icon="el-icon-edit" circle  @click="updateShow(item.iid)">修改</el-button>
                         <!-- <el-button type="primary" icon="el-icon-edit" circle @click="centerDialogVisible = true" :data-iid='item.iid'>修改</el-button> -->
                  </td>
                </tr>
            </table>
 

            <!-- 分页 -->
            <div id="pagepos">
                    <el-pagination 
                        background
                        layout="prev, pager, next"
                        @current-change="currentPage"
                        :total="totalPage">
                    </el-pagination>
           </div>
        </div>      
    </div>
</template>
<script>
// 图片服务器地址
import {domain} from '../../../url.js'
export default {
    data(){
        return{
            shopList:[],//首页全部
            shopList1:[],//首页全部iid
            imgServer:domain.Base_M1_URL,// 图片服务器地址
            searchV:'',
            centerDialogVisible: false,//首页项目添加显示判断
            centerDialogVisibleUpdate:false,//首页修改
            // 插入的首页信息
            title:'',
            subtitle:'',
            pic:'',
            price:'',
            // href:'' 
            labela:'',
            labelb:'',
            labelc:'',
            imageUrl: '',
            List:[],
            imageUrl666:[],  //保存到数据库的图片
            // 修改的首页信息
            // upList:[
            //     {  
                     title1:'',
                    subtitle1:'',
                    pic1:'',
                    pic2:'',
                    price1:'',
                    labela1:'',
                    labelb1:'',
            // }
            // ],
            iid:'',//首页指定iid
            tableData: [],  //当前页码表格数据
            pno:1,//页码pageNo
            ps:5,//页大小pageCount
             currentNo:1,//当前页码
             allData:[],//全部数据
            totalPage:1,//总页码
             resultList:[],//查询结果
             upList:[]

   
        }
    },
    methods:{
        // 搜索
           search(){
               this.$router.push('/searchList')
                // let url ="searchIndex";let params = {value:this.searchV};let type='get'
                // this.reqM1Service(url,params,type).then(
                // res => { 
                //     this.resultList=res.data
                //     console.log('查询结果',this.resultList)
                // })
           },
          //获取总页数
    getPageTotal(){
           let url ="recommendItem_list1";let params = {};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
            this.allData=res.data
             console.log('全部推荐页', this.allData)
              this.totalPage = Math.ceil(this.allData.length / this.ps) * 10;
                console.log('总页数',Math.ceil(this.allData.length / this.ps));
         })
    },
       //当前页数据
    currentPage(currentPage){
      this.currentNo = currentPage;
      console.log( this.currentNo)
        this.loadShopItem(this.currentNo)
    },
    //获取序号
    indexMethod(index){
      return (this.currentNo -1) * this.ps + index + 1;
    },

        // 加载首页
        loadShopItem(index){
          this.pno=index||this.pno
           let url ="recommendItem_list1_page";let params = {pno:this.pno,ps:this.ps};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
             console.log('recommendItem_list1分页',res.data)
             this.shopList=res.data
         });
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
    //   添加首页项目
      ok(){
            console.log('插入')
            let url ="indexInsert";
            let params = {
                title:this.title,
                subtitle:this.subtitle,
                pic:this.imageUrl666,
                price:this.price,
                labela:this.labela,
                labelb:this.labelb,
                labelc:this.labelc,
                };let type='get'
            this.reqM1Service(url,params,type).then(
            res => { 
                this.List=res
                console.log(' this.List', this.List)
                console.log(' params',params)  
                this.loadShopItem()  
                 this.$confirm('添加成功')
            }) 
            this.centerDialogVisible=false
      },
     //  修改首页项目-状态与数据的获取
         updateShow(iid){
                this.centerDialogVisibleUpdate=true
                this.iid=iid
                let url ="index_iid";let params = {iid};let type='get'
            this.reqM1Service(url,params,type).then(
            res => { 
                console.log('shopListt1111',res.data)
                this.upList=res.data
                this.shopList1=res.data
                this.title1=res.data[0].title
                this.subtitle1=res.data[0].subtitle
                this.imageUrl666=res.data[0].pic
                this.pic2=res.data[0].pic
                // this.pic1=res.data[0].pic
                this.price1=res.data[0].price
                this.labela1=res.data[0].labela
                this.labelb1=res.data[0].labelb
                //  更新
                this.loadShopItem()
                console.log('更新操作',)
            })

         },
        //  修改首页项目
         update(){
                //  用户之前信息
                var title1=this.title1
                var subtitle1=this.subtitle1
                var pic1= this.imageUrl666
                var price1= this.price1
                var labela1= this.labela1
                var labelb1= this.labelb1
                // console.log('uname1',uname1)
                        //  更新
                        let url ="indexUpdate";let type='get'
                        let params = 
                        {title:title1,
                        iid:this.iid,
                        subtitle:subtitle1,
                        pic:pic1,
                        price:price1,
                        labela:labela1,
                        labelb:labelb1
                        };
                        console.log('参数',params)
                    this.reqM1Service(url,params,type).then(
                    res => { 
                        console.log('res',res)
                        this.centerDialogVisibleUpdate=false
                        this.loadShopItem()
                         this.$confirm('修改成功')
                    })
         },
    //   处理图片
        handleAvatarSuccess(res, file) {
            // this.imageUrl1= FileReader.readAsDataURL()
            this.imageUrl = URL.createObjectURL(file.raw);
        
            console.log('this.imageUrl',this.imageUrl)
            var url=res.url
            console.log('res',res)
            this.imageUrl666 = 'upload/'+res.name;

      },
         beforeAvatarUpload(file) {
            this.file = file;
            console.log(this.file)
        },
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
      },

    
    },
    created(){
        this.loadShopItem()
        this.getPageTotal()
        // this.getData()
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
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  /* 新增的输入框 */
.title{
    margin-bottom: 20px;
    padding: 3px;
}
.title input{
    border-bottom: 1px solid #ccc;
    text-indent: 20px;
    font: normal 14px/30px bold;
    padding: 3px;
}
</style>

