<template>
    <div>
        <van-tabs v-model="active" type='card' animated background="rgb(38,162,255)" title-active-color='#fff' title-inactive-color='#000' color='#000'>
            <van-tab name='dujia' title="度假村">
                <!-- 度假村 -->
                <du-jia></du-jia>
            </van-tab>
            <van-tab name='ski' title="滑雪场">
               <ski-slope></ski-slope> 
            </van-tab>
            <van-tab name='ski' title="景点1">
                <!-- 度假村 -->
                <du-jia></du-jia>
            </van-tab>
            <van-tab name='ski' title="景点2">
                <!-- 度假村 -->
                <du-jia></du-jia>
            </van-tab>
      </van-tabs>
    </div>
</template>
<script>
import SkiSlope from './SkiSlope'
import DuJia from './DuJia'
export default {
    data(){
        return{
          active:'dujia'
        }
    },
    components:{
      'SkiSlope': SkiSlope,
      'DuJia': DuJia
    }
}
</script>
<style scoped>
.van-tabs--line .van-tabs__wrap {
    height: 60px;
    border: none;
}
.van-tabs >>>.van-tabs__nav--card {
    box-sizing: border-box;
    height: 30px;
    margin: 0;
    border: none;
    border-radius: 2px;
}
 .van-tabs--card >>> .van-tabs__nav--card  .van-tab {
    color: #ee0a24;
    line-height: 28px;
    border: none;
    border-radius: 40%;
}
</style>

