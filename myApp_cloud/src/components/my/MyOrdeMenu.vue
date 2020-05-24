<template>
    <div class="orderMenu">
        <!-- 我的-我的订单面板 -->
        <h1>我的订单</h1>
	<div id="myCart">
		<ul id="cartList">
			<!-- 声明数组cartText,利用v-for自动生成cart -->
			<li id="cartItem" v-for="(item,i) of cartText" :key="i">
				<!-- 为空的div标签绑定函数throwValue用来向跳转页面并传递val值 -->
				<router-link :to="/MyOrder/+item.val+'/'+i+'/'">
					<!-- 将src修改为变量，通过数组cartText保存其对应的路径 -->
					<!-- <img :src="item.icon" id="cartIcon"> -->
					<!-- 通过数组cartText动态加载p标签内的内容 -->
					<p>{{item.title}}</p>
				</router-link>
			</li>
		</ul>
	</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            	cartText:[/*声明数组cartText，其中icon储存的是图片的路径，title存储的是显示的文字，val储存的是页面跳转时将要传递的值*/
		        //   {icon:require("../../../static/myimg/mycart/order.png"),title:"全部订单",val:"order"},
		          {title:"全部订单",val:"order"},
		          {title:"待支付",val:"pay"},
		          {title:"待出行",val:"trip"},
		          {title:"待评价",val:"comment"}
	        	]
        }
    }
}
</script>
<style scoped>
h1{
    text-align: left;
    font-size: 20px;
    padding: 10px;
}
#cartList{
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 4px 4px 4px 4px #ccc;
}
</style>


