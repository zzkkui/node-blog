import { exec, escape } from "@src/db/mysql";
import genPassword from "@src/utils/cryp";

export const login = (username: string, password: string) => {
  // 预防依赖注入攻击，其实就是转义特殊字符
  username = escape(username);
  password = escape(genPassword(password));

  const sql = `select username, realname from users where username=${username} and password=${password}`;
  return exec(sql);
};
