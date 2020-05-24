<template>
    <div class="my-box">
        <my-login ></my-login>
        <!-- <my-order></my-order> -->
        <my-CollectMenu></my-CollectMenu>
        <my-OrdeMenu></my-OrdeMenu>
        <!-- <my-purse></my-purse> -->
    </div>
</template>
<script>
import MyLogin from './MyLogin'
import MyOrder from './MyOrder'
import MyPurse from './MyPurse'
import myOrdeMenu from './MyOrdeMenu'
import myCollectMenu  from './MyCollectMenu '
export default {
components:{
    'my-login':MyLogin,
    // 'my-order':MyOrder,
    'my-purse':MyPurse,
    'my-OrdeMenu':myOrdeMenu,
    'my-CollectMenu':myCollectMenu
}
}
</script>
<style scoped>

</style>


