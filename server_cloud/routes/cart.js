// 购物车模块// ——---------------------------------首页模块
//###一.创建路由器，引入express模块
const express=require('express');
//###二、引入创建好的连接池模块,引入上一级目录../
const pool=require('../pool.js');
// 1.1创建路由器
var router=express.Router();

// ###三、添加路由。处理get或者post请求
// 添加购物车

router.get('/addCart',(req,res)=>{
    //插入购物表中的参数
    var {id,uid,iid,img,title,uname,phone,address,price,adult,child,adultCount,childCount,count}=req.query 
   // 查询指定用户是否购买过此商品
    var sql='SELECT * FROM cart WHERE uid=? AND iid=?'
      // 执行sql
      pool.query(sql,[uid,iid],(err,result)=>{
        if (err) throw err
        // 该用户没有购过过该商品
        if(result.length==0){
            var sql=`INSERT INTO cart VALUES(null,${uid},${iid},'${img}','${title}','${uname}',null,null,${price},${adult},${child},${adultCount},${childCount},1)`
        }
        // 该用户购买过次商品，数量加1,更新表
        else{
           var sql=`UPDATE cart SET count=count+1 WHERE uid=${uid} AND iid=${iid}`
        }
        pool.query(sql,(err,result)=>{
            if (err) throw err; 
                else{
                    res.send({code:1,msg:'加入用户购物车成功',data:result})
                    console.log('userOrdert-----conut',result)
                }
        })
    })
});
// 修改购物车数量，成人
router.get('/cartCountUpdate',(req,res)=>{
    var {adultCount,id}=req.query;
    var sql=`UPDATE cart SET adultCount=? WHERE id=?`
    pool.query(sql,[adultCount,id],(err,result)=>{
        if (err) throw err; 
        else{
            res.send({code:1,msg:'修改购物车数量成功',data:result})
            console.log('userOrdert-----conut',result)
        }
    })
})
// 修改购物车数量，儿童
router.get('/cartCountUpdate1',(req,res)=>{
    var {childCount,id}=req.query;
    var sql=`UPDATE cart SET childCount=? WHERE id=?`
    pool.query(sql,[childCount,id],(err,result)=>{
        if (err) throw err; 
        else{
            res.send({code:1,msg:'修改购物车数量成功',data:result})
            console.log('userOrdert-----conut',result)
        }
    })
})
// 购物车列表查询全部
router.get('/cartList',(req,res)=>{
    // var sql='SELECT * FROM cart,index_item,index_detail WHERE index_item.href=index_detail.did';
    var sql='SELECT * FROM cart';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        else{
            res.send({code:1,msg:'购物车列表',data:result})
            console.log('cartlist',result)
        }
    })
});
// 购物车列表查询，按iid,id查询
router.get('/cartList_id',(req,res)=>{
    // var sql='SELECT * FRfOM cart,index_item,index_detail WHERE index_item.href=index_detail.did';
    var iid=req.query.iid
    var sql='SELECT * FROM cart WHERE iid=?';
    pool.query(sql,[iid],(err,result)=>{
        if(err) throw err;
        else{
            res.send({code:1,msg:'购物车列表',data:result})
            console.log('cartlist',result)
        }
    })
});
// 删除一个指定购物车里的商品
router.get('/cartDel',(req,res)=>{

    // 1获取购物车id
    var id=req.query.id;
    // 2 sql语句
    var sql='DELETE FROM cart WHERE id=?'
    // 3执行
    pool.query(sql,[id],(err,result)=>{
     if(err)throw err;
     if(result.affectedRows>0){
         res.send({code:1,msg:'删除成功'})
     }else{
        res.send({code:-1,msg:'删除失败'})
     }
    })
});
// 删除多选后的很多商品
router.get('/cartDelAll',(req,res)=>{
    // 1获取购物车id，多选后获取的是一组id 1,2,,3,4
    var id=req.query.id;
    // 2 sql语句,获取的是范围，用IN 
    var sql=`DELETE FROM cart WHERE id IN(${id})`
    // 3执行
    pool.query(sql,[id],(err,result)=>{
     if(err)throw err;
     if(result.affectedRows>0){
         res.send({code:1,msg:'将全选的删除成功',data:result})
     }else{
        res.send({code:-1,msg:'删除失败',data:result})
     }
    })
});
// -------------------------------用户订单----------------------------------
// 插入用户订单
router.get('/userOrder',(req,res)=>{
    var {id,uid,iid,title,uname,phone,totalprice,orderState,img,count,createtime,time}=req.query
    // 执行sql
    var sql=`INSERT INTO user_order VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`
    pool.query(sql,[id,uid,iid,title,uname,phone,totalprice,orderState,img,count,createtime,time],(err,result)=>{
        if (err) throw err
        if(result.affectedRows>0){
            res.send({code:1,msg:'加入用户订单成功',data:result})
            console.log('userOrdert-----conut',result)
        }else{
            res.send({code:1,msg:'加入用户订单失败',data:result})
            console.log('userOrdert-----conut',result)
        }
    }) 
});
// 查看已经支付成功的订单
router.get('/userOrder_suc',(req,res)=>{
    // 执行sql
    var id=req.query.id;
    var sql=`SELECT * FROM user_order WHERE id=? AND orderState=1`
    pool.query(sql,[id],(err,result)=>{
        if (err) throw err
            res.send({code:1,msg:'订单成功,按id',data:result})
            console.log('userOrdert-----conut',result)
      
    }) 
});
// 修改订单状态，支付/取消未支付
router.get('/changeOrderStatus',(req,res)=>{
    var {orderState,uid,title}=req.query;
    var sql='UPDATE user_order SET orderState=? WHERE uid=? AND title=?'
    pool.query(sql,[orderState,uid,title],(err,result)=>{
        if (err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'修改用户订单状态成功',data:result})
        }
        else{
            res.send({code:-1,msg:'修改用户订单状态失败',data:result})

        }
    })
});
// 查询全部订单,支付后查看当前用户，当前旅游地点的订单
router.get('/userOrderList',(req,res)=>{
    var {iid,uid,time}=req.query;
    // var sql='SELECT * FROM user_order WHERE uid=?';
    var sql='SELECT * FROM user_order WHERE iid=? AND uid=? AND time=?';
    pool.query(sql,[iid,uid,time],(err,result)=>{
        if(err) throw err;
        else{
            res.send({code:1,msg:'用户订单列表',data:result})
            console.log('userOrderList',result)
        }
    })
});
// 后台管理--查询所有订单
router.get('/userOrderListAll',(req,res)=>{
    // var {uid}=req.query;
    // var sql='SELECT * FROM user_order WHERE uid=? ORDER BY time DESC';
    var sql='SELECT * FROM user_order';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        else{
            res.send({code:1,msg:'用户全部订单列表',data:result})
            console.log('userOrderList',result)
        }
    })
});
// 查询该用户全部订单
router.get('/userOrderList1',(req,res)=>{
    var {uid}=req.query;
    // var sql='SELECT * FROM user_order WHERE uid=? ORDER BY time DESC';
    var sql='SELECT * FROM user_order WHERE uid=?';
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        else{
            res.send({code:1,msg:uid+'用户全部订单列表',data:result})
            console.log('userOrderList--uid',result)
        }
    })
});
// 查询该用户uid,未支付的订单，orderState=0
router.get('/userOrderList_uid0',(req,res)=>{
    var {uid}=req.query;
    // var sql='SELECT * FROM user_order WHERE uid=? ORDER BY time DESC';
    var sql='SELECT * FROM user_order WHERE uid=? AND orderState=0';
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        else{
            res.send({code:1,msg:uid+'未支付的订单',data:result})
            console.log('userOrderList--uid',result)
        }
    })
});
// 未支付转支付
router.get('/transPay',(req,res)=>{
    var {iid,id}=req.query;
    // var sql='SELECT * FROM user_order WHERE uid=? ORDER BY time DESC';
    var sql='SELECT * FROM user_order WHERE iid=? AND id=?';
    pool.query(sql,[iid,id],(err,result)=>{
        if(err) throw err;
        else{
            res.send({code:1,msg:'未支付转支付',data:result})
            console.log('未支付转支付',result)
        }
    })
});
module.exports=router