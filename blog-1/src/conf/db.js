const env = process.env.NODE_ENV;

// 根据就env 配置不同的参数

const MYSQL_CONFIG = {
  host: "172.16.151.55",
  user: "peanut",
  password: "123456",
  database: "sky-bear",
  port: "3306"
};

const REDIS_CONFIG = {
  prot: 6379,
  host: "127.0.0.1"
};

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
};
