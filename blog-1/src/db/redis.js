const { REDIS_CONFIG } = require("../conf/db");
const redis = require("redis");

const redisClient = redis.createClient(REDIS_CONFIG.prot, REDIS_CONFIG.host);

redisClient.on("error", err => {
  console.log(err);
});

function set(key, val) {
  let value = val;
  if (typeof val === "object") {
    value = JSON.stringify(val);
  }
  redisClient.set(key, value, redis.print);
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
    });
  });
}

module.exports = {
  set,
  get
};
