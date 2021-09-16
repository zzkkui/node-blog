import { ServerResponse } from "http";
import { ReqType } from "@src/app";
import { login } from "@src/controller/user";
import { ErrorModel, SuccessModel } from "@src/model/resModel";

const handleUserRouter = async (req: ReqType, res: ServerResponse) => {
  const { method, path } = req;

  if (method === "GET" && path === "/api/user/login") {
    // const {
    //   body: { username, password }
    // } = req;
    const {
      query: { username, password }
    } = req;
    const result = await login(username, password);
    if (result[0]?.username) {
      // expires 设置过期时间
      const { username, realname } = result[0];
      req.session.username = username;
      req.session.realname = realname;
      return new SuccessModel();
    } else {
      return new ErrorModel("登陆失败");
    }
  }

  if (method === "GET" && path === "/api/user/loginCheck") {
    const { session } = req;
    if (session.username) {
      return new SuccessModel(session);
    } else {
      return new ErrorModel("尚未登录");
    }
  }
};

export default handleUserRouter;
