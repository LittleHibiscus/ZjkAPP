//-------------------------创建路由器对象 用户路由器user----------------------------
/*步骤：
1.创建路由器 包括（1）引入express模块（2）创建路由器 express.Router()
2.引入数据库连接池对象pool require('../pool.js')--引入上一级../
3.添加路由：根据浏览器请求的方法router.get(url,function(req,res))
get获取 或者 post提交 做出相应的获取数据的操作
(1)获取数据 如果浏览器请求的方法是get 获取数据req.query 
如果浏览器请求的方法是post   获取数据req.body
(2)验证数据是否为空
(3)执行sql语句  前提需要引入连接池文件模块 使用pool.query
pool.query('sql语句',[],function(err,result){})
增加，删除，修改 sql语句执行返回的是对象 判断增删改是否成功 result.affectedRows>0
查找 sql语句执行返回的是数组  判断查询是否成功 result.length>0
4.导出路由器对象！关键--
*/
//###一.创建路由器，引入express模块
const express=require('express');
//###二、引入创建好的连接池模块,引入上一级目录../
const pool=require('../pool.js');
const JwtUtil=require('../jwttt.js');
// const jwt=require('../jwt.js')
// 1.1创建路由器
var router=express.Router();
// ###三、添加路由。处理get或者post请求

// router.post('/reg',function(req,res){
// 	//1.1获取数据
// 	var obj=req.body;
// 	console.log(obj);//显示注册的信息，返回方式为对象
// 	//1.2验证是否为空

// 	/*
// 	var i=400;
// 	for (var key in obj)
// 	{
// 		if(!obj[key])
// 		{
// 			i++;
// 			res.send({code:i,msg:key+' required'});
// 		    return;//阻止往后执行
// 		}
// 	} 
// 	*/

// 	//1.3执行sql语句   插入使用插入对象 SET ?,[对象]
// 	//插入返回的是对象
// 	pool.query('INSERT INTO users SET ?',
// 		[obj],function(err,result){
// 		if (err)throw err;
// 		console.log('reg',result);//返回的是对象格式
// 		//如果插入成功，结果受影响的行大于0
// 		if(result.affectedRows>0){//返回格式 json
// 			res.send({code:200,msg:'reg suc'});
// 		}
		
// 	});
// 	//res.send('注册成功');
// });



// -------------------------1.用户注册-----------------
//  接口/reg post请求
router.post('/reg',(req,res)=>{
    // post
    // 参数
    // var user=req.user;
    // console.log('uuser',user)
    var {uname,upwd}=req.body;
    var sql = "SELECT uid FROM users WHERE uname = ?";
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
          res.send({code:1,msg:"用户名已存在"});
        }
        else{
          //(2)创建sql语句插
          var sql='INSERT INTO users VALUES (null,?,?)'
          //(3)执行sql语句
          pool.query(sql,[uname,upwd],(err,result)=>{
          if(err)throw err;
          //(4)获取执行结果
          //(5)判断查询是否成功 result.length
          if(result.affectedRows>0){
            res.send({code:200,msg:"注册成功"});
          }
          //(6)将结果返回脚手架
        })
      }
      
      })

});
// ------------------------2.用户登录------------------
// 、生成token
// router.get('/signin',(req,res)=>{
// //接口/login post请求
// // post请求获取数据req.body
// // (1)获取请求参数（脚手架参数）
// var {uname,upwd,remrember}=req.query
// //如果用户名密码不为空
// if(uname&&upwd){
//    // （2）创建sql语句
// var sql='SELECT uid,uname FROM users WHERE uname=? AND upwd=?';
// // (3)执行sql语句
// pool.query(sql,[uname,upwd],(err,result)=>{
//     console.log(result);
//     if(err) {console.log(err);
//      res.send({code:-1,msg:'登录失败！'})
//     }
//     else{
//         // (4)获取执行结果，查询是否成功 result.length
//         if(result.length>0){
//             res.send({code:1,uname:result[0]['uname'],remrember,
//              token:jwt.generateToken(result[0])
//          })
//         }else{
//             res.send({code:-1,msg:'用户名或密码不正确'})
//         }
//         console.log('token',result)
//     }
// })
// }

// 后期修改post???验证post
router.post('/login',(req,res) => {
 var {uname,upwd}=req.body;
    var sql='SELECT * FROM users WHERE  uname=? AND upwd=?';
    // (3)执行sql语句
    pool.query(sql,[uname,upwd],(err,result)=>{
    
        if(err) {console.log(err);
         res.send({code:-1,msg:'登录失败！'})
        }
        else{
            // (4)获取执行结果，查询是否成功 result.length
            if(result.length>0){
                     // 登陆成功，添加token验证
                    //  let _id = result._id.toString();
                    //  var  uid = result.uid;
                      let _id = result._id;
                     // 将用户id传入并生成token
                    //  var jwt = new JwtUtil(uid);
                     var jwt = new JwtUtil( _id);
                     var token = jwt.generateToken();
                    //  校验token
                    var jiyao=jwt.verifyToken()
                     // 将 token 返回给客户端
                     res.send({status:200,msg:'登陆成功',uname,token});
                     console.log('用户查询结果',result);
                     console.log('5555result',result)
                     console.log('6token',token)
                    //  console.log('req.user',req.user)
                     console.log('jiaoayo',jiyao)
                     console.log('uid',result.data)

             }
         else{
                res.send({code:-1,msg:'用户名或密码不正确'})
                console.log('token',result)
             }
           
        }
    })
});
// 注销
router.get('/logout',(req,res)=>{

})
// 修改密码
router.get('/update')
// })
// -------------------------3.用户列表-----------------
router.get('/list',(req,res)=>{
    pool.query('SELECT * FROM users',(err,result)=>{
      //  回调函数 err有错误返回错误 resut 返回结果，是一个数组
      if(err)throw err;
      // 跨域设置相应响应头
    //   res.set({
    //       // 应用类型
    //       'Content-Type':'application/json',
    //       'Access-Control-Allow-Origin':'*'
    //   })
    console.log('list',result)
        res.send(result)
    })
  })





//###四、导出路由器对象！才可以供服务器导入并使用
module.exports=router;