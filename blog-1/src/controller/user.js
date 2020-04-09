const { exec } = require("../db/mysql");

const login = (username, password) => {
  const sql = `select username,  password  from user where username='${username}' and password = '${password}' `;

  return exec(sql).then(data => {
    return data[0] || {};
  });
};

module.exports = {
  login
};

// 登录校验 和 登录信息存储

// cookie 和 session => redis

// cookie 浏览器最大5kb

//

// session

// session不存在本地代码的原因:
// 第一： 进程内存有限， 访问量过大， 内存暴增
// 第二： 正式上线运行时多进程， 进程之间内存无法共享

// redis 内存数据库
// web server最常用的缓存数据库, 数据存放在内存中
// 相比较 mysql 速度更块
// 成本高
//

// 为何session适合redis
// session访问频繁, 对性能要求极高
// session可不考虑断电丢失数据的问题
// session数据量不会太大(相比较mysql)
