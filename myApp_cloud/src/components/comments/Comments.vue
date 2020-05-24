<template>
    <!-- 评论 -->
    <div>
          <h1>用户评论{{this.commentList.length}}条</h1>
      <div v-if="uname!==''">
              <div class="commentArea">
            <textarea name="" id="" cols="30" rows="5"
            placeholder="想说什么" v-model='comment' class="input"
            ></textarea>
            <van-button type="info" @click="submit_comment">提交评论</van-button>
            <!-- <button >提交评论</button> -->
        </div>
      
        <div class="comments">
            <div class="comment" v-for="(item,i) in  commentList" :key='i' @click="commentEach(item.id)">
                <img :src="item.avator" alt="">
                <p class="user">用户名:{{item.uname}}</p>
                <p class="commentList">内容：{{item.comment}}</p>
                <!-- <div>{{time}}</div> -->
                <div >{{item.time}}</div>
            </div>
            <img :src="avator" alt="">
        </div>
        <!-- <div v-time='timeNow'></div> -->
        <!-- <button @click="loadCommentList">加载更多评论</button> -->
      </div>
      <div v-else>
          <h1>用户登录才可以评论</h1>
      </div>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
// 时间转换函数
import timestampFormat from '../../assets/js/formatDate.js'
export default {
    data(){
        return{
            comment:'',//与输入框绑定的评论内容
            commentList:[],//发布出的评论列表
            pno:0,//页码（第几页）
            list1:[],
            avator:''
        }
    },
    props:['iid','title'],
        computed:{
        ...mapState(['uname']),
    },
    computed:{
          ...mapState(['uid','uname','uavator']),
    },
    methods:{
        // 提交评论
        submit_comment(){
          console.log('提交评论');
          if(this.comment.trim()==''){
              console.log('评论不能为空')
              return;
          } 
          if(this.uname==''){
             console.log('评论请先登录')
             this.$router.push('/login')
          } 
          this.addComment()        
      },
       imgs(){
              let url ="user/list1";
          let params = {uid:this.uid};
           let type='get'
          this.reqM1Service(url,params,type).then(
           res => {
            //   this.list1=res.data[0].avator
            //   this.avator=this.list1
            //   console.log('用户头像', this.list1)
             }); 
        },
    //   添加评论接口
    addComment(){
        let url ="comment"
        let params = {
            uname:this.uname,
            iid:this.iid,
            title:this.title,
            comment:this.comment,
            time:new Date().getTime()/1000,//获得当前时间，距离计算机元年的毫秒数
        }
        this.reqM1Service(url,params).then(
        res => {
            var a=this.commentList
            a=res
            this.loadCommentList()
            this.comment=''
        }
        );

    },
        // 加载所有评论
        //     loadCommentList(){
        //         let url ="commentList"
        //         // this.pno++;
        //         let params = {
        //             // pno:this.pno
        //         }
        //         let type='get'
        //         this.reqM1Service(url,params,type).then(
        //         res => {
        //             console.log('restttt',res)
        //             this.commentList=res.data
        //             for(var key in this.commentList){
        //             var transTime=this.commentList[key].time
        //             var a=this.timestampFormat(transTime)
        //             this.commentList[key].time=a
        //             }      
        //         });
           
        //     // this.loadCommentList()

        // },
        // 加载评论
             loadCommentList(){
                let url ="commentList_iid"
                // this.pno++;
                let params = {
                    iid:this.iid
                }
                let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log('restttt',res)
                    this.commentList=res.data
                    for(var key in this.commentList){
                    var transTime=this.commentList[key].time
                    var a=timestampFormat(transTime)
                    this.commentList[key].time=a
                    }      
                });
            // this.loadCommentList()

        },
        // 每条评论
        commentEach(id){
          console.log('每条评论',id)
          this.$router.push('/commentEach/'+id)
        },

    },
    created(){
        this.loadCommentList()
        this.imgs()
    }
    
}
</script>
<style scoped>
.commentArea{ 
 /* border: 1px solid rgb(25,137,250);  */
   background: #fff;
 }
 textarea{border: none}
.commentArea button{
    margin-right: 0px;
}
.input{
    width: 100%;
}
/* 评论列表 */
.comments{
  overflow: auto;
  height: 200px;
  
}
/* 每条评论 */
.comment{
    width: 100%;
    height: 50px;
    padding: 3px;
    border-bottom: 1px solid rgb(25,137,250);
  
}
.user{
    text-align: left;
    color: #999;
}
.commentList{
    text-align: left;
}
</style>

