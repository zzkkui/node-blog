import { login } from "@src/controller/user";
// import { redisSet } from "@src/db/redis";
import { ErrorModel, SuccessModel } from "@src/modules/resModle";
import express from "express";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const {
    body: { username, password }
  } = req;
  // const {
  //   query: { username, password }
  // } = req;
  const result = await login(username, password);
  if (result[0]?.username) {
    // expires 设置过期时间
    // const { username, realname } = result[0];
    // req.session.username = username;
    // req.session.realname = realname;
    // redisSet(req.sessionId, req.session);
    return res.json(new SuccessModel());
  } else {
    return res.json(new ErrorModel("登陆失败"));
  }
});

export default router;
