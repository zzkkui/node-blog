import { REDIS_CONF } from "@src/conf/db";
import * as redis from "redis";

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on("error", (err) => {
  console.error(err);
});

export function redisSet(key: string, val: any) {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

export function redisGet(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (key === null) {
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
