const EventEmitter = require("events");
const emitter = new EventEmitter();

const { log, Logger } = require("./log");

// 注册事件
emitter.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

log("message");
// 只能打印message ， EventEmitter只对当前模块有效， 另一个模块就是新的一个EventEmitter

const logger = new Logger();

// 注册事件
logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

logger.log("message");
