import { ConnectionConfig } from "mysql";
import { ClientOpts } from "redis";
// import { env } from "@src/app";

let MYSQL_CONF: ConnectionConfig;
let REDIS_CONF: ClientOpts;

const env = process.env.NODE_ENV || "dev";

if (env === "development") {
  // mysql
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "pp112358",
    port: 3306,
    database: "myblog"
  };
  // redis
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1"
  };
} else {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "pp112358",
    port: 3306,
    database: "myblog"
  };

  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1"
  };
}

export { MYSQL_CONF, REDIS_CONF };
