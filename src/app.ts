import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import StatusCodes from "http-status-codes";
import session from "express-session";
import redis from "connect-redis";

import blogRouter from "@src/routes/blog";
import userRouter from "@src/routes/user";
import { redisClient } from "./db/redis";

declare module "express-session" {
  export interface SessionData {
    username: string;
    realname: string;
  }
}

const RedisStore = redis(session);

const app = express();
const { BAD_REQUEST } = StatusCodes;
// 日志
app.use(logger("dev"));
// 解析数据格式 header json 格式
app.use(express.json());
// 解析数据格式 header urlencoded 格式
app.use(express.urlencoded({ extended: false }));
// 处理 cookie
app.use(cookieParser());

const sessionStore = new RedisStore({
  client: redisClient
});

app.use(
  session({
    secret: "PPzz!112358",
    cookie: {
      path: "/", // 默认
      httpOnly: true, // 默认
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
  })
);

// 注册路由
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// 先注册路由，路由没有匹配到，再来匹配 404
// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  return res.status(BAD_REQUEST).json({
    error: err.message
  });
});

export default app;
