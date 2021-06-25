import { ServerResponse } from "http";
import { ReqType } from "@src/app";
import { loginCheck } from "@src/controller/user";
import { ErrorModel, SuccessModel } from "@src/model/resModel";

const handleUserRouter = (req: ReqType, res: ServerResponse) => {
  const { method, path } = req;

  if (method === "POST" && path === "/api/user/login") {
    const {
      body: { username, password },
    } = req;
    const result = loginCheck(username, password);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel("登陆失败");
    }
  }
};

export default handleUserRouter;
