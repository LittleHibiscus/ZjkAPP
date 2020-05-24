//**************创建数据库连接池对象pool****************
/*步骤：
1.引入连接数据库所需的第三方模块require(mysql)
2.创建连接池对象并建立连接
3.导出连接池对象，供路由器使用
*/
// 连接池对象
// npm install mysql
const mysql=require('mysql')
module.exports=mysql.createPool({
    host:'w.rdc.sae.sina.com.cn',//主机
    user:'4wkxn31xnx',//用户名root
    password:'l4ylhj3kzy1hh22wl01hyyxkmkxxj31i0wik3zyj',//密码空
    database:'app_zjktravel',//数据库名
    //设置连接池大小，默认大小为15
    connectionLimit:20
})