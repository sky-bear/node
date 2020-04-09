const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");
const { SuccessModule, ErrorModel } = require("../model/resModel");

// 统一的登录验证函数
const loginCheck = req => {
  console.log(req.session.username);
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("账号尚未登录"));
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const { path } = req;
  const { id } = req.query;
  console.log(method, 123);
  // 获取博客列表
  if (method === "GET" && path === "/api/blog/list") {
    const { author, keyword } = req.query;
    const result = getList(author, keyword);
    return result
      .then(listData => new SuccessModule(listData))
      .catch(err => {
        new ErrorModel("操作失败");
      });
  }
  // 获取博客详情
  if (method === "GET" && path === "/api/blog/detail") {
    const result = getDetail(id);
    return result
      .then(listData => new SuccessModule(listData[0]))
      .catch(err => {
        new ErrorModel("操作失败");
      });
  }

  // 新建博客列表
  if (method === "POST" && path === "/api/blog/new") {
    // 登录验证
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    req.body.author = req.session.username;
    const blogData = req.body;
    const result = newBlog(blogData);
    return result
      .then(listData => new SuccessModule(listData))
      .catch(err => {
        new ErrorModel("操作失败");
      });
  }

  // 更新一篇博客
  if (method === "POST" && path === "/api/blog/update") {
    // 登录验证
    const loginCheckResult = loginCheck(req);
    console.log(345);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    console.log(234);
    const result = updateBlog({ id, ...req.body });
    return result
      .then(val => {
        if (val) {
          return new SuccessModule();
        } else {
          return new SuccessModule("更新失败");
        }
      })
      .catch(err => {
        return new ErrorModel("操作失败");
      });
  }

  //删除博客
  if (method === "POST" && path === "/api/blog/del") {
    // 登录验证
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    req.body.author = req.session.username;

    const result = deleteBlog({ id, ...req.body });
    return result
      .then(val => {
        if (val) {
          console.log(val, 123);
          return new SuccessModule();
        } else {
          return new SuccessModule("删除失败");
        }
      })
      .catch(err => {
        return new ErrorModel("操作失败");
      });
  }
};

module.exports = handleBlogRouter;
