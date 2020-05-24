<template>
<div class="home-box">
    <!-- tabbar面板 -->
    <mt-tab-container v-model='active'>
        <mt-tab-container-item id='tab1' >
            <!-- 首页 -->
           <index></index>
        </mt-tab-container-item>
        <mt-tab-container-item id='tab2'>
            <!-- 推荐 -->
        <recommend></recommend>
        </mt-tab-container-item>
        <!-- <mt-tab-container-item id='tab3'>
            <food></food>
        </mt-tab-container-item> -->
        <mt-tab-container-item id='tab4'>
        <my></my>
        </mt-tab-container-item>
    </mt-tab-container>
    <!-- 底部tabbar -->
    <mt-tabbar v-model='active' fixed>
        <mt-tab-item id='tab1' @click.native="change(0)">
          <tabbar :normalImage="require('@../../../static/images/my.png')"
          :selectedImage="require('@../../../static/images/myactive.png')"
          :focused="currentIndex[0].isSelect"
          ></tabbar>
          首页
        </mt-tab-item>
        <mt-tab-item id='tab2' @click.native="change(1)">
             <tabbar :normalImage="require('@../../../static/images/tuijian.png')"
          :selectedImage="require('@../../../static/images/tuijianactive.png')"
          :focused="currentIndex[1].isSelect"
          ></tabbar>
          推荐
        </mt-tab-item>
        <!-- <mt-tab-item id='tab3' @click.native="change(2)">
                    <tabbar :normalImage="require('@../../../static/images/techan.png')"
          :selectedImage="require('@../../../static/images/techanactive.png')"
          :focused="currentIndex[2].isSelect"
          ></tabbar>
          特产
        </mt-tab-item> -->
        <mt-tab-item id='tab4' @click.native ="change(3        )">
             <tabbar :normalImage="require('@../../../static/images/my.png')"
          :selectedImage="require('@../../../static/images/myactive.png')"
          :focused="currentIndex[3].isSelect"
          ></tabbar>
          我的
        </mt-tab-item>
    </mt-tabbar>

</div>
</template>
<script>
// 引入组件
import Index from './index/Index.vue'//首页
import Recommend from './recommend/Recommend.vue'//推荐
import Food  from './Food.vue'
import Tabbar from './Tabbar.vue'
import My from './my/My.vue'
export default {
    data(){
        return{
            active:'tab1',
            currentIndex:[
                {isSelect:true},
                {isSelect:false},
                {isSelect:false},
                {isSelect:false},
            ]
            

        }
    },
    methods:{
      change(n){
          for(var i=0;i<this.currentIndex.length;i++){
              if(n==i){
                  this.currentIndex[i].isSelect=true
              }else{
                  this.currentIndex[i].isSelect=false
              }

          }
      }
    },
    // 注册引入的组件，嵌套组件
    components:{
        'tabbar':Tabbar,
        'index':Index,
        'my':My,
        'recommend':Recommend,
        'food':Food
         
     },
    
}
</script>
<style scoped>

</style>


