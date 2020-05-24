<template>
    <div>
          <div class="search">
             <button @click="back"  >返回</button>
             <van-search  v-model.trim="keyword" placeholder="请输入搜索关键词" />
             <button @click="search" >搜索</button>
          </div>
          <!-- 首页信息模糊查询 -->
          <ul>
              <li v-for='(item,i) in resultList ' :key="i" >
                <!-- <router-link to='' v-if="search=''">{{item.title}}</router-link>  -->
                  <div @click="goDetail()" :data-iid='item.iid' :class="bright?bright:''">{{item.title}}</div>
                  <!-- <font>{{item.title}}</font> -->
              </li>
          </ul>
          <!-- 推荐页模糊查询 -->
          <ul>
              <li v-for='(item,i) in resultList1 ' :key="i" v-if="resultList!==''">
                  <font @click="goDetailRecommed(item.href)" >{{item.item_title}}</font>
              </li>
          </ul>
          <h2 v-if='isShowTip1&&isShowTip==true'>没有搜索到匹配结果</h2> 
         
    </div>
</template>
<script>
export default {
   data(){
       return{
           keyword:'',//与输入框绑定的变量
           list:[],//调用首页的全部数据
           list1:[],//调用推荐页的全部数据
           resultList:[],//真正展示的数据，也就是筛选后的数据
           resultList1:[],//真正展示的数据，也就是筛选后的数据
           isShowTip:false,//当搜索不到数据时为true，显示没有搜索到匹配结果
           isShowTip1:false,//当搜索不到数据时为true，显示没有搜索到匹配结果
           bright:{
              color:'#f00'
           },
       }
   } ,
    watch: {
        //watch title change
        // title() {
        // delay(() => {
        // this.fetchData();
        // console.log(this.value)
        // }, 300);
        // }
        // value(){
        //     this.fetchData()
        // }
        // 只要value值发生变化,就自动执行，调用按钮的搜索方法
        // value(){
        //     setInterval(() => {
        //   this.fetchData()
        
        // }, 3000);
        // }
        keyword(){
            this.search()
        }
    },
    computed:{
        
    },
   methods:{
        //     fetchData(){
        //         if(this.value.trim()!==''){
        //             console.log(`搜索${this.value.trim()}相关的内容`)
        //         }
        //         var url='searchIndex'
        //         var params={value:this.value}
        //         var type='get'
        //         this.reqM1Service(url,params,type).then(
        //          res => {
        //           console.log('查询',res);
        //         //   var rows=this.list.concat(res.data)
        //         //   this.list=rows
        //         //    console.log('this.list',this.list)
        //  }
        // );
        //     }
        // 搜索
        // 返回
        back(){
            this.$router.go(-1)
        },
        // 失去焦点
        search(){
            //如何没有输入内容，不往下执行
            if(this.keyword.trim()==''){return;}
            // 每次搜索都要对结果数组做初始化
            this.resultList=[]
            this.resultList1=[]
            // 把初始数据list[]进行遍历
            // this.list.forEach((item)=>{
            // //下面是把初始数据中的每一条数据的多个字段和输入的内容进行匹配
            // // 如果某一字段中包换输入的内容，就往resultList中加
            //    if(item.title)
            // })
            for(var key in this.list){
               if(this.list[key].title.indexOf(this.keyword)>-1){
                   var result=this.resultList.push(this.list[key])
                   this.bright=true
                    // this.list[key].title=this.brightKeyword(this.list[key].title)
                     console.log('resultList',this.resultList)
                     this.isShowTip=false
              
               }else if(this.resultList.length===0){
                 //没有匹配结果，就显示提示消息为true
                 this.isShowTip=true
               }
            }       
            for(var key in this.list1){
               if(this.list1[key].title.indexOf(this.keyword)>-1){
                //    有关键字
                   var result=this.resultList1.push(this.list1[key])
                   this.bright=true                  
                   result=this.brightKeyword(this.list1[key].item_title)
                   console.log('result',result) 
                           // 匹配关键字正则
                 let replaceReg = new RegExp(result, 'g');
                // 设置查询结果h1不显示
                  this.isShowTip1=false
               }else if(this.resultList1.length===0){
                 //没有匹配结果，就显示提示消息为true
                 this.isShowTip1=true
               }
            } 
               console.log('resultList',this.resultList1)      
               console.log('result',result)      
       },
       //搜索出的文字高亮显示
         brightKeyword (val) {
      let keyword = this.keyword
      if (val.indexOf(keyword) !== -1) {
        return val.replace(keyword,`<font color='#ccc'>${keyword}</font>`)
      } else {
        return val
      }
    },
    //    去详情--首页里的
    goDetail(){
        var iid=event.target.dataset.iid
        console.log('点击了几号商品',iid)
        this.$router.push('/indexDetail/'+iid)

    },
    // 推荐页里的详情
    goDetailRecommed(href){
         this.$router.push(`/recommendDetail/${href}`)
    },
    loadIndex(){
         //   加载首页项目
     let url = "indexItem";
    let params = {
    };
    let type='get'
    //->调用Java接口的请求服务
    this.reqM1Service(url,params,type).then(
      res => {
        console.log('查询搜索全部结果6666',res);
        this.list=res.data
        //   var rows=this.search.concat(res.data)
        //         this.search=rows
        //         console.log('this.search[]',this.search)
      });
    },
    loadRecommed(){
    let url = "recommendItem_list1";
    let params = {
    }
    let type='get'
    //->调用Java接口的请求服务
    this.reqM1Service(url,params,type).then(
      res => {
        console.log('查询搜索全部结果6666推荐列表',res);
        this.list1=res.data
        //   var rows=this.search.concat(res.data)
        //         this.search=rows
        //         console.log('this.search[]',this.search)
      });
    }
       },
//    首先先得到数据，在created
   created(){
       this.loadIndex()
       this.loadRecommed()
   }

}
</script>
<style scoped>
.search{
    width: 100%;
    display: flex;
    align-items: center;
}
.search button{
    width: 15%;
    border: none;
    padding: 3px;
    background: linear-gradient(#c0c0aa,#1cefff);
    opacity: 0.8;
    color: #000;
}
.van-search{
    width: 70%;
}
ul{
    width: 100%;
}
ul li div{
 width: 100%;
 height: 50px;
 border: 1px solid slategrey;
 display: flex;
 justify-content: start;
 align-items: center;
 padding-left: 20px;
}
.bright{
    color: #f00
}
</style>


