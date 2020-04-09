const { login } = require("../controller/user");
const { SuccessModule, ErrorModel } = require("../model/resModel");
const { set } = require("../db/redis");

const handleUserRouter = (req, res) => {
  const method = req.method;
  const { path } = req;

  // 登录
  if (method === "POST" && path === "/api/user/login") {
    console.log(789879);
    const { username, password } = req.body;
    // const { username, password } = req.query;
    const result = login(username, password);
    return result
      .then(data => {
        if (data.username) {
          // 设置session
          req.session.username = data.username;
          req.session.realname = data.realname;

          // 同步设置redis
          set(req.sessionId, req.session);
          return new SuccessModule();
        }

        return new SuccessModule("账号密码错误");
      })
      .catch(err => {
        return new ErrorModel("账号密码错误");
      });
  }
  // cookie 测试
  // if (method === "GET" && path === "/api/blog/login-test") {
  //   const { username } = req.session;

  //   if (username) {
  //     return Promise.resolve(
  //       new SuccessModule({
  //         session: req.session
  //       })
  //     );
  //   } else {
  //     return Promise.resolve(new SuccessModule("账号密码错误"));
  //   }
  // }
};

module.exports = handleUserRouter;
