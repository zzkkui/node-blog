import { ErrorModel } from "@src/modules/resModle";
import { BaseContext } from "koa";

export default async (ctx: BaseContext, next: any) => {
  if (ctx.session?.username) {
    await next();
  } else {
    ctx.body = new ErrorModel("未登录");
  }
};
