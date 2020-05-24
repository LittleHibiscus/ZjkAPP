<template>
<!-- tabbar子组件 -->
    <div>
      <img :src="focused?selectedImage:normalImage" alt="" class="tabbar-img">
    </div>
</template>
<script>
export default {
    props:{
        focused:false,
        selectedImage:'',
        normalImage:''

    }
}
</script>
<style scoped>
.tabbar-img{
    width: 30px;
    height: 30px;
}
</style>

