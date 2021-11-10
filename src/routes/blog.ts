import KoaRouter from "koa-router";
import { OkPacket } from "mysql";
// import loginCheck from "@src/middleware/loginCheck";
import {
  BlogDataType,
  deleteBlog,
  getDetail,
  getList,
  newBlog,
  updateBlog
} from "@src/controller/blog";
import { ErrorModel, SuccessModel } from "@src/modules/resModle";

const router = new KoaRouter();

router.prefix("/api/blog");
// const router = express.Router();

router.get("/list", async (ctx, next) => {
  const { keyword = "", isadmin } = ctx.query;
  const { author = "" } = ctx.query;

  // 管理页
  if (isadmin) {
    // if (!ctx.session.username) {
    //   ctx.json(new ErrorModel("未登录"));
    //   return;
    // }
    // author = ctx.session.username;
  }

  const result: BlogDataType[] = await getList(
    author as string,
    keyword as string
  );
  ctx.body = new SuccessModel(result);
});

router.get("/detail", async (ctx, next) => {
  const { id } = ctx.query as any;
  const result: BlogDataType[] = await getDetail(id);
  ctx.body = new SuccessModel(result[0]);
});

router.post("/new", async (ctx, next) => {
  const { body } = ctx;
  // body.author = ctx.session.username;
  const result: OkPacket = await newBlog(body);
  if (result.affectedRows > 0) {
    ctx.body = new SuccessModel({ id: result.insertId });
  } else {
    ctx.body = new ErrorModel("创建博客失败");
  }
});

router.post("/update", async (ctx, next) => {
  const { body } = ctx;
  // body.author = ctx.session.username;
  const result: OkPacket = await updateBlog(body);
  if (result.affectedRows > 0) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("更新博客失败");
  }
});

router.post("/delete", async (ctx, next) => {
  const { body } = ctx;
  // body.author = ctx.session.username;
  const result: OkPacket = await deleteBlog(body);
  if (result.affectedRows > 0) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("删除博客失败");
  }
});

export default router;
