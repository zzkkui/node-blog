import express, { NextFunction } from "express";
import { ParamType, ParseType } from "@src/interface";

// 路由处理函数工厂
export function handlerFactory(
  func: (...args: any[]) => any,
  paramList: ParamType[],
  parseList: ParseType[],
  funcs: ((...args: any[]) => any)[]
) {
  return async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      if (funcs && funcs.length) {
        funcs.forEach(async (n) => {
          typeof n === "function" && (await n(req, res, next));
        });
      }
      const args = extractParameters(req, res, next, paramList, parseList);
      await func(...args);

      // res.send(result);
    } catch (err) {
      next(err);
    }
  };
}

// 根据 req 处理装饰的结果
export function extractParameters(
  req: express.Request,
  res: express.Response,
  next: NextFunction,
  paramArr: ParamType[] = [],
  parseArr: ParseType[] = []
) {
  if (!paramArr.length) return [req, res, next];

  const args: any[] = [];

  paramArr.forEach((param) => {
    const { key, index, type } = param;
    // console.log(req.body, req.query);
    switch (type) {
      case "query":
        args[index] = key ? req.query[key] : req.query;
        break;
      case "body":
        args[index] = key ? req.body[key] : req.body;
        break;
      case "params":
        args[index] = key ? req.params[key] : req.params;
        break;
      case "headers":
        args[index] = key ? req.headers[key.toLowerCase()] : req.headers;
        break;
      case "cookies":
        args[index] = key ? req.cookies[key] : req.cookies;
        break;
      default:
        args[index] = res;
        break;
    }
  });

  parseArr.forEach((parse) => {
    const { type, index } = parse;
    switch (type) {
      case "number":
        args[index] = +args[index];
        break;
      case "string":
        args[index] = args[index] + "";
        break;
      case "boolean":
        args[index] = Boolean(args[index]);
        break;
    }
  });

  args.push(req, res, next);
  return args;
}
