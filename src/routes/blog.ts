import {
  BlogDataType,
  deleteBlog,
  getDetail,
  getList,
  newBlog,
  updateBlog
} from "@src/controller/blog";
import { ErrorModel, SuccessModel } from "@src/modules/resModle";
import express from "express";
import { OkPacket } from "mysql";

const router = express.Router();

router.get("/list", async (req, res, next) => {
  const { keyword = "" } = req.query;
  const { author = "" } = req.query;

  // if (isadmin) {
  //   const loginCheckResult = loginCheck(req);
  //   if (loginCheck(req)) {
  //     return loginCheckResult;
  //   }
  //   author = req.session.username;
  // }

  const result: BlogDataType[] = await getList(
    author as string,
    keyword as string
  );
  return res.json(new SuccessModel(result));
});

router.get("/detail", async (req, res, next) => {
  const { id } = req.query;
  const result: BlogDataType[] = await getDetail(id as string);
  return res.json(new SuccessModel(result[0]));
});

router.post("/new", async (req, res, next) => {
  // const loginCheckResult = loginCheck(req);
  // if (loginCheck(req)) {
  //   return loginCheckResult;
  // }

  const { body } = req;
  // body.author = req.session.username;
  const result: OkPacket = await newBlog(body);
  if (result.affectedRows > 0) {
    return res.json(new SuccessModel({ id: result.insertId }));
  } else {
    return res.json(new ErrorModel("创建博客失败"));
  }
});

router.post("/update", async (req, res, next) => {
  // const loginCheckResult = loginCheck(req);
  //   if (loginCheck(req)) {
  //     return loginCheckResult;
  //   }

  const { body } = req;
  // body.author = req.session.username;
  const result: OkPacket = await updateBlog(body);
  if (result.affectedRows > 0) {
    return res.json(new SuccessModel());
  } else {
    return res.json(new ErrorModel("更新博客失败"));
  }
});

router.post("/detail", async (req, res, next) => {
  // const loginCheckResult = loginCheck(req);
  // if (loginCheck(req)) {
  //   return loginCheckResult;
  // }

  const { body } = req;
  // body.author = req.session.username;
  const result: OkPacket = await deleteBlog(body);
  if (result.affectedRows > 0) {
    return res.json(new SuccessModel());
  } else {
    return res.json(new ErrorModel("删除博客失败"));
  }
});

export default router;
