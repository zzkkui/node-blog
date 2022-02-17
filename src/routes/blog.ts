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
import { MergeRequest } from "@src/interface";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  SessionParam,
  UseBefore
} from "routing-controllers";

@Controller("/blog")
class BlogRoute {
  @Get()
  async getList(
    @SessionParam("username") username: string,
    @Req() req: MergeRequest,
    @Res() res: express.Response
  ) {
    const { keyword = "", isadmin } = req.query;
    let { author = "" } = req.query;
    // 管理页
    if (isadmin) {
      if (!username) {
        return res.json(new ErrorModel("未登录"));
      }
      author = username;
    }
    const result: BlogDataType[] = await getList(
      author as string,
      keyword as string
    );
    return res.json(new SuccessModel(result));
  }

  @Get("/:id")
  async getDetail(@Param("id") id: string, @Res() res: express.Response) {
    const result: BlogDataType[] = await getDetail(id);
    return res.json(new SuccessModel(result[0]));
  }

  @Post("/")
  @UseBefore(loginCheck)
  async addBlog(
    @SessionParam("username") username: string,
    @Body() body: any,
    @Res() res: express.Response
  ) {
    body.author = username;
    const result: OkPacket = await newBlog(body);
    console.log(result);
    if (result.affectedRows > 0) {
      return res.json(new SuccessModel({ id: result.insertId }));
    } else {
      return res.json(new ErrorModel("创建博客失败"));
    }
  }

  @Put("/")
  @UseBefore(loginCheck)
  async updateBlog(
    @SessionParam("username") username: string,
    @Body() body: any,
    @Res() res: express.Response
  ) {
    body.author = username;
    const result: OkPacket = await updateBlog(body);
    if (result.affectedRows > 0) {
      return res.json(new SuccessModel());
    } else {
      return res.json(new ErrorModel("更新博客失败"));
    }
  }

  @Delete("/:id")
  @UseBefore(loginCheck)
  async deleteBlog(
    @SessionParam("username") username: string,
    @Param("id") id: string,
    @Body() body: any,
    @Res() res: express.Response
  ) {
    body.author = username;
    const result: OkPacket = await deleteBlog(id, body);
    if (result.affectedRows > 0) {
      return res.json(new SuccessModel());
    } else {
      return res.json(new ErrorModel("删除博客失败"));
    }
  }
}

export default BlogRoute;
