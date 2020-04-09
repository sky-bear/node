const { MYSQL_CONFIG } = require("../conf/db");
const mysql = require("mysql");

const connection = mysql.createConnection(MYSQL_CONFIG);

connection.connect();

// 执行sql的语句
const exec = sql =>
  new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        // console.log(err);
        reject(err);
        return;
      }
      resolve(result);
      return;
    });
  });

module.exports = {
  exec
};
