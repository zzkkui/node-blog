import express from "express";
import { login } from "@src/controller/user";
import { ErrorModel, SuccessModel } from "@src/modules/resModle";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const {
    body: { username, password }
  } = req;
  const result = await login(username, password);
  if (result[0]?.username) {
    const { username, realname } = result[0];
    req.session.username = username;
    req.session.realname = realname;
    return res.json(new SuccessModel());
  } else {
    return res.json(new ErrorModel("登陆失败"));
  }
});

export default router;
