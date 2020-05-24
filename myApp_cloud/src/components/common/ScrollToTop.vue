<template>
    <div class="test-box">
        <div class="scrollTop" v-show="showTop" @click="gotop">
            <img src="@../../../static/images/top.png" alt="">
        </div>
        <div class="back-test"></div>
 
    </div>
</template>
<script>
    export default {
        name: 'this-is-backtop-test',
        data() {
            return {
                scrollTop: 0,
            }
        },
        computed: {
            showTop: function () {
                //判断滚轮位置是否大于1000px，如果大于就tren，否则false
                let value = this.scrollTop > 100 ? true : false;
                //返回值
                return value;
            }

        },
        mounted() {
            //addEventListener() 方法来添加监听事件
            window.addEventListener("scroll", this.getScrollTop);
        },
        methods: {
            gotop() {
                // 这是最简单的回到顶部代码，但是过渡非常生硬，不建议这样写
                // document.documentElement.scrollTop = document.body.scrollTop = 0

                // 这里的原理是用定时器每200毫秒执行一次函数，每一次滚轮px减50，直到0为止
                let back = setInterval(()=>{
                    if(document.documentElement.scrollTop || document.body.scrollTop){
                        document.documentElement.scrollTop -=100;
                        document.body.scrollTop -=100;
                    }else{
                        clearInterval(back) //scrollTop到0时就移除定时器
                    }
                },200)
            },
            getScrollTop() {
                this.scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
            }
        }
    }
</script>
<style scoped>

    .scrollTop {
        position: fixed;
        right: 10px;
        bottom: 80px;
        cursor: pointer;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: red;
        z-index: 2;
    }
</style>
