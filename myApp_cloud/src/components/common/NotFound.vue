<template>
    <div>
                   <!-- 返回 -->
        <mt-header title="冬奥咨询">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
         </mt-header>
          <h1>该栏目暂未开通，敬请期待！</h1>
    </div>
  
</template>
<script>
    //引入BMap
// import BMap from 'BMap'
export default {
    data(){
        return{
            
        }
    },
    mounted(){
       
    },
    methods:{
         // 返回
            back(){this.$router.go(-1)},
    }
}
</script>

