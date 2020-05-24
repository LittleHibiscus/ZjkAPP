// 引入模块依赖
// npm i fs path --save
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

//生成token
function generateToken(data){
	//获得token创建的当前时间，用于计算过期时间
    let created = Math.floor(Date.now() / 1000);//秒
    //从硬盘上读取私钥，准备加密
    let cert = fs.readFileSync(path.join(__dirname, './pem/rsa_private_key.pem'));//私钥 可以自己生成
    //调用jwt的签名方法，生成data用户对象，data从外面传进来的
	let token = jwt.sign({
        data,//封装了用户对象
        exp: created + 60 * 60,//过期时间exp 一小时 60分*60s
    }, cert, {algorithm: 'RS256'});
    return token;
 
}

// 校验token
function verifyToken(token) {
	//公钥解密，

    let cert = fs.readFileSync(path.join(__dirname, './pem/rsa_public_key.pem'));//公钥 可以自己生成
    let res;
    try {

        if(token!==undefined){
			//	//jwt。verrify解密
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
             res = result.data || {};//结果就是把数据返回
        }
    } catch (e) {
        res = e;
    }
    return res;//返回编译后的对象
}

module.exports = { generateToken, verifyToken };