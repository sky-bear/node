const EventEmitter = require("events");

const emitter = new EventEmitter();

function log(message) {
  console.log(message);
  // 发起事件
  emitter.emit("messageLogged", { id: 1, url: "http://" }); //
}

// 书写一个类， 继承events

class Logger extends EventEmitter {
  log(message) {
    console.log("message 123");
    this.emit("messageLogged", { id: 1, url: "1155446" });
  }
}

module.exports = {
  log,
  Logger,
};
