import * as crypto from "crypto";

// 密钥
const SECRET_KEY = "";

function md5(content: string) {
  const md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
}

function genPassword(password: string) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}

console.log(genPassword("123456"));

export default genPassword;
