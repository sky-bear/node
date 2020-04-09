const { exec } = require("../db/mysql");
const { $to } = require("../utils/index");

const getList = (author, keyword) => {
  let sql = "select * from  blog where 1 = 1 ";
  // 1=1 占个位置

  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by create_time desc`;

  // const [err, res] = await $to(exec(sql));
  console.log(sql);

  return exec(sql);

  // return [
  //   {
  //     id: 1,
  //     title: "标题A",
  //     createTime: 1583140624625,
  //     content: "11111111",
  //     author: "张山"
  //   },
  //   {
  //     id: 2,
  //     title: "标题B",
  //     createTime: 1583140626625,
  //     content: "22222222",
  //     author: "李四"
  //   },
  //   {
  //     id: 3,
  //     title: "标题c",
  //     createTime: 1583140674625,
  //     content: "33333333333",
  //     author: "王五"
  //   }
  // ];
};

const getDetail = id => {
  let sql = `select * from  blog where id = ${id} `;
  return exec(sql);
  // return {
  //   id: 1,
  //   title: "标题A",
  //   createTime: 1583140624625,
  //   content: "11111111",
  //   author: "张山"
  // };
};

const newBlog = ({ title, content, createTime = +new Date(), author } = {}) => {
  console.log(title, content, createTime, author);
  let sql = `INSERT INTO blog (title, content, create_time, author) VALUES ('${title}', '${content}',${createTime}, '${author}' )`;
  console.log(sql);
  return exec(sql);
  // return {
  //   id: 10
  //   // title: "标题A",
  //   // createTime: 1583140624625,
  //   // content: "11111111",
  //   // author: "张山"
  // };
};

const updateBlog = ({ id, content, createTime } = {}) => {
  let sql = ` UPDATE blog  SET  `;

  if (content) {
    sql += ` content = '${content}' `;
  }
  if (createTime) {
    if (content) {
      sql += " , ";
    }
    sql += ` create_time = ${createTime} `;
  }

  sql += `WHERE id = ${id} `;

  console.log(sql);
  return exec(sql).then(data => {
    if (data.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const deleteBlog = ({ id, author }) => {
  const sql = `delete from blog where id=${id} and author = '${author}'`;
  console.log(sql);
  return exec(sql).then(data => {
    if (data.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
};
