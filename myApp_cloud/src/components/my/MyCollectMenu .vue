<template>
    <div>
         <!-- 我的收藏 -->
          <ul class="love">
              <li>
                  <router-link to='/myCollect'>
                   <img src="@../../../static/images/love.png" alt="">
                   <p>我的收藏</p>
                  </router-link>
              </li>
              <li>
               <router-link to='/cart'>
                    <img src="@../../../static/images/cart.png" alt="">
                <p>我的购物车</p>
               </router-link>
                </li>
              <!-- <li><img src="@../../../static/images/love.png" alt=""></li> -->
            
          </ul>
    </div>
</template>
<style scoped>
.love{
    height: 80px;
    /* border: 1px solid #f00; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 60px;
     box-shadow: 4px 4px 4px 4px #ccc;
}
.love li{
    display: flex;
    flex-direction: column;
}
</style>
