import { exec } from "@src/db/mysql";

export const loginCheck = (username: string, password: string) => {
  const sql = `select username, realname from users where username='${username}' and password='${password}'`;
  return exec(sql);
};
