import * as redis from "redis";
import { REDIS_CONF } from "@src/config/db";

const redisClient = redis.createClient(REDIS_CONF.port!, REDIS_CONF.host);

redisClient.on("error", (err) => {
  console.error(err);
});

export { redisClient };
