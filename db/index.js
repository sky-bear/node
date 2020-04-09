const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "172.16.151.55",
  user: "peanut",
  password: "123456",
  database: "sky-bear",
  port: "3306"
});
connection.connect();

const sql = "SELECT * FROM `user`";
// const sql =
//   "INSERT INTO `blog`  (title,content,create_time,author)  VALUES ('标题B', '内容B', 1583226598411, 'zhangsan')";

// const sql =
//   "INSERT INTO  user (username, `password`, realname) VALUES ('zhanglong', '333', '张龙');";

connection.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});

connection.end();
