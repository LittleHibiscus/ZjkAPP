<template>
	<div>
		<div id="orderTop">
			         <!-- 返回 -->
        <mt-header title="我的旅游订单">
            <router-link to="/" slot="left">
                <mt-button icon="back" >返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
		</div>
        <!-- 订单导航栏 -->
			<mt-navbar v-model="selected" >
				<mt-tab-item id="order" @click.native="getnum(0)">全部订单</mt-tab-item>
				<mt-tab-item id="pay" @click.native="getnum(1)">待支付</mt-tab-item>
				<mt-tab-item id="trip" @click.native="getnum(2)">待出行</mt-tab-item>
				<mt-tab-item id="comment" @click.native="getnum(3)">待评价</mt-tab-item>
			</mt-navbar>
        <!-- 全部订单 -->
		<mt-tab-container v-model="selected">
	  		<mt-tab-container-item id="order" @click="getVal(id)">	 
			   <orderlist></orderlist>
	  		</mt-tab-container-item>
        <!-- 待支付 -->
	  		<mt-tab-container-item id="pay" @click="getVal(id)">
                <waitPay></waitPay>
	  		</mt-tab-container-item>
              <!-- 待出行 -->
	  		<mt-tab-container-item id="trip" @click="getVal(id)">
	    		<paied></paied>
	  		</mt-tab-container-item>
              <!-- 待评价 -->
	  		<mt-tab-container-item id="comment" @click="getVal(id)">
					<paied></paied>
	  		</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
	import OrderList from "../cart-order/OrderList.vue"
	import WaitPay from "../pay/WaitPay.vue"
	import Paied from "../pay/Paied.vue"
	export default{
		data(){
			return{
				selected:"order",
				list:[],
				uid1:"tab4"
			}
		},
		props:["val",'i'],
		created(){
			this.getVal()
			this.selected=this.val;
			var status=this.i;
            // this.getnum(status);
            this.loadCart()
			
		},
		methods:{
            // 返回
            back(){
                this.$router.go(-1)
            },
			getVal(){
				var selected;
				this.selected=this.$route.params.val;
				return selected;
				console.log(selected);
			},
			getnum(status){
				
				// var obj={status:status}

				// console.log(obj)
			
				// if(status>=1){
				// 	this.axios.get('/findOrder',{params:obj})
				// 	.then(result=>{
				// 		console.log(result)
				// 		this.list=result.data.data
				// 		console.log(this.list)
				// 	})
				// }
				// else{
				// 	this.axios.get('/findOrder')
				// 	.then(result=>{
				// 		console.log(result)
				// 		this.list=result.data.data
				// 		console.log(this.list)
				// 	})
				// }
            },
              loadCart(){
                let url='cart/userOrderList1';let params={uid:this.uid};let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    console.log('userOrderList',res.data);
                    // this.list=res.data;
                    // console.log('indexdetail_list',this.list)
                    this.list=res.data
                //     this.status=res.data.orderStatus
                //     // 为每个商品添加状态
                //     for(var item of list){
                //       item.cb=false
                //     }
                //     // 赋值
                //     this.list=list
                 }
                  
                )
            },
		},
		components:{
            'orderlist':OrderList,
            'waitPay':WaitPay,
            'paied':Paied,
		}
	}
</script>
