const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end("<h1>node </h1>");
});
server.listen(8000, () => {
  console.log(123);
});
