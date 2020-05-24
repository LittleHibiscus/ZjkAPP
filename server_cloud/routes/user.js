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
const fs=require('fs')
// const JwtUtil=require('../jwttt.js');
// const jwt=require('../jwt.js')
// 1.1创建路由器
var router=express.Router();
// ###三、添加路由。处理get或者post请求
const jwt = require('jsonwebtoken')
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
    var {uname,upwd}=req.body;
    var sql = "SELECT uid FROM users WHERE uname = ?";
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
          res.send({code:-2,msg:"用户名已存在"});
        }
        else{
          //(2)创建sql语句插
         //   注册时，密码加密
          var sql='INSERT INTO users VALUES (null,?,md5(?),null)'
          //(3)执行sql语句
          pool.query(sql,[uname,upwd],(err,result)=>{
          if(err)throw err;
          //(4)获取执行结果
          //(5)判断查询是否成功 result.length
          if(result.affectedRows>0){
            res.send({code:200,msg:"注册成功"});
          }else{
            res.send({code:-1,msg:"注册失败"}); 
          }
        })
      }
 })
});
// 管理员注册
router.post('/adminReg',(req,res)=>{
    var {aname,apwd}=req.body;
    var sql = "SELECT * FROM admin WHERE aname = ?";
    pool.query(sql,[aname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
          res.send({code:-2,msg:"用户名已存在"});
        }
        else{
          //(2)创建sql语句插
          var sql='INSERT INTO admin VALUES (null,?,?,null)'
          //(3)执行sql语句
          pool.query(sql,[aname,apwd],(err,result)=>{
          if(err)throw err;
          //(4)获取执行结果
          //(5)判断查询是否成功 result.length
          if(result.affectedRows>0){
            res.send({code:200,msg:"管理员注册成功"});
           }else{
            res.send({code:-1,msg:"注册失败"}); 
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

// 登录post
router.post('/login',(req,res) => {
 var {uname,upwd}=req.body;
    //  登录查询时，密码需要加密
    var sql='SELECT * FROM users WHERE  uname=? AND upwd=md5(?)';
    // 执行sql语句
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) {console.log(err);}
        // 登录成功，生成token
        else{
            //获取执行结果，查询是否成功 result.length>0
            if(result.length>0){ 
                     // 登陆成功，添加token
                    var payload={...result};
                    //创建密钥
                    var  seccret = "jwttoken"
                    //创建token
                    var  token = jwt.sign(payload,seccret,{
                        expiresIn:"7d" ,   //到期时间7d(7天) 12h  120=120ms 提供三种单位
                        issuer:"liuxiaorong"     //发行人
                     })
                    jwt.verify(token,seccret,(error,decoded)=>{
                        if(error){console.log(error)}     
                        // 将携带用户信息的token传递给前端
                       res.send({code:200,msg:'登录成功，token解析出来的用户信息',data:result,decoded,token})
                    })
              }else{
                res.send({code:-1,msg:'用户名或密码不正确'})
             } 
        }
    })
});
// 管理员登录
router.post('/adminLogin',(req,res) => {
 var {aname,apwd}=req.body;
    var sql='SELECT * FROM admin WHERE  aname=? AND apwd=?';
    // (3)执行sql语句
    pool.query(sql,[aname,apwd],(err,result)=>{
        if(err) {console.log(err);
         res.send({code:-1,msg:'登录失败！'})
        }
        else{
            // (4)获取执行结果，查询是否成功 result.length
            if(result.length>0){
                     // 登陆成功，添加toke
                //     var payload={...result};
                //         //3创建密钥
                //   var  seccret = "jwttoken"
                //     // 4、创建token
                //   var  token = jwt.sign(payload,seccret,{
                //         expiresIn:"1h" ,   //到期时间7d(7天) 12h  120=120ms 提供三种单位
                //         issuer:"liuxiaorong"     //发行人
                //      })
                //   console.log('我的token',token)
                    // 解析token
            //      jwt.verify(token,seccret,(error,decoded)=>{
            //             if(error){
            //                 console.log(error)
            //             }
            //     console.log("校验",decoded)           
            //     res.send({code:1,msg:'登录成功，token解析出来的用户信息',decoded,token})
            // })
            console.log('管理员',result)
            res.send({code:1,msg:'管理员',data:result})
         }
         else{
                res.send({code:-3,msg:'用户名或密码不正确'})
                // console.log('token',result)
             }
           
        }
    })
});
// 管理员列表
router.get('/adminList',(req,res)=>{
    var sql='SELECT * FROM admin'
    pool.query(sql,(err,result)=>{
        if (err) throw err;
        else{
            res.send({code:1,msg:'查询成功',data:result})
        }
    })
});
// 删除某个管理员
router.get('/adminDel',(req,res)=>{
    var aid=req.query.aid
    var sql='DELETE   FROM admin WHERE aid=?'
    pool.query(sql,[aid],(err,result)=>{
        if (err) throw err;
        else{
            res.send({code:1,msg:'删除成功',data:result})
        }
    })
});
// 注销
// router.get('/logout',(req,res)=>{

// })
// 修改密码，获取原用户密码
router.get('/update',(req,res)=>{
    // 获取用户名和密码
    var {uname}=req.query;
    var sql='SELECT * FROM users WHERE uname=?'
    pool.query(sql,[uname],(err,result)=>{
        if (err) throw err;
        else{
            console.log('查询指定用户',result)
            res.send({code:1,msg:'查询指定用户',data:result})
        }
    })
});
// 修改密码，新密码替换原来的密码
router.get('/update1',(req,res)=>{
    // 获取用户名和密码
    var {upwd,uid}=req.query;
    var sql='UPDATE users SET upwd=? WHERE uid=?'
    pool.query(sql,[upwd,uid],(err,result)=>{
        if (err) throw err;
        else{
            console.log('修改密码',result)
            if(result.affectedRows>0){

                res.send({code:1,msg:'修改密码成功',data:result})
            }else{
                res.send({code:1,msg:'修改失败',data:result})
            }
        }
    })
});
//  })

// 删除指定用户
router.get('/del',(req,res)=>{
    // 获取uid
    var uid=req.query.uid
    var sql='DELETE  FROM users WHERE uid=?'
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        console.log('删除用户',result)
        res.send({code:1,msg:'删除用户',data:result})
    })

})
//用户头像
router.post('/userInfo',(req,res)=>{
    // 头像参数
    var avator=req.body.avator;
    var dataBuffer=Buffer.from(avator,'base64')// 存入buffer缓冲区
    // sql语句
    var sql=`INSERT INTO user_info VALUES(null,?)`;
    pool.query(sql,[avator],(err,result)=>{
       if(err) throw err;
       else{
           if(result.affectedRows>0){
            //存到服务器的位置   
            fs.writeFile(__dirname+`../../public/images/user/avator.png`,dataBuffer,function(err){
                if(err) throw err;  
                console.log('avator',result)
            res.send({code:1,msg:'avator单表 来啦',data:result,dataBuffer})
            }) 
           }else{
               res.send({code:-1,msg:'设置上传头像失败'})
           }  
       }
    })  
});
router.post('/userInfo1',(req,res)=>{
    // 头像参数
    var avator=req.body.avator;
    var uname=req.body.uname;
    // var dataBuffer=Buffer.from(avator,'base64')// 存入buffer缓冲区
    // sql语句
    var sql='UPDATE users SET avator=? WHERE uname=?';
    pool.query(sql,[avator,uname],(err,result)=>{
       if(err) throw err;
       else{
           if(result.affectedRows>0){
            //存到服务器的位置   
            // fs.writeFile(__dirname+`../../public/images/user/avator.png`,dataBuffer,function(err){
            //     if(err) throw err;  
            //     console.log('avator',result)
            res.send({code:1,msg:'上传头像到user成功',data:result,})
            // }) 
           }else{
               res.send({code:-1,msg:'设置上传头像失败',data:result})
           }  
       }
    })  
});
// 用户头像查询
// router.get('/userInfo1',(req,res)=>{
//     var sql=`SELECT * FROM user_info`;
//     pool.query(sql,(err,result)=>{
//        if(err) throw err;
//        else{ 
//             console.log('avator',result)
//            res.send({code:1,msg:'avator来啦111',data:result})
//            }    
//     })  
// });
// 修改用户表的用户头像
router.post('/userInfo2',(req,res)=>{
    var avator=req.body.avator;
    var uid=req.body.uid;
    // var dataBuffer=Buffer.from(avator,'base64')// 存入buffer缓冲区
    var sql='UPDATE users SET avator=? WHERE uid=?';
    pool.query(sql,[avator,uid],(err,result)=>{
       if(err) throw err;
       else{ 
           if(result.affectedRows>0){ 
               if(err) throw err;
            //   fs.writeFile(__dirname+`../../public/images/user/avator.png`,dataBuffer,function(err){
            //   console.log('avator',result)
              res.send({code:1,msg:'修改指定用户的头像成功',data:result})
            // }) 
           }else{
            res.send({code:-1,msg:'修改用户头像失败',data:result})
           }         
           }    
    })  
});
// -------------------------3.用户列表-----------------
router.get('/list',(req,res)=>{
    // var uid=req.query.uid;
    var sql='SELECT * FROM users'
    pool.query(sql,(err,result)=>{
      //  回调函数 err有错误返回错误 resut 返回结果，是一个数组
      if(err)throw err;
        res.send({code:1,msg:'用户列表',data:result})
    })
  });
//   按uid查找用户
router.get('/list1',(req,res)=>{
    var uid=req.query.uid;
    var sql='SELECT * FROM users WHERE uid=?'
    pool.query(sql,[uid],(err,result)=>{
      //  回调函数 err有错误返回错误 resut 返回结果，是一个数组
      if(err)throw err;
        res.send({code:1,msg:'用户列表',data:result})
    })
  });
//   按uid更新用户---管理员测试
router.get('/list1_update1',(req,res)=>{
    var{uname,uid}=req.query;
    var sql='UPDATE users SET uname=? WHERE uid=?'
    pool.query(sql,[uname,uid],(err,result)=>{
      //  回调函数 err有错误返回错误 resut 返回结果，是一个数组
      if(err)throw err;
      if(result.affectedRows>0){
          res.send({code:1,msg:'修改用户成功',data:result})
      }else{
        res.send({code:-1,msg:'修改用户失败',data:result})
      }
       
    })
  });
//用户收藏插入
router.get('/userCollect',(req,res)=>{
  //  
  var uid=''; 
  var{title,des,img}=req.query;
  var sql='INSERT INTO user_collect VALUES(NULL,?,?,?,?)'
  pool.query(sql,[uid,title,des,img],(err,result)=>{
      if(err) throw err;
      console.log('添加收藏',result)
      res.send({code:1,msg:'添加收藏',data:result})
  })
});
//用户收藏取消收藏
router.get('/userCollect_del',(req,res)=>{
  var{title}=req.query;
  var sql='DELETE  FROM user_collect WHERE title=?'
  pool.query(sql,[title],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
                console.log('取消收藏',result)
      res.send({code:1,msg:'取消收藏成功',data:result})
      }else{
        res.send({code:-1,msg:'取消收藏失败',data:result})
      }

  })
});
//用户收藏列表查询
router.get('/userCollectList',(req,res)=>{
    //  
    // var uid=''; 
    var sql='SELECT * FROM user_collect'
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        console.log('收藏列表',result)
        res.send({code:1,msg:'收藏列表',data:result})
    })
  });




//###四、导出路由器对象！才可以供服务器导入并使用
module.exports=router;