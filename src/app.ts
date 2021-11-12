import path from "path";
import fs from "fs";
import Koa from "koa";
import json from "koa-json";
import onerror from "koa-onerror";
import bodyparser from "koa-bodyparser";
// import logger from "koa-logger";
import morgan from "koa-morgan";
import session from "koa-session";
import redisStore from "koa-redis";

import blog from "@src/routes/blog";
import user from "@src/routes/user";
import { REDIS_CONF } from "./config/db";

const app = new Koa();

export const logPath = path.join(__dirname, "../../logs", "access.log");

// 日志
if (app.env !== "production") {
  app.use(
    morgan("dev", {
      stream: process.stdout // 默认参数
    })
  );
} else {
  // dist 目录对应 logs 目录相对地址
  const writeStream = fs.createWriteStream(logPath, {
    flags: "a"
  });
  app.use(
    morgan("combined", {
      stream: writeStream
    })
  );
}

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
// app.use(logger());

// session 配置
app.keys = ["PPzz123456!"];
app.use(
  session(
    {
      //配置cookie
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // 配置redis
      store: redisStore({
        host: REDIS_CONF.host,
        port: REDIS_CONF.port
      })
    },
    app
  )
);

// 注册路由
// allowedMethods 主要用于 405 Method Not Allowed 这个状态码相关
// 如果接口是get请求，而前端使用post请求，会返回405 Method Not Allowed ，提示 request method 不匹配，并在响应头返回接口支持的请求方法，更有利于调试
app.use(blog.routes()).use(blog.allowedMethods());
app.use(user.routes()).use(user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

export default app;
