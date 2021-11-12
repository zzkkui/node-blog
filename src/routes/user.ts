import KoaRouter from "koa-router";
import { login } from "@src/controller/user";
import { ErrorModel, SuccessModel } from "@src/modules/resModle";
import loginCheck from "@src/middleware/loginCheck";

const router = new KoaRouter();

router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  const {
    request: {
      body: { username, password }
    }
  } = ctx;
  const result = await login(username, password);
  if (result[0]?.username) {
    const { username, realname } = result[0];
    if (ctx.session) {
      ctx.session.username = username;
      ctx.session.realname = realname;
    }
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("登陆失败");
  }
});

router.post("/logout", loginCheck, async (ctx, next) => {
  if (ctx.session) {
    ctx.session = null;
    // ctx.session.username = null;
    // ctx.session.realname = null;
  }
  ctx.body = new SuccessModel();
});

export default router;
