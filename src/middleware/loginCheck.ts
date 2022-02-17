import { MergeRequest } from "@src/interface";
import { ErrorModel } from "@src/modules/resModle";
import express, { NextFunction } from "express";

export default (
  req: MergeRequest,
  res: express.Response,
  next: NextFunction
) => {
  if (!req.session.username) {
    return res.json(new ErrorModel("未登录"));
  }
};
