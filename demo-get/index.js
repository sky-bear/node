const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log("----------");
  console.log(req.url);
  req.query = querystring.parse(req.url.split("?")[1]);
  console.log("----------");
  console.log(req.query);
  res.end(JSON.stringify(req.query));
});
server.listen("8000");
console.log(123);
