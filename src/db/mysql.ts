import * as mysql from "mysql";
import { escape, escapeId, format } from "mysql";
import { MYSQL_CONF } from "@src/conf/db";

const con = mysql.createConnection(MYSQL_CONF);

con.connect();

// 增删改查
// 查 返回数组，其他返回对象
function exec(sql: mysql.Query | string): Promise<any> {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

export { exec, escape, escapeId, format };
