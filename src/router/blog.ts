import { ServerResponse } from "http";
import {
  BlogDataType,
  deleteBlog,
  getDetail,
  getList,
  newBlog,
  updateBlog
} from "@src/controller/blog";
import { ErrorModel, SuccessModel } from "@src/model/resModel";
import { ReqType } from "@src/app";
import { OkPacket } from "mysql";
import { loginCheck } from "@src/utils/loginCheck";

const handleBlogRouter = async (
  req: ReqType,
  _res: ServerResponse
): Promise<any> => {
  const { method, path } = req;

  if (method === "GET" && path === "/api/blog/list") {
    const { keyword = "", isadmin } = req.query;
    let { author = "" } = req.query;

    if (isadmin) {
      const loginCheckResult = loginCheck(req);
      if (loginCheck(req)) {
        return loginCheckResult;
      }
      author = req.session.username;
    }

    const result: BlogDataType[] = await getList(author, keyword);
    return new SuccessModel(result);
  }

  if (method === "GET" && path === "/api/blog/detail") {
    const { id } = req.query;
    const result: BlogDataType[] = await getDetail(id);
    return new SuccessModel(result[0]);
  }

  if (method === "POST" && path === "/api/blog/new") {
    const loginCheckResult = loginCheck(req);
    if (loginCheck(req)) {
      return loginCheckResult;
    }

    const { body } = req;
    body.author = req.session.username;
    const result: OkPacket = await newBlog(body);
    if (result.affectedRows > 0) {
      return new SuccessModel({ id: result.insertId });
    } else {
      return new ErrorModel("创建博客失败");
    }
  }

  if (method === "POST" && path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheck(req)) {
      return loginCheckResult;
    }

    const { body } = req;
    body.author = req.session.username;
    const result: OkPacket = await updateBlog(body);
    if (result.affectedRows > 0) {
      return new SuccessModel();
    } else {
      return new ErrorModel("更新博客失败");
    }
  }

  if (method === "POST" && path === "/api/blog/delete") {
    const loginCheckResult = loginCheck(req);
    if (loginCheck(req)) {
      return loginCheckResult;
    }

    const { body } = req;
    body.author = req.session.username;
    const result: OkPacket = await deleteBlog(body);
    if (result.affectedRows > 0) {
      return new SuccessModel();
    } else {
      return new ErrorModel("删除博客失败");
    }
  }
};

export default handleBlogRouter;
