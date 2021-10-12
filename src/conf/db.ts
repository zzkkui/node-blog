import { ConnectionConfig } from "mysql";
import { ClientOpts } from "redis";

const env = process.env.NODE_ENV || "production";

let MYSQL_CONF: ConnectionConfig;
let REDIS_CONF: ClientOpts;

if (env === "dev") {
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
}

if (env === "production") {
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
