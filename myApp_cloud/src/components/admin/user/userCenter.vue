<template>
    <div>
        <h1>用户中心</h1>
        <div class="userCenter">
           用户名:{{aname}}
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
        data(){
            return{

            }
        },
         computed:{
        ...mapState(['aname']),
      },
      methods:{
                  loadShopItem(){
          let url ="indexItem";let params = {};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
             console.log('userList',res.data)
             this.shopList=res.data
         })
      },
      }
}
</script>
<style scoped>
.userCenter{
    width: 100%;
    text-align: center;
}
</style>


