const querystring = require("querystring");

import { IncomingMessage, ServerResponse } from "http";

import handleBlogRouter from "./router/blog";

import handleUserRouter from "./router/user";

export type ReqType = IncomingMessage & {
  path?: string;

  query?: Record<string, string>;

  body?: any;
};

function getPostData(req: ReqType) {
  return new Promise(
    (resolve: (value: Record<string, string>) => void, reject) => {
      if (req.method !== "POST") {
        resolve({});

        return;
      }

      if (req.headers["content-type"] !== "application/json") {
        resolve({});

        return;
      }

      let postData = "";

      req.on("data", (chunk) => {
        postData += chunk.toString();
      });

      req.on("end", () => {
        if (!postData) {
          resolve({});

          return;
        }

        resolve(JSON.parse(postData));
      });
    }
  );
}

export default (req: ReqType, res: ServerResponse): void => {
  // 设置返回格式 JSON

  res.setHeader("Content-Type", "application/json");

  const { url } = req;

  req.path = url.split("?")[0];

  req.query = querystring.parse(url.split("?")[1]);

  getPostData(req).then(async (postData) => {
    req.body = postData;

    // 处理 blog 路由

    const blogData = await handleBlogRouter(req, res);

    if (blogData) {
      res.end(JSON.stringify(blogData));

      return;
    }

    // 处理 user 路由

    const userData = await handleUserRouter(req, res);

    if (userData) {
      res.end(JSON.stringify(userData));

      return;
    }

    // 未命中路由返回 404

    res.writeHead(404, { "Content-type": "text/plain" });

    res.write("404 Not Found\n");

    res.end();
  });
};
