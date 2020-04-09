const querystring = require("querystring");

const { set, get } = require("./src/db/redis");
// 登录接口
const handleUserRouter = require("./src/router/user");
const handleBlogRouter = require("./src/router/blog");

const { $to } = require("./src/utils/index");

// 获取cookie的过期时间
const getCookExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

// session
const SESSION_DATA = {};

// 用于处理 post data

const getPostData = req =>
  new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve();
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";

    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
      return;
    });
  });

const serverHandle = async (req, res) => {
  res.setHeader("Content-type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);

  // 获取post请求数据
  req.body = await getPostData(req);

  // 解析cookie
  const cookieStr = req.headers.cookie || ""; // k1=1;k2=2;

  req.cookie = {};
  cookieStr.split(";").forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split("=");

    req.cookie[arr[0].trim()] = arr[1].trim();
  });

  // 解析session
  // let userId = req.cookie.userId;
  // let needSetCookie = false;

  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {};
  //   }
  // } else {
  //   needSetCookie = true;
  //   userId = `${Date.now()}_${Math.random()}`;
  //   SESSION_DATA[userId] = {};
  // }
  // req.session = SESSION_DATA[userId];

  // 使用redis解析session
  let userId = req.cookie.userId;
  let needSetCookie = false;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {});
  }

  // 获取sessIon
  req.sessionId = userId;
  const [err, result] = await $to(get(req.sessionId));
  if (result === null || !result) {
    set(req.sessionId, {});
    req.session = {};
  } else {
    req.session = result;
  }

  const blogData = await handleBlogRouter(req, res);
  console.log(blogData, 55);
  if (blogData) {
    if (needSetCookie) {
      res.setHeader("Set-Cookie", [
        `userId=${userId};path= /;httpOnly;expires=${getCookExpires()}` // 设置httpOnly只有htpt可以更改unsername cookie
      ]);
    }
    res.end(JSON.stringify(blogData));
    return;
  }
  // 登录
  const userData = await handleUserRouter(req, res);
  
  if (userData) {
    if (needSetCookie) {
      res.setHeader("Set-Cookie", [
        `userId=${userId};path= /;httpOnly;expires=${getCookExpires()}` // 设置httpOnly只有htpt可以更改unsername cookie
      ]);
    }
    res.end(JSON.stringify(userData));
    return;
  }

  res.writeHead(404, { "Content-type": "text/plan" });
  res.write("404 Not Found");
  res.end();
};

module.exports = serverHandle;

// process.env.NODE_ENV
