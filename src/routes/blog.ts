import express, { NextFunction } from "express";
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
import {
  Body,
  Controller,
  Delete,
  Get,
  PathParam,
  Post,
  Put
} from "@src/decorator";
import { MergeRequest } from "@src/interface";

@Controller("/blog")
class BlogRoute {
  @Get()
  async getList(req: MergeRequest, res: express.Response, next: NextFunction) {
    const { keyword = "", isadmin } = req.query;
    let { author = "" } = req.query;
    // 管理页
    if (isadmin) {
      if (!req?.session.username) {
        return res.json(new ErrorModel("未登录"));
      }
      author = req.session.username;
    }
    const result: BlogDataType[] = await getList(
      author as string,
      keyword as string
    );
    return res.json(new SuccessModel(result));
  }

  @Get("/:id")
  async getDetail(
    @PathParam("id") id: string,
    req: express.Request,
    res: express.Response
  ) {
    const result: BlogDataType[] = await getDetail(id);
    return res.json(new SuccessModel(result[0]));
  }

  @Post("/", loginCheck)
  async addBlog(@Body() body: any, req: MergeRequest, res: express.Response) {
    body.author = req.session.username;
    const result: OkPacket = await newBlog(body);
    console.log(result);
    if (result.affectedRows > 0) {
      return res.json(new SuccessModel({ id: result.insertId }));
    } else {
      return res.json(new ErrorModel("创建博客失败"));
    }
  }

  @Put("/", loginCheck)
  async updateBlog(
    @Body() body: any,
    req: MergeRequest,
    res: express.Response
  ) {
    body.author = req.session.username;
    const result: OkPacket = await updateBlog(body);
    if (result.affectedRows > 0) {
      return res.json(new SuccessModel());
    } else {
      return res.json(new ErrorModel("更新博客失败"));
    }
  }

  @Delete("/:id", loginCheck)
  async deleteBlog(
    @PathParam("id") id: string,
    @Body() body: any,
    req: MergeRequest,
    res: express.Response
  ) {
    body.author = req.session.username;
    const result: OkPacket = await deleteBlog(id, body);
    if (result.affectedRows > 0) {
      return res.json(new SuccessModel());
    } else {
      return res.json(new ErrorModel("删除博客失败"));
    }
  }
}

export default BlogRoute;
