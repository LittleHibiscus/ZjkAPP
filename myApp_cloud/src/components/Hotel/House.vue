<template>
    <div>
        <!-- 搜索 -->
        <mt-search v-model="value" cancel-text="取消" placeholder="搜索"></mt-search>
        <h1>food</h1>
        <ul class="shop">
            <li v-for="(item,i) in list" :key="i" >
                <router-link :to="/foodDetail/+item.href+'/'+uid"  >
                <!-- <router-link :to=`/foodDetail/item.href/uid` :uid='uid'> -->
                    <img src="@../../../static/images/item.jpg" alt="">
                    <div class="desc">
                    <p class="shop-desc">{{item.title}}</p>
                    <p class="shop-price"> <span>￥</span>{{item.price}}</p>
                    </div>
                </router-link>
            </li>
      
        </ul>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            value:'',
            list:[],
            uid:sessionStorage.getItem('token')
        }   },
         computed:{
        ...mapState(['uname'])
        },
    methods:{
     ...mapMutations(['setUname']),
    loadFoodIndex(){
            // url
            // var url='foodItem';
            // // 参数 页码
            // // this.pno++;
            // // var obj={pno:this.pno}
            // // axiox请求
            // this.axios.get(url,
            // // {params:obj}
            // )
            // .then(res=>{
            //     console.log('indexitem',res)
            //     // 接收结果并且显示
            //     var rows=this.list.concat(res.data.data)
            //     this.list=rows
            //     console.log('this.list',this.list)
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
            let url = "foodItem"
          let params = {
            //  uid:this.uid
          };
    let type='get'
    //->调用Java接口的请求服务
    this.reqM1Service(url,params,type).then(
      res => {
        console.log(res);
          var rows=this.list.concat(res.data)
                this.list=rows
                console.log('thisfood.list',this.list)
      });
        
    //     },
    },
   
}, created(){
      this.loadFoodIndex();
    
    },

    }
</script>
<style scoped>
.mint-search{height: 50px;}
.mint-search >>> .mint-searchbar{
 background-color:#26a2ff;
}
.shop{
display: flex;
width: 100%;
/* height: 350px; */
border: 1px solid #f00;
justify-content: space-evenly;
flex-wrap: wrap;
}
ul.shop li{
    width: 40%;
    height: 250px;
    border: 2px solid #ccc;
    box-shadow: 2px 2px 5px #ddd;
    margin-bottom: 15px
}
ul.shop li img{
    width: 100%;
    height: 75%;
}
.desc{
    padding-left: 10px;
    text-align: left;
}
.shop-desc{
    font: normal 18px bolder;

}
.shop-price{
    text-align: left;
    font: normal 16px bolder;
    color: #f00;

}
</style>


