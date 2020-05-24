<template>
    <div>
              <!-- 返回 -->
        <mt-header title="我的收藏">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
        <h1>我的收藏，共{{list.length}}件宝贝</h1>
        <!-- 顶部复选框，全选 -->
         <div class="selectAll"  v-if="list.length!=0">
            全选<input type="checkbox" @change="selectAll" v-model='allcb'>
         </div>
        <!-- 购物车 -->
        <div class="cart-item" v-for="(item,i) of list" :key='i'>
            <div class="leftText">
                <input type="checkbox" v-model='item.cb' @change="itemchange">
                <img :src="imgServer+item.img" alt="">
            </div>
            <div class="rightText">
                <!-- 标题 -->
                <p>{{item.title}}</p>
                <!-- 描述 -->
                <p class="desc">{{item.des | ellipsis}}</p>
                <mt-button :data-id='item.id' @click="cancelCollect" size='small'>取消收藏</mt-button>
            </div>
        </div>
            <div v-if="list.length==0" >
               <h1 >收藏列表为空~~~</h1>
        </div> 
    </div>
</template>
<script>
// 图片服务器地址
import {domain} from '../../url.js'
export default {
    data(){
        return{
            imgServer:domain.Base_M1_URL,// 图片服务器地址
            list:[],//购物车列表
            allcb:false,//最上面全选，双选绑定的变量
        }
        },
        created(){
          this.loadCollect()
        },
          filters: {
            ellipsis (value) {
            if (!value) return ''
            if (value.length > 18) {
                return value.slice(0,18) + '...'
            }
            return value
            }
  },

        methods:{
            //返回 
            back(){
                this.$router.go(-1)
            },
            // 添加收藏
            loadCollect(){
                let url='user/userCollectList';let params=''; let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    console.log('cart/addCart',res);
                    // this.list=res.data;
                    // console.log('indexdetail_list',this.list)
                    var list=res.data
                    // 为每个商品添加状态
                    for(var item of list){
                      item.cb=false
                    }
                    // 赋值
                    this.list=list
                 }
                  
                )
            },
             // 根据上面复选框的状态修改上面的全选状态
            itemchange(){
                // 商品复选框的状态修改
                // 1累加商品状态
                // 创建变量，选中的数量
                var sum=0;
                // 3创建循环办理商品状态
                for(var item of this.list){
                    if(item.cb){//选中为true
                    sum++//选中数量加一
                    }
                }
                //如果全部选中的数量等于当前购物车数组的长度，设置全选为true
                if(sum==this.list.length){
                    this.allcb=true
                }else{
                    this.allcb=false
                }
            },
            // 全选
            selectAll(event){
                // 1添加参数event
                // 2获取当前全选按钮状态
                var all=event.target.checked;
                console.log(all)//全选按钮true选中，false,未选中
                // 赋值所有商品的复选框选中状态
                for(var item of this.list){
                    item.cb=all
                }              

            },
            // 取消收藏
              cancelCollect(){
                console.log('取消收藏')
                this.cang=!this.cang
                    let url = "user/userCollect_del";
                        let params = {
                            // uid:this.uid,
                            title:this.list[0].title,
                            };let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    this.loadCollect()
                    console.log(res);

                    console.log('user/userCollect_del',res.data);
                });
            },
           
        }

}
</script>
<style scoped>

.selectAll{
    text-align: left;
}
.cart-item{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    /* border: 1px solid #f00; */
}
.leftText{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.cart-item.cart-item img{
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}
ul{
    width: 100%;
    height: 100px;
}
ul li{
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #f00;
    margin-bottom: 20px;
}
ul li img{
    width: 100px;
    height: 100px;
    border: 1px solid #000;
}
/* 描述 */

</style>


