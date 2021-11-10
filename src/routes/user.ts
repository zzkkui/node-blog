import KoaRouter from "koa-router";
import { login } from "@src/controller/user";
import { ErrorModel, SuccessModel } from "@src/modules/resModle";

const router = new KoaRouter();

router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  const {
    body: { username, password }
  } = ctx;
  const result = await login(username, password);
  if (result[0]?.username) {
    // const { username, realname } = result[0];
    // ctx.session.username = username;
    // ctx.session.realname = realname;
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("登陆失败");
  }
});

export default router;
