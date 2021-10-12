const querystring = require("querystring");
import { IncomingMessage, ServerResponse } from "http";
import handleBlogRouter from "./router/blog";
import handleUserRouter from "./router/user";
import { redisSet, redisGet } from "./db/redis";

export type ReqType = IncomingMessage & {
  path?: string;
  query?: Record<string, string>;
  body?: any;
  cookie?: Record<string, string>;
  sessionId?: string;
  session?: any;
};

// session 数据
// const SESSION_DATA: Record<string, Record<string, string>> = {};

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

function getCookie(cookieStr = "", cookie = {}) {
  const _cookie: Record<string, string> = {};
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }
    const arr = item.split("=");
    if (Reflect.has(cookie, arr[0].trim())) {
      return;
    }
    _cookie[arr[0].trim()] = arr[1];
  });
  return _cookie;
}

// 获取 cookie 的过期时间
function getCookieExpires() {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toUTCString();
}

export default async (req: ReqType, res: ServerResponse) => {
  // 设置返回格式 JSON

  res.setHeader("Content-Type", "application/json");

  const { url } = req;

  req.path = url.split("?")[0];

  req.query = querystring.parse(url.split("?")[1]);

  req.cookie = getCookie(req.headers.cookie, req.cookie);

  let needSetCookie = false;
  let userId = req.cookie.userId;

  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化session
    redisSet(userId, {});
  }
  // 获取session
  req.sessionId = userId;
  const sessionData = await redisGet(req.sessionId);
  if (sessionData == null) {
    redisSet(req.sessionId, {});
    // 设置session
    req.session = {}; // 最终目的
  } else {
    req.session = sessionData; // 最终目的
  }

  getPostData(req).then(async (postData) => {
    req.body = postData;

    // 处理 blog 路由
    const blogData = await handleBlogRouter(req, res);
    if (needSetCookie) {
      res.setHeader(
        "Set-Cookie",
        `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
      );
    }
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }

    // 处理 user 路由
    const userData = await handleUserRouter(req, res);
    if (needSetCookie) {
      res.setHeader(
        "Set-Cookie",
        `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
      );
    }
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
