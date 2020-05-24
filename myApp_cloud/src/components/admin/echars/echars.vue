<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <!-- <el-col :span="12">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col> -->
            <!-- <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col> -->
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
            <!-- <el-col :span="24">
                <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
            </el-col> -->
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                userList:'',/*普通用户*/
                adminList:'',/*普通用户*/
                cartList:''
            }
        },

        methods: {
                 // 加载用户列表
      loadUser(){
          let url ="user/list";let params = {};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
             this.userList=res.data.length
             console.log('userList1111',this.userList)
             
         })
      },
        loadadmin(){
          let url ="user/adminList";let params = {};let type='get'
          this.reqM1Service(url,params,type).then(
         res => { 
             this.adminList=res.data.length
             console.log('userList1111',this.adminList)
             
         })
      },
               loadCart(){
                let url='cart/userOrderListAll';let params={};let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    this.cartList=res.data.length
                    console.log('userOrderList',res.data);
                    
                 })
            },
            // 柱状图
            drawColumnChart() {
                 let url='user/adminList';let params={};let type='get'
                this.reqM1Service(url,params,type).then(
                res => {
                    console.log(res);
                    console.log('userOrderList',res.data);
                    var len=res.data.length
                    var user=this.userList
                    var cart= this.cartList
                    console.log('user',user)
                      this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                  title: { text: '总注册用户' },
                  tooltip: {},
                  xAxis: {
                      data: ["管理员", "用户",'订单总数'],  
                  },
                  axisLabel:{interval:1},
                  yAxis: {
                      name:'人数',
                      min:0,
                      max:10,
                      interval:1
                  },
                  series: [{
                      name: '注册数量',
                      type: 'bar',
                      data: [len,user,cart],
                       barWidth : 50,//柱图宽度
                    }]
                });
                 })
              
            },
            // drawBarChart() {
            //     this.chartBar = echarts.init(document.getElementById('chartBar'));
            //     this.chartBar.setOption({
            //         title: {
            //             text: 'Bar Chart',
            //             subtext: '数据来自网络'
            //         },
            //         tooltip: {
            //             trigger: 'axis',
            //             axisPointer: {
            //                 type: 'shadow'
            //             }
            //         },
            //         legend: {
            //             data: ['2011年', '2012年']
            //         },
            //         grid: {
            //             left: '3%',
            //             right: '4%',
            //             bottom: '3%',
            //             containLabel: true
            //         },
            //         xAxis: {
            //             type: 'value',
            //             boundaryGap: [0, 0.01]
            //         },
            //         yAxis: {
            //             type: 'category',
            //             data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
            //         },
            //         series: [
            //             {
            //                 name: '2011年',
            //                 type: 'bar',
            //                 data: [18203, 23489, 29034, 104970, 131744, 630230]
            //             },
            //             {
            //                 name: '2012年',
            //                 type: 'bar',
            //                 data: [19325, 23438, 31000, 121594, 134141, 681807]
            //             }
            //         ]
            //     });
            // },

            //折线图 
            // drawLineChart() {
            //     this.chartLine = echarts.init(document.getElementById('chartLine'));
            //     this.chartLine.setOption({
            //         title: {
            //             text: '订单统计'
            //         },
            //         tooltip: {
            //             trigger: 'axis'
            //         },
            //         legend: {
            //             data: ['全部订单', '已支付', '未支付']
            //         },
            //         grid: {
            //             left: '3%',
            //             right: '4%',
            //             bottom: '3%',
            //             containLabel: true
            //         },
            //         xAxis: {
            //             type: 'category',
            //             boundaryGap: false,
            //             data: ['全部订单', '已支付', '未支付',]
            //         },
            //         yAxis: {
            //             type: 'value'
            //         },
            //         series: [
            //             {
            //                 name: '全部订单',
            //                 type: 'line',
            //                 stack: '总量',
            //                 data: [120, 132, 101, 134, 90, 230, 210]
            //             },
            //             {
            //                 name: '已支付',
            //                 type: 'line',
            //                 stack: '总量',
            //                 data: [220, 182, 191, 234, 290, 330, 310]
            //             },
            //             {
            //                 name: '未支付',
            //                 type: 'line',
            //                 stack: '总量',
            //                 data: [820, 932, 901, 934, 1290, 1330, 1320]
            //             }
            //         ]
            //     });
            // },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '景点分布',
                        subtext: '张家口地区',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['张家口市', '崇礼区', '张北县', '蔚县', '怀来','赤城','沽源']
                    },
                    series: [
                        {
                            name: '景区分布',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: 4, name: '张家口市' },
                                { value: 7, name: '崇礼区' },
                                { value: 4, name: '张北县' },
                                { value: 4, name: '蔚县' },
                                { value: 2, name: '怀来' },
                                { value: 1, name: '赤城' },
                                { value: 4, name: '沽源' },
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawColumnChart()
                // this.drawBarChart()
                // this.drawLineChart()
                this.drawPieChart()
            },
        },
        created(){
             this.loadUser()
            this.loadadmin()
               this.loadCart()
        },
        mounted: function () {
            this.drawCharts()
         
           
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>
<style scoped>
    .chart-container {
        width: 100%;
        /* float: left; */
    }
    /* .chart div {
        height: 400px;
        float: left;
    } */

    .el-col {
        padding: 30px 20px;
    }
</style>

