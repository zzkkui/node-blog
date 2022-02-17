import express from "express";
import { login } from "@src/controller/user";
import { ErrorModel, SuccessModel } from "@src/modules/resModle";
import { MergeRequest } from "@src/interface";
import { Body, Controller, Post, Req, Res } from "routing-controllers";

@Controller("/user")
class User {
  @Post("/login")
  async login(
    @Body() body: any,
    @Req() req: MergeRequest,
    @Res() res: express.Response
  ) {
    const { username, password } = body;
    const result = await login(username, password);
    if (result[0]?.username) {
      const { username, realname } = result[0];
      req.session.username = username;
      req.session.realname = realname;
      return res.json(new SuccessModel());
    } else {
      return res.json(new ErrorModel("登陆失败"));
    }
  }
}

export default User;
