import * as mysql from "mysql";
import MYSQL_CONF from "@src/conf/db";

const con = mysql.createConnection(MYSQL_CONF);

con.connect();

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

export { exec };
