SET NAMES UTF8;
/*DROP DATABASE IF EXISTS appserver;*/
/*CREATE DATABASE appserver CHARSET=UTF8;*/
/*USE appserver;*/
/*用户信息表*/
CREATE TABLE users(
    uid INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    uname VARCHAR(32) NOT NULL,
    upwd VARCHAR(32) NOT NULL,
    avator mediumtext NULL
);
/*管理员注册表*/
CREATE table admin(
    aid INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    aname VARCHAR(32) NOT NULL,
    apwd VARCHAR(32) NOT NULL,
    avator mediumtext NULL
);
INSERT INTO admin VALUES(NULL,'admin','admin',null);
/*用户头像*/
CREATE TABLE user_info(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    avator mediumtext NOT NULL
);
CREATE TABLE user_collect(
    id  INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    uid INT NOT NULL,
    title VARCHAR(128),
    des VARCHAR(128),
    img VARCHAR(128)
);
/*首页展示 首页项目*/
CREATE TABLE index_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,/*项目id*/
  title VARCHAR(64),/*主标题*/
  subtitle VARCHAR(128),/*副标题*/
  pic VARCHAR(256),/*首页项目图片*/
  price DECIMAL(10,2),/*价格*/
  href VARCHAR(10),/*与首页相应详情绑定*/
  labela VARCHAR(10),/*标签*/
  labelb VARCHAR(10),/*标签*/
  labelc VARCHAR(10)/*标签*/
);
/*用户表插入数据*/
/*用户评论商品详情*/
CREATE TABLE detail_comment(
    id INT PRIMARY KEY AUTO_INCREMENT,/*评论列表id*/
    uname VARCHAR(20) NOT NULL,
    iid INT NOT NULL,/*商品id*/
    title VARCHAR(128),/*商品名称*/
    comment VARCHAR(256),/*评论内容*/
    time INT
);

/*首页展示插入数据*/
INSERT INTO index_item VALUES
(NULL,'万龙滑雪场','万龙滑雪场位于河北省张家口市崇礼区红花梁，占地面积30余平方公里，最高处海拔2110.3 米，自然落差580米，半数以上为高级道，初中级道较少。由于拥有超过400台造雪机，造雪能力出众，也是崇礼每年雪季开放时间最长的雪场。',
'images/index/wanlong.jpg',177,'1','雪况优质','滑雪期长','美食丰富'),
(NULL,'云顶密苑滑雪场','云顶密苑滑雪场位于河北省张家口市崇礼区，由于是冬奥会的赛场，除了拥有公园和追逐赛赛道以外，还建有崇礼雪场独一无二的标准尺寸的U型池。',
'images/index/wanlong.jpg',177,'2','酒店舒适','缆车设施好','冬奥会赛场'),
(NULL,'太舞滑雪小镇','太舞滑雪小镇，总用地面积40平方公里，是我国目前规模最大的综合滑雪度假区，更是2022年冬奥会项目主场。',
'images/index/taiwu.jpg',177,'3','欧美风情','缆车设施好','美食丰富'),
(NULL,'富龙滑雪场','富龙滑雪场是目前为止中国第一家城市中以家庭、儿童为主要特色的大型休闲滑雪度假区。也是崇礼唯一一家开放夜场的滑雪场，滑雪公园也修建得比较大，距离县城最近，对住在县城的滑雪者来说比较方便。',
'images/index/wanlong.jpg',177,'4','距离崇礼县城最近','夜场滑雪','滑雪公园优秀'),
(NULL,'多乐美地滑雪场','多乐美地滑雪场位于河北省张家口市崇礼区四台嘴乡喜鹊梁（距崇礼县城18公里），9座2000米以上的高山环绕，地势从海拔150米跨越至2174米，雪地面积30万平方米，厚度1.5米以上天然积雪和长达150天存雪时间，形成了难得一见的天然雪脉。',
'images/index/duomeidi.jpg',177,'5','风景优美','单板爱好者的天堂',''),
(NULL,'翠云山·银河滑雪场','翠云山·银河滑雪场位于河北省张家口市崇礼区张承高速崇礼北口东侧，离高铁站极近。',
'images/index/wanlong.jpg',177,'6','离高铁站近','星座雪道',''),
(NULL,'长城岭滑雪场','长城岭滑雪场是华北地区自然滑雪条件最好的区域，雪量、雪期、雪质可与黑龙江的亚布力、吉林的北大湖等地相媲美，而风速、气温等条件均优于东北地区的滑雪场，适合室外活动而不宜冻伤，便于机械运转和室外作业。',
'images/index/ccl.jpg',266,'7','雪质好','雪道安排合理','');

/*首页详情*/
CREATE TABLE index_detail(
    did INT PRIMARY KEY AUTO_INCREMENT,/*详情id*/
    d_ban1 VARCHAR(128),/*详情页的轮播*/
    d_ban2 VARCHAR(128),/*详情页的轮播*/
    d_ban3 VARCHAR(128),/*详情页的轮播*/
    adult DECIMAL(10,2),/*成人价格*/
    child DECIMAL(10,2)/*成人价格*/
);
/*首页轮播图*/
/*
CREATE TABLE index_carousels(
    id  INT PRIMARY KEY AUTO_INCREMENT,/
    c1 VARCHAR(128),
    c2 VARCHAR(128),
    c3 VARCHAR(128)
);*/
INSERT INTO index_detail VALUES
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg',410,200),
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg',510,200),
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg',610,200),
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg',400,200),
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg',420,200),
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg',420,200),
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg',420,200);


/*特产首页*/
CREATE TABLE food_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,/*项目id*/
  title VARCHAR(64),/*主标题*/
  subtitle VARCHAR(128),/*副标题*/
  pic VARCHAR(128),/*首页项目图片*/
  price DECIMAL(10,2),/*价格*/
  href VARCHAR(10)/**/
);
/*特产详情*/
CREATE TABLE food_detail(
    did INT PRIMARY KEY AUTO_INCREMENT,/*详情id*/
    d_ban1 VARCHAR(128),/*详情页的轮播*/
    d_ban2 VARCHAR(128),/*详情页的轮播*/
    d_ban3 VARCHAR(128)/*详情页的轮播*/
);
/*特产首页插入数据*/
INSERT INTO food_item VALUES
(NULL,'张家口特产1','desc','images/index/wanlong.jpg',12,'1'),
(NULL,'张家口特产2','desc','images/index/wanlong.jpg',12,'2'),
(NULL,'张家口特产3','desc','images/index/wanlong.jpg',12,'3'),
(NULL,'张家口特产4','desc','images/index/wanlong.jpg',12,'4');
/*特产详情插入数据*/
INSERT INTO food_detail VALUES
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg'),
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg'),
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg'),
(NULL,'images/index/wanlong.jpg','images/index/wanlong.jpg','images/index/wanlong.jpg');

/*购物车*/
/**用户购物车表**/
CREATE TABLE cart(
 id INT PRIMARY KEY AUTO_INCREMENT,/*订单号id*/
 uid INT,/*用户id*/
 iid INT,/*商品id*/
 img VARCHAR(128),
 title VARCHAR(255),
 uname VARCHAR(255),
 phone VARCHAR(16),
 address VARCHAR(32),
 price DECIMAL(10,2),
 adult  DECIMAL(10,2),
 child  DECIMAL(10,2),
 adultCount INT,
 childCount INT,
 count INT
);
/*用户订单*/
CREATE TABLE user_order(
 id INT PRIMARY KEY AUTO_INCREMENT,/*订单号id*/
 uid INT,/*用户id*/
 iid INT,/*商品id*/
 title VARCHAR(255),
 uname VARCHAR(255),
 phone VARCHAR(16),
 totalprice DECIMAL(10,2),
 orderState INT,/*订单状态 1已支付 0未支付*/
 img VARCHAR(128),/*订单上显示的照片*/
 count INT, /*订单数量*/
 createtime INT,/*订单时间*/
 time VARCHAR(32)/*出行时间*/
);
/*推荐页*/
CREATE TABLE recommend_list(
 id INT PRIMARY KEY AUTO_INCREMENT,/*id*/
 title VARCHAR(128),
 spec VARCHAR(10)/*类型*/

);
/*推荐页详细列表*/
CREATE TABLE recommendItem_list(
 id INT PRIMARY KEY AUTO_INCREMENT,/*id*/
 item_title VARCHAR(128),
 spec VARCHAR(10),
 href VARCHAR(10),/*与推荐详情对应的href*/
 bg VARCHAR(128),/*与推荐详情对应的href*/
 subtitle VARCHAR(128),
 adult DECIMAL(10,2),/*成人价格*/
 child DECIMAL(10,2)/*成人价格*/
);
/*推荐页插入数据*/
INSERT INTO recommend_list VALUES
(NULL,'张家口','zjk'),
(NULL,'崇礼','cl'),
(NULL,'张北','zb'),
(NULL,'蔚县','yx'),
(NULL,'怀来县','hl'),
(NULL,'赤城县','ch'),
(NULL,'沽源县','gy');

/*推荐页详细列表插入数据*/
INSERT INTO recommendItem_list VALUES
(NULL,'张家口大境门','zjk','djm',null,
'desc',10,5),
(NULL,'张家口安家沟','zjk','ajg','images/tuijian/ajg.jpg',
'desc',11,5),
(NULL,'张家口大好河山','zjk','dhhs',null,
'desc',10,5),
(NULL,'张家口下花园区鸡鸣山峰','zjk','jmsf','images/tuijian/jmsf.jpg',
'desc',12,5),
(NULL,'崇礼滑雪场','cl','hxc',null,
'desc',13,5),
(NULL,'张北草原天路','zb','cytl','images/tuijian/cytl.jpg',
'desc',14,5),
(NULL,'张北桦皮岭','zb','hpl',null,
'desc',10,5),
(NULL,'张北野狐岭','zb','yhl','images/tuijian/yehul.jpg',
'desc',10,5),
(NULL,'张北中都原始度假村','zb','zdysdjc','images/tuijian/zdysdjc.jpg',
'desc',10,5),
(NULL,'蔚县暖泉古镇','yx','nqgz',null,
'desc',10,5),
(NULL,'蔚县空气草原','yx','kqcy',null,
'desc',10,5),
(NULL,'蔚县空气小五台','yx','xwt',null,
'desc',10,5),
(NULL,'蔚县','yx','yx',null,
'desc',10,5),
(NULL,'怀来县鸡鸣驿','hl','jmy',null,
'desc',10,5),
(NULL,'怀来县黄龙山庄','hl','lsz',null,
'desc',10,5),
(NULL,'赤城县温泉度假村','ch','wqdjc','images/tuijian/ccwqdjcjpg.jpg',
'desc',10,5),
(NULL,'沽源县沽水福源度假村','gy','gsfz','images/tuijian/gsfydjc.jpg',
'desc',10,5);