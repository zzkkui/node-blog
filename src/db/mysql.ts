import * as mysql from "mysql";
import { escape, escapeId, format } from "mysql";
import { MYSQL_CONF } from "@src/config/db";

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

// escape处理输入内容，将参数中的特殊字符进行转义。防止 sql 注入攻击
// escapeId 转义标识符查询
// format 多个插入点的查询，利用对 id 和值的正确转义
// var sql = "SELECT * FROM ?? WHERE ?? = ?";
// var inserts = ['users', 'id', userId];
// sql = mysql.format(sql, inserts);
export { exec, escape, escapeId, format };
