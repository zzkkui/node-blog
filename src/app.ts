import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
// import StatusCodes from "http-status-codes";

import indexRouter from "@src/routes/index";
import usersRouter from "@src/routes/users";

const app = express();
// const { BAD_REQUEST } = StatusCodes;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// 日志
app.use(logger("dev"));
// 获取 header json 格式
app.use(express.json());
// 获取 header urlencoded 格式
app.use(express.urlencoded({ extended: false }));
// 处理 cookie
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 注册路由
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 先注册路由，路由没有匹配到，再来匹配 404
// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use(
  (
    err: Error & { status: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.app.get("env"));
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
);

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   return res.status(BAD_REQUEST).json({
//     error: err.message
//   });
// });

export default app;
