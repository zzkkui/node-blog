import { ServerResponse } from "http";
import {
  deleteBlog,
  getDetail,
  getList,
  newBlog,
  updateBlog
} from "@controller/blog";
import { ErrorModel, SuccessModel } from "@model/resModel";
import { ReqType } from "@src/app";

const handleBlogRouter = (req: ReqType, _res: ServerResponse): any => {
  const { method, path } = req;

  if (method === "GET" && path === "/api/blog/list") {
    const { author = "", keyword = "" } = req.query;
    const result = getList(author, keyword);
    return new SuccessModel(result);
  }

  if (method === "GET" && path === "/api/blog/detail") {
    const { id } = req.query;
    const result = getDetail(id);
    return new SuccessModel(result);
  }

  if (method === "POST" && path === "/api/blog/new") {
    const { body } = req;
    const result = newBlog(body);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel("更新博客失败");
    }
  }

  if (method === "POST" && path === "/api/blog/update") {
    const { body } = req;
    const result = updateBlog(body);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel("更新博客失败");
    }
  }

  if (method === "POST" && path === "/api/blog/delete") {
    const {
      body: { id }
    } = req;
    const result = deleteBlog(id);
    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel("删除博客失败");
    }
  }
};

export default handleBlogRouter;
