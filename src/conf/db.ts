import { ConnectionConfig } from "mysql";

const env = process.env.NODE_ENV;

let MYSQL_CONF: ConnectionConfig;

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "pp112358",
    port: 3306,
    database: "myblog"
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
}

export default MYSQL_CONF;
