<template>
    <div>
        <h1>购物车，共{{list.length}}件宝贝</h1>
        <!-- 顶部复选框，全选 -->
         <div class="selectAll">
            全选<input type="checkbox" @change="selectAll" v-model='allcb'>
         </div>
        <!-- 购物车 -->
        <div class="cart-item" v-for="(item,i) of list" :key='i'>
            <div class="leftText">
                <input type="checkbox" v-model='item.cb'>
                <img :src="imgServer+item.img" alt="">
            </div>
            <div class="rightText">
                <!-- 描述 -->
                <p>{{item.title}}</p>
                <p>
                    <span>￥{{item.price}}</span>
                    <span>count数量</span>
                </p>
                <mt-button :data-id='item.id' @click="del" size='small'>删除</mt-button>
                <!-- 删除选中的商品 -->
                <hr>
                <!-- <mt-button>删除选中的商品</mt-button> -->
            </div>
            
                <!-- 全部删除 -->
             <!-- <button @click='delAll(item.id)'>删除选中的商品</button> -->
        <h1 v-show="list.length===0">购物车空空如也~~~</h1>
        </div>
    </div>
</template>
<script>
import {domain} from '../../url.js'
export default {
    data(){
        return{
           imgServer:domain.Base_M1_URL,// 图片服务器地址
            list:[],//购物车列表

        }
        },
        created(){
          this.loadCart()
        },
        methods:{
            loadCart(){
                let url='cart/cartList';
                let params=''
                let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    console.log('cart/addCart',res.data);
                    // this.list=res.data;
                    // console.log('indexdetail_list',this.list)
                    var list=res.data
                     if(list.length==0){
                       console.log('购物车空空如也')
                  }
                    // 为每个商品添加状态
                    for(var item of list){
                      item.cb=false
                    }
                    // 赋值
                    this.list=list
                 }
                  
                )
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
            // 删除
            del(event){
                // 1为删除按钮添加自定义属性data-id 保存当前购物车商品id
                // 2条件点击事件，click del
                // 2.1交互提示，是否删除商品
                this.$messagebox.confirm('是否删除商品')
                // 确定删除
                .then(res=>{
                // 回调函数3~8
                // 3获取当前商品id
                var id=event.target.dataset.id;console.log('购物车id',id)
                // 发送ajax请求，删除购物车商品,重新加载购物车列表loadCart
                    let url='cart/cartDel';
                    let params={id}
                    let type='get'
                    this.reqM1Service(url,params,type).then(
                    res => {
                        console.log('cart/cartDel',res);
                        // 重新加载购物车列表loadCart
                        this.loadCart()
                    })
                })
                .catch(err=>{
                //取消
                })
            },
            // 删除选中的商品
            //  delAll(id){
            //   console.log('选中了----',id)
            //   var arr=[]
            //    for(var item of this.list){
            //        console.log('key1',id)
            //        arr.push=this.list[item]
            //     //    item.cb=true
                   
            //    }
            //      console.log('key2',id)
            //      console.log('arr',arr)

            //  }
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
    justify-content:space-abetween;
    border: 1px solid #f00;
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
</style>


