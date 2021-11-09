import express from "express";
import { OkPacket } from "mysql";
import loginCheck from "@src/middleware/loginCheck";
import {
  BlogDataType,
  deleteBlog,
  getDetail,
  getList,
  newBlog,
  updateBlog
} from "@src/controller/blog";
import { ErrorModel, SuccessModel } from "@src/modules/resModle";

const router = express.Router();

router.get("/list", async (req, res, next) => {
  const { keyword = "", isadmin } = req.query as any;
  let { author = "" } = req.query as any;

  // 管理页
  if (isadmin) {
    if (!req.session.username) {
      res.json(new ErrorModel("未登录"));
      return;
    }
    author = req.session.username;
  }

  const result: BlogDataType[] = await getList(
    author as string,
    keyword as string
  );
  return res.json(new SuccessModel(result));
});

router.get("/detail", async (req, res, next) => {
  const { id } = req.query as any;
  const result: BlogDataType[] = await getDetail(id);
  return res.json(new SuccessModel(result[0]));
});

router.post("/new", loginCheck, async (req, res, next) => {
  const { body } = req;
  body.author = req.session.username;
  const result: OkPacket = await newBlog(body);
  if (result.affectedRows > 0) {
    return res.json(new SuccessModel({ id: result.insertId }));
  } else {
    return res.json(new ErrorModel("创建博客失败"));
  }
});

router.post("/update", loginCheck, async (req, res, next) => {
  const { body } = req;
  body.author = req.session.username;
  const result: OkPacket = await updateBlog(body);
  if (result.affectedRows > 0) {
    return res.json(new SuccessModel());
  } else {
    return res.json(new ErrorModel("更新博客失败"));
  }
});

router.post("/delete", loginCheck, async (req, res, next) => {
  const { body } = req;
  body.author = req.session.username;
  const result: OkPacket = await deleteBlog(body);
  if (result.affectedRows > 0) {
    return res.json(new SuccessModel());
  } else {
    return res.json(new ErrorModel("删除博客失败"));
  }
});

export default router;
