// ——---------------------------------首页模块
//###一.创建路由器，引入express模块
const express=require('express');
//###二、引入创建好的连接池模块,引入上一级目录../
const pool=require('../pool.js');
const path = require('path')
//uuid工具可以生成唯一标示 需要安装
const UUID = require('uuid')
const multer = require('multer')
var fs = require('fs');
var multiparty = require('multiparty');
//uuid工具可以生成唯一标示 需要安装
var formidable = require('formidable');
// 1.1创建路由器
var router=express.Router();




// ###三、添加路由。处理get或者post请求
// 首页项目分页查询
router.get('/indexItem1',(req,res)=>{
    // 参数 页码pno，页大小pageSize
    var pno=req.query.pno;
    var ps=req.query.pageSize
    // 设置默认值pno=1 pageSIZE=5.第一页每页显示5条数据
    if(!pno){pno=1}
    if(!ps){ps=5}
    // 分页查询 LIMIT ?,? 参数说明（从第几项开始=（pno-1）*pageSize）,(查询几页，页大小=ps)
    var off=(pno-1)*parseInt(ps);
    // 创建sql语句
    var sql='SELECT * FROM index_item LIMIT ?,?';
    pool.query(sql,[off,ps],(err,result)=>{
        if (err) throw err; 
        else{
            res.send({code:1,msg:'查询成功',data:result})
            console.log('index_item',result)
        }
    })
});
// 首页项目总
router.get('/indexItem',(req,res)=>{
    // 参数 页码pno，页大小pageSize
    // var pno=req.query.pno;
    // var ps=req.query.pageSize
    // 设置默认值pno=1 pageSIZE=5.第一页每页显示5条数据
    // if(!pno){pno=1}
    // if(!ps){ps=10}
    // 分页查询 LIMIT ?,? 参数说明（从第几项开始=（pno-1）*pageSize）,(查询几页，页大小=ps)
    // var off=(pno-1)*parseInt(ps);
    // 创建sql语句
    var sql='SELECT * FROM index_item';
    pool.query(sql,(err,result)=>{
        if (err) throw err; 
        else{
            res.send({code:1,msg:'查询成功',data:result})
            console.log('index_item',result)
        }
    })
});
// 首页删除某个项目
router.get('/indexDel',(req,res)=>{
    // 创建sql语句
    var iid=req.query.iid
    var sql='DELETE FROM  index_item WHERE iid=?';
    pool.query(sql,[iid],(err,result)=>{
        if (err) throw err; 
        else{
            if(result.affectedRows>0){
                     res.send({code:1,msg:'删除成功',data:result})
            }else{
                res.send({code:-1,msg:'删除失败',data:result})
            }
       
           
        }
    })
});
// 首页插入项目
router.get('/indexInsert',(req,res)=>{
     var {iid,title,subtitle,pic,price,href,labela,labelb,labelc}=req.query
    // 创建sql语句
    var sql=`INSERT INTO index_item VALUES(?,?,?,?,?,?,?,?,?)`;
    // var sql=`INSERT INTO index_item VALUES(null,'${title}','${subtitle}','${pic}',${price},'${href}=null','${labela}','${labelb}')`;
    // var a=${iid}
    // href=iid
    pool.query(sql,[iid,title,subtitle,pic,price,href,labela,labelb,labelc],(err,result)=>{
    // pool.query(sql,[iid,title,subtitle,pic,price,href==iid,labela,labelb],(err,result)=>{
        // [iid,title,subtitle,pic,price,href,labela,labelb,labelc]
        if (err) throw err; 
        else{
            if(result.affectedRows>0){
                     res.send({code:1,msg:'插入成功',data:result})
            }else{
                res.send({code:-1,msg:'插入失败',data:result})
            }
       
           
        }
    })
});
// 管理有台后台加入首页数据，首页详情相关联--错 href 如何获得----20204-14
// router.get('/indexInsert',(req,res)=>{
//      var {iid,title,subtitle,pic,price,href,labela,labelb,labelc,did}=req.query
//     // 创建sql语句
//     var sql=`INSERT INTO index_item VALUES(${title}','${subtitle}','${pic}',${price},${href},'${labela}','${labelb}') AND INSERT INTO index_detail VALUES(${did},null,null,null,null,null)`;
//     pool.query(sql,[iid,title,subtitle,pic,price,href,labela,labelb,did],(err,result)=>{
//         // [iid,title,subtitle,pic,price,href,labela,labelb,labelc]
//         if (err) throw err; 
//         else{
//             if(result.affectedRows>0){
//                      res.send({code:1,msg:'插入成功',data:result})
//             }else{
//                 res.send({code:-1,msg:'插入失败',data:result})
//             }
       
           
//         }
//     })
// });
// 首页查找某个项目 按iid
router.get('/index_iid',(req,res)=>{
    var iid=req.query.iid;
   // 创建sql语句
   var sql=`SELECT * FROM index_item  WHERE iid=?`;
   pool.query(sql,[iid],(err,result)=>{
       // [iid,title,subtitle,pic,price,href,labela,labelb,labelc]
       if (err) throw err; 
       else{
        res.send({code:1,msg:'查找指定iid首页',data:result})
       }
    
   })
});
// 首页修改项目
router.get('/indexUpdate',(req,res)=>{
     var {iid,title,subtitle,pic,price,href,labela,labelb}=req.query
    // 创建sql语句
    var sql=`UPDATE index_item  SET title=?,subtitle=?,pic=?,price=?,labela=?,labelb=? WHERE iid=?`;
    pool.query(sql,[title,subtitle,pic,price,labela,labelb,iid],(err,result)=>{
        // [iid,title,subtitle,pic,price,href,labela,labelb,labelc]
        if (err) throw err; 
        else{
            if(result.affectedRows>0){
                     res.send({code:1,msg:'更新成功',data:result})
            }else{
                res.send({code:-1,msg:'更新失败',data:result})
            } 
       
           
        }
    })
});
// 首页详情查询
router.get('/indexDetail',(req,res)=>{
    // 参数 did 详情id
    var did=req.query.did;
    // sql语句
    var sql='SELECT * FROM index_item,index_detail WHERE index_detail.did=? AND index_item.href=index_detail.did'
   //执行
   pool.query(sql,[did],(err,result)=>{
       if (err) throw err;
       else{
           res.send({code:1,msg:'查询成功',data:result});
           console.log('index_detail',result)
       }

   })    
})

// 特产首页展示
router.get('/foodItem',(req,res)=>{
        // 参数 页码pno，页大小pageSize
        var pno=req.query.pno;
        var ps=req.query.pageSize
        // 设置默认值pno=1 pageSIZE=5.第一页每页显示5条数据
        if(!pno){pno=1}
        if(!ps){ps=7}
        // 分页查询 LIMIT ?,? 参数说明（从第几项开始=（pno-1）*pageSize）,(查询几页，页大小=ps)
        var off=(pno-1)*parseInt(ps);
        // 创建sql语句
        var sql='SELECT * FROM food_item LIMIT ?,?';
        pool.query(sql,[off,ps],(err,result)=>{
            if (err) throw err; 
            else{
                res.send({code:1,msg:'查询成功',data:result})
                console.log('food_item',result)
            }
        })
})
// 特产详情查询
router.get('/foodDetail',(req,res)=>{
    // 参数 did 详情id
    var did=req.query.did;
    // sql语句
    var sql='SELECT * FROM  food_item,food_detail WHERE food_detail.did=? AND food_item.href=food_detail.did'
   //执行
   pool.query(sql,[did],(err,result)=>{
       if (err) throw err;
       else{
           res.send({code:1,msg:'查询成功',data:result});
           console.log('food_detail',result)
       }

   })    
});
// 按标题或者描述模糊查询
router.get('/searchIndex',(req,res)=>{
    // 输入的值
    var value=req.query.value
    // 查询语句
    var sql=`SELECT * FROM index_item WHERE title like '%${value}%'`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            //   var rows=JSON.stringify(result)
        res.send({code:1,msg:'模糊查到',data:result})
        }else{
            res.send({code:404,msg:'没找到'})
        }
      
    })
});
// 按标题或者描述模糊查询
router.get('/searchRecommed',(req,res)=>{
    // 输入的值
    var value=req.query.value
    // 查询语句
    var sql=`SELECT * FROM recommendItem_list WHERE  item_title like '%${value}%'`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            // var rows=JSON.stringify(result)
        res.send({code:1,msg:'模糊查到',data:result})
        }else{
            res.send({code:404,msg:'没找到'})
        }
      
    })
});
// 推荐页列表 张家口 张北
router.get('/recommend_list',(req,res)=>{
    var sql='SELECT * FROM  recommend_list'
    pool.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result)
        res.send({code:1,msg:'推荐列表',data:result})
    })
});
//推荐页详细列表
router.get('/recommendItem_list',(req,res)=>{
    var spec=req.query.spec
    var sql='SELECT * FROM  recommend_list,recommendItem_list WHERE recommend_list.spec=recommendItem_list.spec AND recommend_list.spec=?'
    pool.query(sql,[spec],(err,result)=>{
        if (err) throw err;
        console.log(result)
        res.send({code:1,msg:'详细推荐列表',data:result})
    })
});
//推荐页详细列表 无参数
router.get('/recommendItem_list1',(req,res)=>{
    var sql='SELECT * FROM  recommend_list,recommendItem_list WHERE recommend_list.spec=recommendItem_list.spec'
    pool.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result)
        res.send({code:1,msg:'详细推荐列表无参数',data:result})
    })
});
// 推荐页详细列表 分页
router.get('/recommendItem_list1_page',(req,res)=>{
    // 参数 页码pno，页大小pageSize
    var pno=req.query.pno;
    var ps=req.query.pageSize
    // 设置默认值pno=1 pageSIZE=5.第一页每页显示5条数据
    if(!pno){pno=1}
    if(!ps){ps=5}
    // 分页查询 LIMIT ?,? 参数说明（从第几项开始=（pno-1）*pageSize）,(查询几页，页大小=ps)
    var off=(pno-1)*parseInt(ps);
    // 创建sql语句
     var sql='SELECT * FROM  recommend_list,recommendItem_list WHERE recommend_list.spec=recommendItem_list.spec LIMIT ?,?';
    pool.query(sql,[off,ps],(err,result)=>{
        if (err) throw err; 
        else{
            res.send({code:1,msg:'查询推荐列表分页成功',data:result})
            // console.log('index_item',result)
        }
    })
});
//推荐页详细列表每一个
router.get('/recommendItem_list_every',(req,res)=>{
    var href=req.query.href
    var sql='SELECT * FROM  recommend_list,recommendItem_list WHERE recommend_list.spec=recommendItem_list.spec AND recommendItem_list.href=?'
    pool.query(sql,[href],(err,result)=>{
        if (err) throw err;
        console.log(result)
        res.send({code:1,msg:'详细推荐列表每一个',data:result})
    })
});

// 添加评论 
router.post('/comment',(req,res)=>{
    // 参数,用户名，商品id,评论
    var {uname,iid,title,comment,time}=req.body;
    var sql='INSERT INTO detail_comment VALUES(NULL,?,?,?,?,?)'
    pool.query(sql,[uname,iid,title,comment,time],(err,result)=>{
        if(err) throw err
        console.log('用户评论',result)
        if(result.affectedRows>0){
            res.send({code:200,msg:"评论成功"});
          }
    })
});
//加载所有评论列表，设置显示条数
router.get('/commentList',(req,res)=>{
    // 参数 页码pno(pagenum),页大小ps(pagesize)
    // var {pno,ps}=req.query
    // // 设置默认pno=1,ps=4
    // if(!pno){pno=1}
    // if(!ps){ps=3}
    //计算第一问号值 LIMIT ?(从几开始(pno-1)*pageSize),?(查询几行-页大小ps)
    // var off=(pno-1)*ps;
    // 对ps转int
    // ps=parseInt(ps)
    // var sql='SELECT * FROM detail_comment LIMIT ?,? AND ORDER BY time DESC'
    var sql='SELECT * FROM detail_comment  ORDER BY time DESC'
    // pool.query(sql,[off,ps],(err,result)=>{
    pool.query(sql,(err,result)=>{
        if(err) throw err
        console.log('用户评论列表',result)
        // if(result.lenght>0){
            res.send({code:200,msg:"评论加载成功",data:result});
        //   }else{
            // res.send({code:201,msg:"还没有评论哦"});
        //   }
    })
});
//加载所有评论列表，设置显示条数
router.get('/commentList1',(req,res)=>{
    var sql='SELECT * FROM detail_comment'
    // pool.query(sql,[off,ps],(err,result)=>{
    pool.query(sql,(err,result)=>{
        if(err) throw err
        console.log('用户评论列表',result)
        // if(result.lenght>0){
            res.send({code:200,msg:"评论加载成功",data:result});
        //   }else{
            // res.send({code:201,msg:"还没有评论哦"});
        //   }
    })
});
// 查询指定旅游地点的评论列表
router.get('/commentList_iid',(req,res)=>{
    var iid=req.query.iid;
    var sql='SELECT * FROM detail_comment WHERE iid=?   ORDER BY time DESC'
    pool.query(sql,[iid],(err,result)=>{
        if(err) throw err
        console.log('id评论',result)
        res.send({code:1,msg:`${iid}评论列表`,data:result})

    })
});
// 评论详情
router.get('/commentList_id1',(req,res)=>{
    var id=req.query.id;
    var sql='SELECT * FROM detail_comment WHERE id=?'
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err
        console.log('id评论',result)
        res.send({code:1,msg:`${id}评论列表6666`,data:result})

    })
});
// 查询指定旅游地点的评论列表
router.get('/commentList_iid1',(req,res)=>{
    var value=req.query.value;
    var sql=`SELECT * FROM detail_comment WHERE iid LIKE '%${value}%' OR title LIKE '%${value}%'`
    pool.query(sql,[value],(err,result)=>{
        if(err) throw err
        console.log('id评论',result)
        res.send({code:1,msg:`评论列表`,data:result})

    })
});
// ------------------上传首页项目-------------------
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null,file.originalname);
    }
});
// 创建文件夹
var createFolder = function (folder) {
    try {
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    } catch (e) {
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};
// 创建文件夹上传路径
var uploadFolder = './public/upload';
  createFolder(uploadFolder);
// 创建mutter对象
	
var upload = multer({ storage: storage });
// 上传接口
router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    // 接收文件成功后返回数据给前端
    // res.json({ res_code: '0', name: file.originalname, url: file.path });
    // res.send({res_code: '0', name: file.originalname, url: file.path,data:file})
    res.send({res_code: '0', name: file.originalname, url: file.path})
});
// 度假村
// 按标题或者描述模糊查询
router.get('/duJia',(req,res)=>{
    // 输入的值
    // var value=req.query.value
    // 查询语句
    var sql=`SELECT * FROM recommendItem_list WHERE  item_title like '%度假村%'`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            // var rows=JSON.stringify(result)
        res.send({code:1,msg:'模糊查到',data:result})
        }else{
            res.send({code:404,msg:'没找到'})
        }
      
    })
});
module.exports=router