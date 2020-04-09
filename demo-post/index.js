const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method == "POST") {
    // 数据格式
    console.log("conent-type", req.headers["content-type"]);
    let postDate = "";
    req.on("data", chunk => {
      postDate += chunk.toString();
    });
    req.on("end", () => {
      console.log(postDate);
      res.end("hellow ");
    });
  }
});
server.listen("9000");
console.log("post");
