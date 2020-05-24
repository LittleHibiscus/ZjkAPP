<template>
    <div>
                <!-- 返回 -->
        <mt-header title="评论详情">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
        <!-- 评论详情 -->
        <div v-for="(item,i) in  commentList" :key='i'>
          <div class="each">
              <span>评论人:</span>
              <p>{{item.uname}}</p>
          </div>
          <div class="each">
              <span>评论地点:</span>
              <p>{{item.title}}</p>
          </div>
          <div class="each">
              <span>评论内容:</span>
              <p>{{item.comment}}</p>
          </div>
          <div class="each">
              <span>评论时间:</span>
              <p>{{item.time}}</p>
          </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
            return{
                commentList:[]
            }
        },
        props:['id'],
        methods:{
            // 返回
            back(){this.$router.go(-1)},
            loadCommentList(){
                console.log('p4评论详情')
                let url ="commentList_id1"
                let params = {
                    id:this.id
                }
                let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                  
                    this.commentList=res.data
                      console.log('res评论列表详情',res)
                    for(var key in this.commentList){
                    var transTime=this.commentList[key].time
                    var a=this.timestampFormat(transTime)
                    this.commentList[key].time=a
                    }      
                });
            // this.loadCommentList()

        },
          // 实时时间转换函数、对后台返回出来的时间做处理
            timestampFormat( timestamp ) {
                function zeroize( num ) {
                    return (String(num).length == 1 ? '0' : '') + num;
                }

                var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
                var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

                var curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
                var tmDate = new Date( timestamp * 1000 );  // 参数时间戳转换成的日期对象

                var Y = tmDate.getFullYear()
                var m = tmDate.getMonth() + 1 
                var d = tmDate.getDate();
                var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

                if ( timestampDiff < 60 ) { // 一分钟以内
                    return "刚刚";
                } else if( timestampDiff < 3600 ) { // 一小时前之内
                    // return + "";
                    return `${Math.floor( timestampDiff / 60 ) }分钟前`;
                } else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
                    return '今天' + zeroize(H) + ':' + zeroize(i);
                } else {
                    var newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
                    if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
                        return '昨天' + zeroize(H) + ':' + zeroize(i);
                    } else if ( curDate.getFullYear() == Y ) {
                        return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
                    } else {
                        return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
                    }
                }
            },
        },
        created(){
            this.loadCommentList()
        }
}
</script>
<style scoped>
.each{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
}
</style>

