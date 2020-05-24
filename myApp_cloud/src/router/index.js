import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Tabbar from '@/components/Tabbar'
import Home from '@/components/Home'
import My from '@/components/my/My'
import Recommend from '@/components/recommend/Recommend'
import Food from '@/components/Food'
import IndexDetail from '@/components/index/IndexDetail'
import ZuTuan from '@/components/iconPane/ZuTuan'
import FoodDetail from '@/components/FoodDetail'
import Map from '@/components/common/Map'
// 暂时未开通
import NotFound from '@/components/common/NotFound'
// 滑雪场页面
import SkiSlope from '@/components/iconPane/SkiSlope'
// 度假村页面
import DuJia from '@/components/iconPane/DuJia'
import Cart from '@/components/cart-order/Cart'
// 查询页面
import Search from '@/components/Search'
// 我的收藏
import MyCollect from '@/components/my/MyCollect'
//用户信息
import UserInfo from '@/components/userInfo/UserInfo'
// 修改密码\头像
import ChangePwd from '@/components/userInfo/ChangePwd'
import ChangeAvator from '@/components/userInfo/ChangeAvator'
// 评论
import Comments from '@/components/comments/Comments'
// 每条评论
import CommentEach from '@/components/comments/CommentEach'
// 推荐详情
import RecommendDetail from '@/components/recommend/RecommendDetail'
// 去支付
import Paied from '@/components/pay/Paied'
// 支付
import Pay from '@/components/pay/Pay'
import CartPay from '@/components/pay/CartPay'
import Successful from '@/components/pay/Successful'
import WaitPay from '@/components/pay/WaitPay'
import ToPayDetail from '@/components/pay/ToPayDetail'/*未支付转支付*/
import PaiedDetail from '@/components/pay/PaiedDetail'/*已经支付的情况*/

// 订单面板
import MyOrdeMenu from '@/components/my/MyOrdeMenu'
// 我的订单
import MyOrder from '@/components/my/MyOrder'
// 酒店预订
import Hotel from '@/components/Hotel/Hotel'
//酒店城市列表
import City from '@/components/Hotel/City'
// 酒店日期选择
import DataPicker from '@/components/Hotel/DataPicker'
// 酒店选择
import House from '@/components/Hotel/House'
// --------管理员系统
import userLogin from '@/components/admin/userLogin.vue'//管理登录
import adminIndex from '@/components/admin/adminIndex.vue'//管理首页
import userList from '@/components/admin/user/userList.vue'//管理首页
import dataHeader from '@/components/admin/common/dataHeader.vue'//管理头部
import slideNav from '@/components/admin/common/slideNav.vue'//管理左侧导航
import adminReg from '@/components/admin/user/adminReg.vue'//管理首页
import shopItem from '@/components/admin/shop/shopItem.vue'//管理首页
import tuijian from '@/components/admin/shop/tuijian.vue'//管理首页
import searchList from '@/components/admin/shop/searchList.vue'//管理搜索界面
import shopComment from '@/components/admin/shop/shopComment.vue'//管理搜索界面
import userCenter from '@/components/admin/user/userCenter.vue'//管理用户中心
import echars from '@/components/admin/echars/echars.vue'//管理用户中心
import adminOrder from '@/components/admin/order/adminOrder.vue'//管订单用户中心






Vue.use(Router)

  const router=new Router({
  routes: [
    // {path: '/',name: 'HelloWorld', component: HelloWorld},
    // 重定向？
    {path: '/',name: 'Home', component: Home},
    {path: '/index',name: 'Index', component: Index,props:true},
    {path: '/login',name: 'Login', component: Login},
    {path: '/register',name: 'Register', component: Register},
    {path: '/tabbar',name: 'Tabbar', component: Tabbar},
    {path: '/home',name: 'Home', component: Home},
    {path: '/my',name: 'My', component: My},
    {path: '/recommend',name: 'Recommend', component:Recommend,props:true},
    {path: '/food',name: 'Food', component:Food},
    // did 商品参数，uid，用户参数
    {path: '/indexDetail/:did',name: 'IndexDetail', component:IndexDetail,props:true},//传参
    {path: '/zuTuan/',name: 'ZuTuan', component:ZuTuan},//传参
    {path: '/foodDetail/:did/:uid',name: 'FoodDetail', component:FoodDetail,props:true},
    {path: '/map',name: 'Map', component:Map},
    {path: '/notFound',name: 'NotFound', component:NotFound},
    {path: '/skiSlope',name: 'SkiSlope', component:SkiSlope},
    {path: '/duJia',name: 'DuJia', component:DuJia},
    {path: '/cart',name: 'Cart', component:Cart},
    {path: '/search',name: 'Search', component:Search},
    {path: '/myCollect',name: 'MyCollect', component:MyCollect},
    {path: '/userInfo',name: 'UserInfo', component:UserInfo},
    {path: '/changePwd',name: 'ChangePwd', component:ChangePwd},
    {path: '/changeAvator',name: 'ChangeAvator', component:ChangeAvator},
    {path: '/comments',name: 'Comments', component:Comments},
    // 每条评论
    {path: '/commentEach/:id',name: 'CommentEach', component:CommentEach,props:true},
    {path: '/recommendDetail/:href',name:'RecommendDetail', component:RecommendDetail,props:true},
    // 支付
    {path: '/Paied/',name:'Paied', component:Paied,props:true},
    {path: '/pay/:lid/:uid/:time',name:'Pay', component:Pay,props:true},
    {path: '/successful',name:'Successful', component:Successful},
    {path: '/waitPay',name:'WaitPay', component:WaitPay,props:true},
    {path: '/cartPay/:iid/:id',name:'CartPay', component:CartPay,props:true},
    {path: '/toPayDetail/:iid/:id',name:'ToPayDetail', component:ToPayDetail,props:true},
    {path: '/PaiedDetail/:id',name:'PaiedDetail', component:PaiedDetail,props:true},
    // {path: '/waitPay',name:'WaitPay', component:WaitPay},
    {path: '/hotel',name:'Hotel', component:Hotel},
    {path: '/myOrdeMenu',name:'MyOrdeMenu', component:MyOrdeMenu},
    {path: '/MyOrder/:val/:uid',name:'MyOrder', component:MyOrder,props:true},
    {path: '/city',name:'City', component:City,props:true},
    {path: '/dataPicker',name:'DataPicker', component:DataPicker,props:true},
    {path: '/house',name:'House', component:House,props:true},
    // -------------------管理员系统------------------------------------
    {path: '/admin',name:'admin', component:userLogin,props:true},//管理登录
    {
        path: '/adminIndex',name:'adminIndex',component:adminIndex,
        // 管理员登录组件内导航钩子
        // beforeEnter:(to,from,next)=>{
        //     var aname= localStorage.getItem('aname')
        //         console.log('aname',aname)
        //         console.log('form-name',from.name)
        //         if(from.name=='admin'){
        //             next()
        //         }else{
        //             console.log('nonono')
        //             router.push('admin')
        //         }
        //  },
           children:[
            {path: '/userList',component:userList},//管理用户列表
            {path: '/dataHeader',component:dataHeader},//管理头部
            {path: '/slideNav', component:slideNav},//管理左侧导航
            {path: '/adminReg', component:adminReg},//管理首页
            {path: '/shopItem', component:shopItem},//管理商品
            {path: '/searchList', component:searchList},//管理商品搜索界面
            {path: '/shopComment', component:shopComment},//管理商品评论界面
            {path: '/tuijian', component:tuijian},//管理商品
            {path: '/userCenter', component:userCenter},//管理用户中心
            {path: '/echars', component:echars},//管理echars
            {path: '/adminOrder', component:adminOrder},//管理order
           ]
    },//管理首页
{path: '/adminIndex', name:'adminIndex',component:adminIndex, 
 beforeEnter:(to,from,next)=>{
    var aname= localStorage.getItem('aname')
        console.log('aname',aname)
        console.log('form-name',from.name)
        if(from.name=='admin'){
            next()
        }else{
            router.push('admin')
        }
 }
},
{path: '/userList',component:userList},//管理用户列表
{path: '/dataHeader',component:dataHeader},//管理头部
{path: '/slideNav', component:slideNav},//管理左侧导航
{path: '/adminReg', component:adminReg},//管理首页
{path: '/shopItem', component:shopItem},//管理商品首页
{path: '/searchList', component:searchList},//管理商品搜索界面
{path: '/shopComment', component:shopComment},//管理商品评论界面
{path: '/tuijian', component:tuijian},//管理商品推荐页
{path: '/userCenter', component:userCenter},//管理用户中心
{path: '/echars', component:echars},//管理echars
{path: '/adminOrder', component:adminOrder},//管理order

   



  ]




});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//         console.log('登录llll')
//       next('/');
//     } else {
//       var  token = localStorage.getItem('Authorization');
//       if (token === 'null' || token === '') {
//           console.log('没登录')
//         next('/login');
//       } else {
//         next();
//       }
//     }
//   });

// router.beforeEach((to, from, next) => {
//     // if(from.name=='admin'){
//     //     router.push('adminIndex')
//     //     next()
//     // }else{
//     //     console.log('nonon')
//     // }
//    var aname= localStorage.getItem('aname')
//     console.log('aname',aname)
// //     // to: Route: 即将要进入的目标 路由对象
// //     // from: Route: 当前导航正要离开的路由
// //     // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//     const route = ['index', 'list'];
// //     // let isLogin = store.state.token;  // 是否登录
// //     // 未登录状态；当路由到route指定页时，跳转至login
//     if (route.indexOf(to.name) >= 0) {
//       if (aname == null) {
//         router.push({ path: '/login' });
//       }
//     }
//     // 已登录状态；当路由到login时，跳转至home 
//     console.log('to.name',to.name)
//     console.log('from.name',from.name)
//     localStorage.setItem('routerName', to.name)
//     // if (to.name === 'admin') {
//     //   if (aname != null) {
//     //     router.push({ path: '/Home', });;
//     //   }
//     // }
//     if(from.name=='admin'){
//      next();
//     }
   
// })
export default router;