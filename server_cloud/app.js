//----------------------------------服务器文件 app.js--------------------------
/*完整步骤：
1.创建web服务器 包括(1)引入express模块 (2)创建服务器(3)监听端口号
2.引入编写的路由器文件模块（自定义模块）例如：用户路由器 ./routes/user.js
  引入所需的第三方模块 例body-parse
3.使用第三方中间件body-parser 来获取客户端提交的post请求 app.use(bodyParser.urlencoded)
4.使用内置中间件，托管静态资源到public目录下app.use(express.static('./public'))
5.使用路由级中间件，将路由挂载到服务器上 app.use()
*/

//###1创建web服务器,引入express模块
// express服务器 npm install express
const express=require("express")
// ###2引入路由器文件模块，自定义模块
//2.1引入user用户路由，用const定义 不可变
const userRouter=require('./routes/user.js')
// 2.2引入首页路由
const indexRouter=require('./routes/index.js')
// 2.3引入购物车路由
const cartRouter=require('./routes/cart.js')
//###3引入第三方中间件body-parse(中间件只能web服务器引入)
const bodyParser=require('body-parser')
// 创建服务器，监听端口号，新浪云中的nodejs只允许监听5050端口
// 引入session对象 express-session
const session=require('express-session')
// 引入cors跨域
const cors=require('cors')
// 引入token的模块

// const jwt=require('./jwt.js')
// const JwtUtil=require('./jwttt.js');

var app=express()
var port=5050
app.listen(port,()=>{
    console.log('Server Listening On:',port)
})
// 3.1使用bodyParse中间件。来获取客户端提交的post请求
// nodejs 做为服务器，在传输内容或者上传文件时，系统默认大小为100kb，
// 这时，我们需要修改系统限制。我们在app.js中调用接口和对应方法中，加入对应参数即可，如：
// 顺序，先bodyParser.json
app.use(bodyParser.json({limit:'1000kb'}));
app.use(bodyParser.urlencoded({
    extended:false//使用查询querystring字符串 
}));




app.use(cors({
    //允许程序列表  脚手架
 origin:["http://127.0.0.1:8080","http://localhost:8080","http://127.0.0.1:5050","http://zjkapp.applinzi.com","https://zjkapp.applinzi.com"],  /**/
//   
 credentials:true//每次请求需要验证
})) 
// 配置session模块
app.use(session({
    secret:'128位字符串',//安全字符串
    resave:true,//请求时更新数据
    saveUninitialized:true//保存初始数据
}))
// 或者设置跨域
// app.all('*',(req, res, next)=> {
//     res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
 
// ###4使用内置中间件expre。static()托管静态资源到public目录下，服务器端的图片
app.use(express.static('./public'))

// 中间件， 请求拦截器只有以user开头和order开头的路由才需要拦截,
// app.use((req, res, next)=>{ 
//     // if (req.url != '/user/signin' && (req.url.startsWith("/user") || req.url.startsWith("/orders"))) {
//     if (req.url != '/user/signin' && (req.url.startsWith("/user") || req.url.startsWith("/orders"))) {
//       let token = req.headers.token;//存在header中
//       console.log('token',token)
//       let result = jwt.verifyToken(token);//翻译解析成对象
//       // 如果考验通过就next，否则就返回登陆信息不正确
//       if(result ===undefined){
//           //send把消息发送到客户端
//         res.send({status:403, msg:"未提供证书",data:result})
//             //过期
//       }else if (result.name == 'TokenExpiredError') {
//         res.send({status: 403, msg: '登录超时，请重新登录'});
//       } else if (result.name=="JsonWebTokenError"){
//         res.send({status: 403, msg: '证书出错'})
//       } else{
//             //转成了用户对象
//         req.user=result;
//           //向下执行
//         next();
//       }
//     } else {
//       next();
//     }
//   });


// app.use( (req, res, next)=> {
//     // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
//     // if (req.url != '/user/login' && req.url != '/user/register') {
//     if (req.url != '/user/login' && req.url != '/user/register') {
//         let token = req.headers.token;//存在header中
//         // let jwt = new jwt(token);
//         let result = jwt.verifyToken(token);//解析成对象
//         // 如果考验通过就next，否则就返回登陆信息不正确
//         if (result == 'err') {
//             console.log('errresult',result);
//             res.send({status: 403, msg: '登录已过期,请重新登录'});
//             // res.render('login.html');
//         } 
//         // else if(result ===undefined){
//         //     //send把消息发送到客户端
//         // res.send({status:403, msg:"未提供证书",data:result});
//         // console.log('resultapp'.result);
//         // }
//         // else if (result.name == 'TokenExpiredError') {
//         //             res.send({status: 403, msg: '登录超时，请重新登录'});
//         //           } else if (result.name=="JsonWebTokenError"){
//         //             res.send({status: 403, msg: '证书出错'})
//         //           }
//         else {
//                    //转成了用户对象
//         req.user=result;
//         console.log('req.user',req.user)
//         console.log('resjie',res.data)
//         console.log('resjiekai',result)
//             next();
//         }
//     } else {
//         next();
//     }
// });

// ###5使用路由级中间件，将路由挂载到服务器上
// 挂载用户路由userRouter
// 访问时统一添加前缀/user 访问输入时输入/user/reg请求到注册接口
app.use('/user',userRouter)
// index路由
app.use('/',indexRouter)
app.use('/cart',cartRouter)
// 订单路由/orders





