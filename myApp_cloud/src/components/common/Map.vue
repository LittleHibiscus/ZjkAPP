<template>
<div class="map">
      <div class="s1">
              <div class="search">
         <span>关键词:</span><input v-model="keyword">
    </div>
    <div class="search">
         <span>地区:</span><input v-model="location">
    </div>
      </div>
          
   
   <baidu-map class="map" :center="center"  :zoom='zoom' @ready="handler">
       <!-- 缩放 -->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
    <!-- 比例尺 -->
     <!-- <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> -->
    <!-- 定位 -->
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <!-- 地图类型 -->
    <!-- <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type> -->
    <!-- 缩略图 -->
     <bm-overview-map class="size" :size='size' anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
        <bm-view class="map"></bm-view>
    <bm-local-search :keyword="keyword"   :auto-viewport="true" :location="location"></bm-local-search>
    <!-- 城市列表 -->
     <!-- <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list> -->
  </baidu-map>
</div>
  
</template>
<script>
export default {
  data () {
    return {
    //   center: {lng: 0, lat: 0},
      zoom: 15,
      location: '张家口市',
      size:{
          width:90,
          height:90
      }
    //   keyword: ''
       
    }
  },
  props:['keyword','center'],
  methods: {
    		handler ({BMap, map}) {
				let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					console.log(r);
					// _this.center = {lng: r.longitude, lat: r.latitude};		// 设置center属性值
					_this.autoLocationPoint = {lng: r.longitude, lat: r.latitude};		// 自定义覆盖物
					_this.initLocation = true;	
					// console.log('center:', _this.center)	// 如果这里直接使用this是不行的
				},{enableHighAccuracy: true})

}
}
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 150px;
}
.search{
    display: flex;
    width: 50%;
    height: 30px;
    justify-content: center;
    align-items: center;
}
.search input{
    text-indent: 20px;
}
.search span{
    font: normal 14px/20px bolder;
    color: #000;
}
.s1{display: flex;}
.size{
    width: 10px;
    height: 80px;
}
</style>
