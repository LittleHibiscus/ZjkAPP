<template>
    <div>
        <div>城市</div>
        <!-- 日期 -->
        <div>
           <data-picker></data-picker>
        </div>
        
    </div>
</template>
<script>
import DataPicker from './DataPicker'
export default {
    data(){
        return{

        }
    },
    components:{
     'data-picker':DataPicker
    }
}
</script>

<style scoped>

</style>

