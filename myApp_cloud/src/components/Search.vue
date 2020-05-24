<template>
    <div>
          <div class="search">
             <button @click="back"  >返回</button>
             <van-search  v-model.trim="keyword" placeholder="请输入搜索关键词" />
             <button @click="search" >搜索</button>
             <!-- <button @click="fetchData" >搜索</button> -->
          </div>
                  <!-- 推荐页模糊查询 -->
          <ul>
              <li v-for='(item,i) in resultList1 ' :key="'a'+i" >
                  <div @click="goDetailRecommed(item.href)" v-html="item.item_title"></div>
              </li>
          </ul>
          <!-- 首页信息模糊查询 -->
          <ul>
              <li v-for='(item,i) in resultList ' :key="i" >
                  <div @click="goDetail()" :data-iid='item.iid' :class="bright?bright:''" v-html="item.title">{{item.title}}</div>
              </li>
          </ul>
          <h2 v-if='isShowTip1&&isShowTip'>没有搜索到匹配结果</h2> 
         
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
            // fetchData(){
            //     if(this.keyword!==''){
            //         console.log(`搜索${this.keyword}相关的内容`)
            //     }
            //     var url='searchRecommed'
            //     var params={value:this.keyword}
            //     var type='get'
            //     this.reqM1Service(url,params,type)
            //     .then(res => {
            //       console.log('查询',res);
            //       var rows1=this.list1.concat(res.data)
            //       this.list1=rows1
            //        console.log('this.list1',this.list)
            //    })
            // },
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
            this.loadRecommed()
            this.loadIndex()                
       },
       //搜索出的文字高亮显示
         brightKeyword (val) {
                let keyword = this.keyword
                if (val.indexOf(keyword) !== -1) {
                    return val.replace(keyword,`<font color='#f00'>${keyword}</font>`)
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
    // 加载首页列表
    loadIndex(){
                this.resultList=[];//推荐页关键字结果集
                //推荐页数据  
                var url='searchIndex'
                var params={value:this.keyword}
                var type='get'
                this.reqM1Service(url,params,type).then(
                 res => {
                //   console.log('查询',res);
                //   从数据库中查询到的关键字保存到结果数据
                 this.resultList=res.data
                  if(res.code==404){
                            //没有匹配结果，就显示提示消息为true
                            this.isShowTip=true
                  }else{
                         this.isShowTip=false
                 var rows=this.resultList
                //   this.list1=rows1
                   console.log('this.list1',this.list)
                   console.log('row1',rows)
                //      for(var key1 in rows1){
                //          //    有关键字
                //         var result=this.resultList1.push(rows1[key1])
                //         this.isShowTip1=false  
                //   }
            //将得到的每一条数据中的每一个字段进行处理,brightKeyword就是变高亮的方法
                            this.resultList.map((item1) => {  //遍历
                            item1.title = this.brightKeyword(item1.title)
                        })
                  }
               
         })
         .catch(err=>{
               
               })
    },
    // 加载推荐页列表
    loadRecommed(){
          this.resultList1=[];//推荐页
                //推荐页数据  
                var url='searchRecommed'
                var params={value:this.keyword}
                var type='get'
                this.reqM1Service(url,params,type).then(
                 res => {
                  console.log('查询',res);
                //   从数据库中查询到的关键字保存到结果数据
                 this.resultList1=res.data
                  if(res.code==404){
                            //没有匹配结果，就显示提示消息为true
                            this.isShowTip1=true
                  }else{
                           this.isShowTip1=false
                 var rows1=this.resultList1
                //   this.list1=rows1
                   console.log('this.list1',this.list1)
                   console.log('row1',rows1)
                //      for(var key1 in rows1){
                //          //    有关键字
                //         var result=this.resultList1.push(rows1[key1])
                //         this.isShowTip1=false  
                //   }
            //将得到的每一条数据中的每一个字段进行处理,brightKeyword就是变高亮的方法
                            this.resultList1.map((item1) => {  //遍历
                            item1.item_title = this.brightKeyword(item1.item_title)
                        })
                  }
              
         })
         .catch(err=>{
               
               })
    }
       },
//    首先先得到数据，在created
   created(){
    //    this.loadIndex()
    //    this.loadRecommed()
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
 border-bottom: 1px solid #ccc;
 display: flex;
 justify-content: start;
 align-items: center;
 padding-left: 20px;
}
.bright{
    color: #f00
}
</style>


